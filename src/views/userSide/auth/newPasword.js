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
import NewPassBannerImage from "../../../assets/images/newpassword-banner-image.png";
import { loginUser, resetNewPassword } from "../../../utils/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserLayout from "../../../components/UserLayout";
import { toast } from "react-toastify";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword(!showConfPassword);
  };

  const validateFormData = (formData) => {
    const errors = {};

    Object.keys(formData).forEach((field) => {
      const value = formData[field]?.trim?.() || "";

      switch (field) {
        case "new_password":
          if (!value) {
            errors.new_password = "Password is required.";
          } else if (value) {
            const strongPasswordRegex =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

            if (!strongPasswordRegex.test(value)) {
              errors.new_password =
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
            }
          }
          break;

        case "confirm_password":
          if (!value) {
            errors.confirm_password = "Confirm password is required.";
          } else if (formData.new_password && value !== formData.new_password) {
            errors.confirm_password = "Passwords do not match.";
          }
          break;

        default:
          break;
      }
    });

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

    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const data = {
      email: location?.state?.email,
      new_password: formData?.new_password,
      confirm_password: formData?.confirm_password,
    };

    resetNewPassword(data)
      .then((res) => {
        setLoading(false);
        if (res.data?.code == 200) {
          navigate("/user-select-location");
          toast.success(res?.data?.message, { theme: "colored" });
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
              src={NewPassBannerImage}
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
                      Set New Password
                    </h2>
                    <p className="text-body-secondary">
                      Your password must be at least 6 characters
                    </p>

                    <CInputGroup className="mb-4">
                      <div className="user_input_section">
                        <label>Password*</label>
                        <CFormInput
                          type={showPassword ? "text" : "password"}
                          placeholder="**********"
                          autoComplete="password"
                          name="new_password"
                          value={formData.new_password}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                        {/* <i class="bi bi-eye-fill"></i> */}
                        <i
                          className={
                            showPassword ? "bi bi-eye-slash" : "bi bi-eye-fill"
                          } // Change icon based on state
                          onClick={() => togglePasswordVisibility()} // Toggle visibility on click
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            right: "10px",
                            top: "33px",
                            color: "#0860FB",
                            zIndex: "99",
                          }} // Add pointer cursor to indicate clickability
                        />
                      </div>
                      {errors.new_password && (
                        <span className="error_message">
                          {errors.new_password}
                        </span>
                      )}
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <div className="user_input_section">
                        <label>Confirm Password*</label>
                        <CFormInput
                          type={showConfPassword ? "text" : "password"}
                          placeholder="**********"
                          aria-label="default input example"
                          value={formData.confirm_password}
                          name="confirm_password"
                          onChange={(e) => handleInputChange(e)}
                        />
                        <i
                          className={
                            showConfPassword
                              ? "bi bi-eye-slash"
                              : "bi bi-eye-fill"
                          }
                          onClick={() => toggleConfPasswordVisibility()}
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            right: "10px",
                            top: "33px",
                            color: "#0860FB",
                            zIndex: "99",
                          }}
                        />
                      </div>
                      {errors.confirm_password && (
                        <span className="error_message">
                          {errors.confirm_password}
                        </span>
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

                      <CCol xs={12} className="text-left">
                        <CButton type="button" className="text_color px-0">
                          <Link to="/user-select-location">Back to login</Link>
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

export default SetNewPassword;
