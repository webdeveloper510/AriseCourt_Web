import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { loginUser, resetNewPassword } from "../../../utils/api";
import { toast } from "react-toastify";

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const validateFormData = (formData) => {
    let errors = {};

    if (!formData.new_password || formData.new_password.length < 6) {
      errors.new_password =
        "Password is required and must be at least 6 characters long.";
    }

    if (!formData.confirm_password) {
      errors.confirm_password = "Please confirm your password.";
    } else if (formData.new_password !== formData.confirm_password) {
      errors.confirm_password = "Passwords do not match.";
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

    const data = {
      email: location?.state,
      new_password: formData?.new_password,
      confirm_password: formData?.confirm_password,
    };

    resetNewPassword(data)
      .then((res) => {
        setLoading(false);
        if (res.data?.code == 200) {
          navigate("/login");
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
    <div
      className=" min-vh-100 d-flex flex-row align-items-center"
      style={{ height: "100vh" }}
    >
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
              <div className="d-flex justify-content-center form_outer_section">
                <div className="form_inner_section">
                  <CForm onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
                    <img src={Logo} alt="login-logo" />
                    <h2 id="traffic" className="card-title mt-3 mb-3">
                      Set new password
                    </h2>
                    {/* <p className="text-body-secondary">Your password must be at strong</p> */}

                    <CInputGroup className="mb-2">
                      <div className="input_section">
                        <label>New Password</label>
                        <CFormInput
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          autoComplete="password"
                          name="new_password"
                          value={formData.new_password}
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
                      {errors.new_password && (
                        <span className="error_message">
                          {errors.new_password}
                        </span>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <div className="input_section">
                        <label>Confirm Password</label>
                        <CFormInput
                          type={showConfirmPass ? "text" : "password"}
                          placeholder="Confirm Password"
                          autoComplete="confirm_password"
                          name="confirm_password"
                          value={formData.confirm_password}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />

                        <CIcon
                          icon={
                            showConfirmPass ? cilLockUnlocked : cilLockLocked
                          } // Change icon based on state
                          onClick={() => toggleConfirmPasswordVisibility()} // Toggle visibility on click
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
                      {errors.confirm_password && (
                        <span className="error_message">
                          {errors.confirm_password}
                        </span>
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
                          {loading ? "Loading..." : "Set Password"}
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

export default NewPassword;
