import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
} from "@coreui/react";
import Logo from "../../../assets/images/login_logo.png";
import HomeBg from "../../../assets/images/login_bg_image.png";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilLockUnlocked } from "@coreui/icons";
import { loginUser } from "../../../utils/api";
import { toast } from "react-toastify";
// import cilEye from "@coreui/icons";
// import cilEyeSlash from "@coreui/icons";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateFormData = (formData) => {
    let errors = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is required and must be valid.";
    }

    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password is required and must be at least 6 characters long.";
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
    // navigate("/dashboard");

    loginUser(formData)
      .then((res) => {
        console.log("loginUser", res);
        setLoading(false);
        if (res.status === 200) {
          navigate("/dashboard");
          toast.success(res?.data?.msg, { theme: "colored" });
          localStorage.setItem("user_access_valid_token", res?.data?.token?.access);
          localStorage.setItem("logged_user_data", JSON.stringify(res?.data?.data))
        }else{
          toast.error(res?.data?.errors, {
            theme:"colored"
          })
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
    <div className=" min-vh-100 d-flex flex-row align-items-center" style={{ height: "100vh" }}>
      <CRow className="justify-content-center" style={{ width: "100%" }}>
        <CCol md={12}>
          <CRow
            className="align-items-center"
            style={{ background: "#E7F0FF" }}
          >
            <CCol md={6}>
              <CCard className="p-2">
                <img src={HomeBg} alt="login_bg" style={{ height: "96vh" }} />
              </CCard>
            </CCol>
            <CCol md={6}>
              <div className="d-flex justify-content-center form_outer_section" >
                <div className="form_inner_section">
                  <CForm onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
                    <img src={Logo} alt="login-logo" />
                    <h2 id="traffic" className="card-title mt-3 mb-0">
                      Login
                    </h2>
                    <p className="text-body-secondary">Welcome Back</p>
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
                         {errors.email && <span className="error_message">{errors.email}</span>}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <div className="input_section">
                        <label>Password</label>
                        <CFormInput
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          autoComplete="password"
                          name="password"
                          value={formData.password}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                        
                        <CIcon
                          icon={showPassword ? cilLockUnlocked : cilLockLocked} // Change icon based on state
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
                        {errors.password && <span className="error_message">{errors.password}</span>}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} className="">
                        <CButton type="button" className="text_color px-0">
                          Forgot password?
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
                    </CRow>
                  </CForm>
                </div>
              </div>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </div>
  );
};

export default Login;
