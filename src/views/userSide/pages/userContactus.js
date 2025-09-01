import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import { getProfile, updateProfile, userContactUS } from "../../../utils/api";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CRow,
} from "@coreui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";

export default function UserContactUs() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    // country: "US",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateFormData = (formData) => {
    const errors = {};

    if (!formData.first_name?.trim()) {
      errors.first_name = "First name is required.";
    } else if (formData.first_name.length < 2) {
      errors.first_name = "First name must be at least 2 characters.";
    } else if (formData.first_name.length > 100) {
      errors.first_name = "First name must be no more than 100 characters.";
    }

    if (!formData.last_name?.trim()) {
      errors.last_name = "Last name is required.";
    } else if (formData.last_name.length < 2) {
      errors.last_name = "Last name must be at least 2 characters.";
    } else if (formData.last_name.length > 100) {
      errors.last_name = "Last name must be no more than 100 characters.";
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is not valid.";
    }

    if (!formData.phone?.trim()) {
      errors.phone = "Phone number is required.";
    } else if (formData.phone.length < 7) {
      errors.phone = "Phone number must be at least 7 characters.";
    }

    if (!formData.message?.trim()) {
      errors.message = "Description is required.";
    }

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

    // validate only if field was touched
    if (touched[name]) {
      const newErrors = validateFormData({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] || "" }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);

    // mark all as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    userContactUS(formData)
      .then((res) => {
        setLoading(false);
        if (res?.data?.code == 200 || res?.data?.code == 201) {
          toast.success(res?.data?.message, { theme: "colored" });
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            message: "",
          })
        } else {
          toast.error(res?.data?.message, { theme: "colored" });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const handlePhoneChange = (value, data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone: value,
      //   country: data.countryCode?.toUpperCase() || "", // Save "US", "IN", etc.
    }));

    const fieldErrors = validateFormData(
      {
        ...formData,
        phone: value,
        // country: data.countryCode?.toUpperCase() || "",
      },
      "phone"
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: fieldErrors.phone || "",
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });

    const newErrors = validateFormData(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] || "" }));
  };

  return (
    <UserLayout>
      {loading && (
        <div className="loader_outer">
          <span className="loader"></span>
        </div>
      )}
      <div className="book_court_section">
        <div className="container">
          <h3 className="book_court_title">Contact Us</h3>
          <div className="">
            <CRow>
              <CCol md={12}>
                <div className="d-flex justify-content-center form_outer_section">
                  <div className="form_inner_section">
                    <CForm
                      onSubmit={handleFormSubmit}
                      onKeyDown={handleKeyDown}
                    >
                      <div className="user_login_section">
                        <CRow>
                          <CCol sm={12}>
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
                                  onBlur={handleBlur}
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
                          <CCol sm={12}>
                            <CInputGroup className="mb-3">
                              <div className="user_input_section">
                                <label>Last Name*</label>
                                <CFormInput
                                  type="text"
                                  placeholder="Enter Last Name"
                                  autoComplete="off"
                                  aria-label="default input example"
                                  value={formData.last_name}
                                  name="last_name"
                                  onBlur={handleBlur}
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
                          <CCol sm={12}>
                            <CInputGroup className="mb-3">
                              <div className="user_input_section">
                                <label>Email Address*</label>
                                <CFormInput
                                  placeholder="dummy221email.@gmail.com"
                                  autoComplete="email"
                                  name="email"
                                  value={formData.email}
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    handleInputChange(e);
                                  }}
                                />
                              </div>
                              {errors.email && (
                                <span className="error_message">
                                  {errors.email}
                                </span>
                              )}
                            </CInputGroup>
                          </CCol>

                          <CCol sm={12}>
                            <CInputGroup className="mb-3">
                              <div className="user_input_section">
                                <label>Phone Number*</label>
                                <PhoneInput
                                  country={"us"}
                                  value={formData.phone}
                                  onBlur={handleBlur}
                                  autoComplete="off"
                                  onChange={handlePhoneChange}
                                />
                              </div>
                              {errors.phone && (
                                <span className="error_message">
                                  {errors.phone}
                                </span>
                              )}
                            </CInputGroup>
                          </CCol>

                          <CCol sm={12}>
                            <CInputGroup className="mb-3">
                              <div className="user_input_section">
                                <label>Description*</label>
                                <CFormTextarea
                                  type="text"
                                  placeholder="Enter Description"
                                  autoComplete="off"
                                  aria-label="default input example"
                                  value={formData.message}
                                  name="message"
                                  onBlur={handleBlur}
                                  onChange={(e) => handleInputChange(e)}
                                />
                              </div>
                              {errors.message && (
                                <span className="error_message">
                                  {errors.message}
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
                              {loading ? "Loading..." : "Send Message"}
                            </CButton>
                          </CCol>
                        </CRow>
                      </div>
                    </CForm>
                  </div>
                </div>
              </CCol>
            </CRow>
          </div>{" "}
        </div>
      </div>
    </UserLayout>
  );
}
