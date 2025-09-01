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
import LoginBannerImage from "../../../assets/images/login-banner-image.png";
import { loginUser } from "../../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = ({
  locationName,
  setRegisterPage,
  handleBackLocation,
  locationId,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    location: locationId,
  });
  const [errors, setErrors] = useState({});

  console.log("locationId",locationId)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value || !/\S+@\S+\.\S+/.test(value)) {
        error = "Email is required and must be valid.";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      }
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // validate only the current field
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // validate all fields on submit
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) validationErrors[key] = error;
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }

    loginUser({
      email: formData?.email,
      password: formData?.password,
      location: locationId,
    })
      .then((res) => {
        setLoading(false);
        if (res.data.code == 200) {
          navigate("/user-book-court");
          const userData = res?.data?.data;
          const accessToken = res?.data?.data?.access_token;
          localStorage.setItem("selectedLocation", locationName);
          localStorage.setItem("selectedLocationId", locationId);
          localStorage.setItem("role", "user");
          localStorage.setItem("user_access_valid_token", accessToken);
          localStorage.setItem("logged_user_data", JSON.stringify(userData));
          toast.success(res?.data?.message, { theme: "colored" });
        } else {
          toast.error(res?.data?.message, { theme: "colored" });
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
    <div className="">
      <CRow>
        <CCol
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={LoginBannerImage}
            alt="LoginBannerImage"
            className="login-banner-image"
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
                  <div
                    className="flex align-items-center mb-2 location_back"
                    onClick={() => handleBackLocation()}
                  >
                    {" "}
                    <i className="bi bi-arrow-left"></i>{" "}
                    <span className="mx-1">{locationName}</span>
                  </div>
                  <img src={Logo} alt="login-logo" />
                  <h2 id="traffic" className="card-title mt-3 mb-0">
                    Login
                  </h2>
                  <p className="text-body-secondary">Welcome Back</p>
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
                  <CInputGroup className="">
                    <div className="user_input_section">
                      <label>Password*</label>
                      <CFormInput
                        type={showPassword ? "text" : "password"}
                        placeholder="**********"
                        autoComplete="password"
                        name="password"
                        value={formData.password}
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
                    {errors.password && (
                      <span className="error_message">{errors.password}</span>
                    )}
                  </CInputGroup>
                  <CRow>
                    <CCol xs={12} className="">
                      <CButton type="button" className="text_color px-0">
                        <Link to="/user-forgot-password">Forgot password?</Link>
                      </CButton>
                    </CCol>
                    <CCol xs={12}>
                      <CButton
                        type="submit"
                        className="px-4 add_new_butn w-100"
                      >
                        {loading ? "Loading..." : "Login"}
                      </CButton>
                    </CCol>
                    <CCol xs={12}>
                      <p className="text-body-secondary mt-1 mb-0 privacy_policy_text">
                        By proceeding you also agree to the Terms of Service and
                        Privacy Policy
                      </p>
                    </CCol>
                    {/* <CCol md={6}>
                      <CButton
                        type="button"
                        onClick={() => handleBackLocation()}
                        className="text_color px-0"
                      >
                        <span>Back</span>
                      </CButton>
                    </CCol> */}
                    <CCol md={6} className="">
                      <CButton
                        type="button"
                        onClick={() => setRegisterPage(true)}
                        className="text_color px-0"
                      >
                        <span>Create an account</span>
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
  );
};

export default LoginPage;
