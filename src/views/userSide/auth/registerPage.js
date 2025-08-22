import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
} from "@coreui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { userRegister } from "../../../utils/api";

const RegisterPage = ({ locationId, setRegisterPage }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "US",
    user_type: "2",
    password: "",
    confirm_password: "",
    location_id: locationId,
  });
  const [errors, setErrors] = useState({});

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
        case "first_name":
          if (!value) {
            errors.first_name = "First name is required.";
          } else if (value.length < 2) {
            errors.first_name = "First name must be at least 2 characters.";
          } else if (value.length > 100) {
            errors.first_name =
              "First name must be no more than 100 characters.";
          }
          break;

        case "last_name":
          if (!value) {
            errors.last_name = "Last name is required.";
          } else if (value.length < 2) {
            errors.last_name = "Last name must be at least 2 characters.";
          } else if (value.length > 100) {
            errors.last_name = "Last name must be no more than 100 characters.";
          }
          break;

        case "email":
          if (!value) {
            errors.email = "Email is required.";
          } else if (!/\S+@\S+\.\S+/.test(value)) {
            errors.email = "Email is not valid.";
          }
          break;

        case "phone":
          if (!value) {
            errors.phone = "Phone number is required.";
          } else if (value.length < 7) {
            errors.phone = "Phone number must be at least 7 characters.";
          }
          break;

        case "password":
          if (!value) {
            errors.password = "Password is required.";
          } else if (value) {
            const strongPasswordRegex =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

            if (!strongPasswordRegex.test(value)) {
              errors.password =
                "Password must be 6+ characters with upper, lower, number & special (!@#$&%)";
            }
          }
          break;

        case "confirm_password":
          if (!value) {
            errors.confirm_password = "Confirm password is required.";
          } else if (formData.password && value !== formData.password) {
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
    const capitalizedValue =
      name === "first_name" || name === "last_name"
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;

    const updatedFormData = { ...formData, [name]: capitalizedValue };

    setFormData(updatedFormData);

    const validationErrors = validateFormData(updatedFormData);
    setErrors(validationErrors);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }

    userRegister(formData)
      .then((res) => {
        console.log("userRegister", res);
        if (res?.data?.code == 200) {
          toast.success(res?.data?.message, {
            theme: "colored",
          });
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };

  const handlePhoneChange = (value, data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone: value,
      country: data.countryCode?.toUpperCase() || "", // Save "US", "IN", etc.
    }));

    const fieldErrors = validateFormData(
      {
        ...formData,
        phone: value,
        country: data.countryCode?.toUpperCase() || "",
      },
      "phone"
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: fieldErrors.phone || "",
    }));
  };

  return (
    <div className="">
      <CRow>
        <CCol md={12}>
          <div className="d-flex justify-content-center form_outer_section">
            <div className="form_inner_section">
              <CForm onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
                <h2 id="traffic" className="card-title mt-3 mb-0">
                  Register
                </h2>
                <p className="text-body-secondary">
                  Enter your details to get started.
                </p>
                <div className="user_login_section">
                  <CRow>
                    <CCol sm={12} md={6} className="my-2">
                      <CInputGroup className="mb-3">
                        <div className="user_input_section">
                          <label>First Name*</label>
                          <CFormInput
                            type="text"
                            autoComplete="off"
                            placeholder="Enter First Name"
                            aria-label="default input example"
                            value={formData.first_name}
                            name="first_name"
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                        {errors.first_name && (
                          <span className="error_message">
                            {errors.first_name}
                          </span>
                        )}
                      </CInputGroup>
                    </CCol>
                    <CCol sm={12} md={6} className="my-2">
                      <CInputGroup className="mb-3">
                        <div className="user_input_section">
                          <label>First Name*</label>
                          <CFormInput
                            type="text"
                            placeholder="Enter Last Name"
                            autoComplete="off"
                            aria-label="default input example"
                            value={formData.last_name}
                            name="last_name"
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                        {errors.last_name && (
                          <span className="error_message">
                            {errors.last_name}
                          </span>
                        )}
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
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
                    </CCol>

                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <div className="user_input_section">
                          <label>Phone Number*</label>
                          <PhoneInput
                            country={"us"}
                            value={formData.phone}
                            autoComplete="off"
                            onChange={handlePhoneChange}
                          />
                        </div>
                        {errors.phone && (
                          <span className="error_message">{errors.phone}</span>
                        )}
                      </CInputGroup>
                    </CCol>

                    <CCol md={6}>
                      <CInputGroup className="mb-4">
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
                              showPassword
                                ? "bi bi-eye-slash"
                                : "bi bi-eye-fill"
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
                          <span className="error_message">
                            {errors.password}
                          </span>
                        )}
                      </CInputGroup>
                    </CCol>

                    <CCol md={6}>
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
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs={12} className="text-center">
                      <CButton
                        type="submit"
                        className="px-5 add_new_butn"
                        style={{ width: "250px" }}
                      >
                        {loading ? "Loading..." : "Login"}
                      </CButton>
                    </CCol>

                    <CCol xs={12} className="text-center">
                      <CButton
                        type="button"
                        onClick={() => setRegisterPage(false)}
                        className="text_color px-0"
                      >
                        <span>Back to login</span>
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

export default RegisterPage;
