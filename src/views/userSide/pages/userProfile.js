import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import { getProfile, updateProfile } from "../../../utils/api";
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

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "US",
    user_type: "2",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    setLoading(true);
    getProfile()
      .then((res) => {
        setLoading(false);
        if (res?.data?.code == 200) {
          setFormData(res?.data?.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
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

        default:
          break;
      }
    });

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

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
    setLoading(true);
    updateProfile(formData)
      .then((res) => {
        setLoading(false);
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
        setLoading(false);
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
    <UserLayout>
      {loading && (
        <div className="loader_outer">
          <span className="loader"></span>
        </div>
      )}
      <div className="book_court_section">
        <div className="container">
          <h3 className="book_court_title">User Profile</h3>
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
                          <CCol sm={12}>
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
                                  readOnly
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
                                  autoComplete="off"
                                  onChange={handlePhoneChange}
                                />
                              </div>
                              {errors.email && (
                                <span className="error_message">
                                  {errors.email}
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
                              {loading ? "Loading..." : "Update"}
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
