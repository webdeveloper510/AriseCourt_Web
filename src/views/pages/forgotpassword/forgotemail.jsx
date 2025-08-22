import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import Logo from "../../../assets/images/login_logo.png";
import HomeBg from "../../../assets/images/login_bg_image.png";
import { forgotEmail, resendOtp, verifyOtp } from "../../../utils/api";
import { toast } from "react-toastify";
import OtpImage from "../../../assets/images/otp_image.png";

const ForgotEmail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const [timer, setTimer] = useState(30); // Timer for resend (in seconds)
  const [canResend, setCanResend] = useState(false); // Button state (enabled or disabled)

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval); // Clear interval on component unmount
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(0, 1); // Only one character per input
    setOtp(updatedOtp);

    // Move focus to next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedOtp = e.clipboardData.getData("Text").slice(0, 6).split("");
    setOtp(pastedOtp);

    // Focus on the last input after pasting
    document.getElementById(`otp-input-${pastedOtp.length - 1}`).focus();
  };

  const handleResendOtp = () => {
    resendOtp(formData).then((res) => {
      if (res.data?.code == 200) {
        setCanResend(false);
        setTimer(59);
        toast.success(res?.data?.message, {
          theme: "colored",
        });
      }else{
        toast.error(res?.data?.message, {
          theme: "colored",
        });
      }
    });
  };

  const validateFormData = (formData) => {
    let errors = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is required and must be valid.";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const fieldErrors = validateFormData({ ...formData, [name]: value });
    setErrors(fieldErrors);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }

    forgotEmail(formData)
      .then((res) => {
        setLoading(false);
        if (res?.data?.code === "200") {
          toast.success(res?.data?.message, { theme: "colored" });
          setVisible(true);
          setCanResend(false);
          setTimer(59);
        } else {
          toast.error(res?.data?.message, {
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };

  const handleOtpVerify = () => {
    const otpCode = Number(otp.join(""));
    verifyOtp({
      email: formData?.email,
      otp: otpCode,
    })
      .then((res) => {
        if (res?.data?.code == 200) {
          navigate("/new-password", {state : formData.email});
          toast.success(res?.data?.message, {
            theme: "colored",
          });
          setVisible(false);
          setOtp(Array(6).fill(""));
        }else{
          toast.error(res?.data?.message, {
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" min-vh-100 d-flex flex-row align-items-center login_outer">
         <CRow className="justify-content-center" style={{ width: "100%" }}>
           <CCol md={12}>
             <CRow
               className="align-items-center"
               style={{ background: "#E7F0FF" }}
             >
               <CCol md={5}>
                 <CCard className="p-3">
                   <img src={HomeBg} alt="login_bg" style={{ height: "92vh" }} />
                 </CCard>
               </CCol>
               <CCol md={7}>
                 <div className="d-flex justify-content-center form_outer_section">
                   <div className="form_inner_section">
                  <CForm onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
                    <img src={Logo} alt="login-logo" />
                    <h2 id="traffic" className="card-title mt-3 mb-0">
                      Forgot Password?
                    </h2>
                    <p className="text-body-secondary">
                      Enter your email to get OTP
                    </p>
                    <CInputGroup className="mb-3">
                      <div className="input_section">
                        <label>Email Address</label>
                        <CFormInput
                          placeholder="Enter Email"
                          autoComplete="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                      </div>
                      {errors.email && (
                        <span className="error_message">{errors.email}</span>
                      )}
                    </CInputGroup>

                    <CRow>
                      <CCol xs={12} className="">
                        <CButton type="button" className="text_color px-0">
                          <Link to="/login">Back to Login</Link>
                        </CButton>
                      </CCol>
                      <CCol xs={12}>
                        <CButton
                          type="submit"
                          className="px-4 add_new_butn w-100"
                        >
                          {loading ? "Loading..." : "Continue"}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </div>
              </div>
            </CCol>
          </CRow>
        </CCol>
      </CRow>

      <CModal
        visible={visible}
        alignment="center"
        onClose={() => {
          setVisible(false);
          setOtp(Array(6).fill(""));
        }}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalBody className="modal_body_court">
          <div className="add_court_modal text-center">
            <img src={OtpImage} alt="OtpImage" />
            <h1 className="card-title mt-4">Please Check your email</h1>
            <p className="forgot_email">{formData?.email}</p>
            <p className="text-body-secondary">Enter OTP to reset password</p>

            <div className="otp-inputs mt-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  maxLength="1"
                  autoComplete="off"
                  className="otp-input"
                  onPaste={handlePaste}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <div className="mt-2">
              {canResend ? (
                <p onClick={handleResendOtp} className="resend_otp">
                  Resend OTP
                </p>
              ) : (
                <p className="text-body-secondary">
                  Resend OTP in <strong>{timer}s</strong>
                </p>
              )}
            </div>
            <CButton
              type="button"
              onClick={() => handleOtpVerify()}
              className="add_new_butn"
            >
              Continue
            </CButton>
          </div>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default ForgotEmail;
