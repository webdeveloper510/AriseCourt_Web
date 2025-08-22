import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
} from "@coreui/react";
import Logo from "../../../assets/images/login_logo.png";
import OtpImage from "../../../assets/images/otp-banner-image.png";
import { loginUser, verifyOtp } from "../../../utils/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserLayout from "../../../components/UserLayout";
import { toast } from "react-toastify";

const EnterOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState(Array(6).fill(""));

  const [timer, setTimer] = useState(59); // Timer for resend (in seconds)
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
      } else {
        toast.error(res?.data?.message, {
          theme: "colored",
        });
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleOtpVerify(e);
    }
  };

  const handleOtpVerify = () => {
    const otpCode = Number(otp.join(""));
    verifyOtp({
      email: location?.state?.email,
      otp: otpCode,
    })
      .then((res) => {
        if (res?.data?.code == 200) {
          navigate("/user/new-password", {state : {email : location?.state?.email}});
          toast.success(res?.data?.message, {
            theme: "colored",
          });
          setVisible(false);
          setOtp(Array(6).fill(""));
        } else {
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
    <UserLayout>
      <div className="book_court_section">
        <CRow>
          <CCol
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <img
              src={OtpImage}
              alt="LoginBannerImage"
              className="forgot-banner-image"
            />
          </CCol>
          <CCol
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="d-flex justify-content-center form_outer_section">
              <div className="form_inner_section">
                <div className="user_login_section">
                  <img src={Logo} alt="login-logo" />
                  <h2 id="traffic" className="card-title mt-3 mb-0">
                    Please Check your email
                  </h2>
                  <p className="text-body-secondary">
                    Enter OTP to reset password
                  </p>

                  <CInputGroup className="mb-3">
                    <div className="">
                      <div className="otp-inputs mt-2" style={{ gap: "20px" }}>
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => {
                              handleBackspace(e, index);
                              handleKeyDown(e); // pass the event here
                            }}
                            maxLength="1"
                            className="otp-input"
                            onPaste={handlePaste}
                            autoFocus={index === 0}
                            autoComplete="off"
                            style={{
                              background: "#D2E3FF",
                              border: "2px solid #EBEBEB",
                            }}
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
                    </div>
                  </CInputGroup>

                  <CRow>
                    <CCol xs={12}>
                      <CButton
                        type="button"
                        onClick={() => handleOtpVerify()}
                        className="px-4 add_new_butn w-100"
                      >
                        {loading ? "Loading..." : "Continue"}
                      </CButton>
                    </CCol>

                    <CCol xs={12} className="text-center">
                      <CButton type="button" className="text_color px-0">
                        <Link to="/user/login">Back to login</Link>
                      </CButton>
                    </CCol>
                  </CRow>
                </div>
              </div>
            </div>
          </CCol>
        </CRow>
      </div>
    </UserLayout>
  );
};

export default EnterOtp;
