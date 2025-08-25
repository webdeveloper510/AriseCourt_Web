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
import ForgotEmailBannerImage from "../../../assets/images/forgot-email-banner.png";
import { forgotEmail, loginUser } from "../../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import UserLayout from "../../../components/UserLayout";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});

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
        if (res.data.code == 200) {
          toast.success(res?.data?.message, { theme: "colored" });
          navigate("/user-otp", {state : {email : formData?.email}});
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

  return (
    <UserLayout>
      <div className="book_court_section">
        <CRow>
          <CCol
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <img
              src={ForgotEmailBannerImage}
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
                <CForm onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
                  <div className="user_login_section">
                    <img src={Logo} alt="login-logo" />
                    <h2 id="traffic" className="card-title mt-3 mb-0">
                      Forgot Password?
                    </h2>
                    <p className="text-body-secondary">
                      Enter your email to get OTP
                    </p>

                    <CInputGroup className="mb-3">
                      <div className="user_input_section">
                        <label>Email Address*</label>
                        <CFormInput
                          placeholder="dummy221email.@gmail.com"
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
                      <CCol xs={12}>
                        <CButton
                          type="submit"
                          className="px-4 add_new_butn w-100"
                        >
                          {loading ? "Loading..." : "Reset Password"}
                        </CButton>
                      </CCol>

                      <CCol xs={12} className="text-center">
                        <CButton type="button" className="text_color px-0">
                          <Link to="/user-login">Back to login</Link>
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </CForm>
              </div>
            </div>
          </CCol>
        </CRow>
      </div>
    </UserLayout>
  );
};

export default ForgotPassword;
