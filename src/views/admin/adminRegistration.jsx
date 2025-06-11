import React, { useEffect, useState } from "react";
import {
  CButton,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import { cilArrowLeft } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  addAdmintData,
  getAdminbyId,
  registerUser,
  updateAdmin,
} from "../../utils/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";

const AdminRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirm_password: "",
    user_type: 1,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAdminData();
  }, [id]);

  const getAdminData = () => {
    getAdminbyId(id)
      .then((res) => {
        if (res?.status == 200 || res?.status == 201) {
          setFormData(res?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validateFormData = (
    data,
    isEditMode = false,
    fieldToValidate = null
  ) => {
    const errors = {};

    const validateField = (field) => {
      switch (field) {
        case "first_name":
          if (!data.first_name.trim())
            errors.first_name = "First name is required.";
          break;
        case "last_name":
          if (!data.last_name.trim())
            errors.last_name = "Last name is required.";
          break;
        case "email":
          if (!data.email.trim()) errors.email = "Email is required.";
          break;
        case "phone":
          if (!data.phone.trim()) errors.phone = "Phone number is required.";
          break;
        case "country":
          if (!data.country.trim())
            errors.country = "Country code is required.";
          break;
        case "password":
          if (!isEditMode && !data.password)
            errors.password = "Password is required.";
          break;
        case "confirm_password":
          if (!isEditMode && !data.confirm_password) {
            errors.confirm_password = "Confirm password is required.";
          } else if (
            data.password &&
            data.confirm_password &&
            data.password !== data.confirm_password
          ) {
            errors.confirm_password = "Passwords do not match.";
          }
          break;
        default:
          break;
      }
    };

    if (fieldToValidate) {
      validateField(fieldToValidate);
    } else {
      // full validation
      Object.keys(data).forEach((field) => validateField(field));
    }

    return errors;
  };

  const handlePhoneChange = (value, data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone: value, // full phone number
      country: data.countryCode.toUpperCase(), // e.g., "US"
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);

    const isEditMode = Boolean(id);
    const fieldErrors = validateFormData(updatedFormData, isEditMode, name);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name] || "",
    }));
  };

  const handleBackNavigate = () => {
    navigate(-1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isEditMode = Boolean(id);
    const validationErrors = validateFormData(formData, isEditMode);
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set field-wise errors
      return; // Stop submission
    }

    const apiCall = isEditMode
      ? updateAdmin(id, formData)
      : addAdmintData(formData);

    apiCall
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          navigate(-1);
          toast.success(res?.data?.msg, { theme: "colored" });
        } else {
          Object.keys(res?.data).forEach((key) => {
            res?.data[key].forEach((msg) => {
              toast.error(msg, { theme: "colored" });
            });
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

  return (
    <>
      <CCardBody className="p-2">
        <CRow>
          <CCol sm={12}>
            <div className="d-flex gap-3 align-items-center">
              <div>
                <span>
                  <CIcon
                    onClick={() => handleBackNavigate()}
                    icon={cilArrowLeft}
                    className="back_icon"
                  ></CIcon>
                </span>{" "}
              </div>
              <div>
                <h4 id="traffic" className="card-title mb-0">
                  Admin Registration
                </h4>
                <div className="card_description">
                  {id ? "Edit" : "Add"} new Users
                </div>
              </div>
            </div>
          </CCol>
        </CRow>

        <div className="registration_form">
          <CForm onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
            <CRow className="d-flex justify-content-center">
              <CCol sm={12} md={6} lg={4} className="my-2">
                <label>First Name</label>
                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter First Name"
                  aria-label="default input example"
                  value={formData.first_name}
                  name="first_name"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
              </CCol>
              <CCol sm={12} md={6} lg={4} className="my-2">
                <label>Last Name</label>
                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Last Name"
                  aria-label="default input example"
                  value={formData.last_name}
                  name="last_name"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.last_name && <div className="text-danger">{errors.last_name}</div>}

              </CCol>
              <CCol sm={12} md={6} lg={4} className="my-2">
                <label>Email Address</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Email Address"
                  aria-label="default input example"
                  value={formData.email}
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}

              </CCol>
              {/* <CCol sm={12} md={6} lg={4} className="my-2">
                <label>User Type</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter User Type"
                  aria-label="default input example"
                  value={"Admin"}
                  readOnly
                />
              </CCol> */}
              <CCol sm={12} md={6} lg={4} className="my-2">
                <label>Phone Number</label>

                <PhoneInput
                  country={"us"}
                  value={formData.phone}
                  className="form-control"
                  onChange={handlePhoneChange}
                />

                {/* <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Phone Number"
                  aria-label="default input example"
                  value={formData.phone}
                  name="phone"
                  onChange={(e) => handleInputChange(e)}
                /> */}
                {errors.phone && <div className="text-danger">{errors.phone}</div>}

              </CCol>
              <CCol sm={12} md={6} lg={4} className="my-2">
                <label>Password</label>

                <CFormInput
                  type="password"
                  className="register_input"
                  placeholder="Enter Password"
                  aria-label="default input example"
                  value={formData.password}
                  name="password"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}

              </CCol>

              <CCol sm={12} md={6} lg={4} className="my-2">
                <label>Confirm Password</label>

                <CFormInput
                  type="password"
                  className="register_input"
                  placeholder="Enter Password"
                  aria-label="default input example"
                  value={formData.confirm_password}
                  name="confirm_password"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.confirm_password && <div className="text-danger">{errors.confirm_password}</div>}

              </CCol>

              <CCol md={12} className="mt-4">
                <CButton type="submit" className="add_new_butn">
                  Save
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </div>
      </CCardBody>
    </>
  );
};

export default AdminRegistration;
