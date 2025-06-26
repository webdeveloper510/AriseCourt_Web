import React, { useEffect, useState } from "react";
import {
  CButton,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPenNib } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import badminton from "../../assets/images/badminton.png";
import UserImage from "../../assets/images/user_image.avif";
import { getProfile, updateProfile } from "../../utils/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    image: null,
  });

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = () => {
    getProfile()
      .then((res) => {
        if (res?.data.code == "200") {
          setUserData(res?.data?.data);
          setFormData(res?.data?.data);
        } else if (res?.data?.code == "token_not_valid") {
          toast.error(res?.data?.detail, {
            theme: "colored",
          });
          localStorage.removeItem("user_access_valid_token");
          localStorage.removeItem("logged_user_data");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validateFormData = (data, fieldToValidate = null) => {
    const errors = {};

    const validateField = (field) => {
      const value = data[field] ?? ""; // ensures null/undefined become empty string

      switch (field) {
        case "first_name":
          if (!value.trim()) {
            errors.first_name = "First name is required.";
          } else if (value.length < 2) {
            errors.first_name = "First name must be at least 2 characters.";
          } else if (value.length > 100) {
            errors.first_name =
              "First name must be no more than 100 characters.";
          }
          break;

        case "last_name":
          if (!value.trim()) {
            errors.last_name = "Last name is required.";
          } else if (value.length < 2) {
            errors.last_name = "Last name must be at least 2 characters.";
          } else if (value.length > 100) {
            errors.last_name = "Last name must be no more than 100 characters.";
          }
          break;

        case "email":
          if (!value.trim()) {
            errors.email = "Email is required.";
          } else if (!/\S+@\S+\.\S+/.test(value)) {
            errors.email = "Email is not valid.";
          }
          break;

        case "phone":
          if (!value.trim()) {
            errors.phone = "Phone number is required.";
          } else if (value.length < 7) {
            errors.phone = "Phone number must be at least 7 characters.";
          }
          break;
        case "image":
          // If image is a string (existing URL), skip validation
          if (
            !data.image ||
            (typeof data.image !== "string" && !(data.image instanceof File))
          ) {
            errors.image = "Image is required.";
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
      phone: value,
      country: data.countryCode.toUpperCase(),
    }));

    const fieldErrors = validateFormData(
      { ...formData, phone: value, country: data.countryCode },
      "phone"
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: fieldErrors.phone || "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "image" ? files[0] : value;

    const updatedData = { ...formData, [name]: newValue };
    setFormData(updatedData);

    const fieldErrors = validateFormData(updatedData, name);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set field-wise errors
      return; // Stop submission
    }

    const dataToSubmit = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "image") {
        if (formData.image instanceof File) {
          dataToSubmit.append("image", formData.image);
        }
      } else {
        dataToSubmit.append(key, formData[key]);
      }
    });

    setLoading(true);

    updateProfile(dataToSubmit)
      .then((res) => {
        setLoading(false);
        if (res?.data.code == 200) {
          toast.success(res?.data?.message, { theme: "colored" });
          getProfileData();
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
    <>
      {loading && (
        <div className="loader_outer">
          <span className="loader"></span>
        </div>
      )}
      <CCardBody className="p-2 position-relative">
        <CRow>
          <CCol sm={12} md={6}>
            <div className="d-flex gap-3 align-items-center">
              <div></div>
              <div>
                <h4 id="traffic" className="card-title mb-0">
                  Profile
                </h4>
              </div>
            </div>
          </CCol>
        </CRow>

        <div className="mt-4 location_Details_section">
          <CRow className="align-items-center">
            <CCol sm={12} md={3}>
              <div className="profile_image">
                <img
                  src={
                    userData?.image
                      ? typeof userData?.image === "string"
                        ? `http://3.12.136.26:8000/${userData?.image}`
                        : URL.createObjectURL(userData?.image)
                      : UserImage
                  }
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </CCol>
            <CCol sm={12} md={9}>
              <CRow>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Name</h6>
                  <p className="details_description">{`${userData?.first_name} ${userData?.last_name}`}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Email</h6>
                  <p className="details_description" style={{textTransform:"lowercase"}}>{userData?.email}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Phone</h6>
                  <p className="details_description">{userData?.phone}</p>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </div>

        <div className="registration_form">
          <CForm onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
            <CRow className="d-flex ">
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
                {errors.first_name && (
                  <div className="text-danger">{errors.first_name}</div>
                )}
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
                {errors.last_name && (
                  <div className="text-danger">{errors.last_name}</div>
                )}
              </CCol>
              <CCol sm={12} md={6} lg={4} className="my-2">
                <label>Email Address</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Email Address"
                  aria-label="default input example"
                  value={formData.email}
                  readOnly
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </CCol>

              <CCol sm={12} md={6} lg={4} className="my-2">
                <label>Phone Number</label>

                <PhoneInput
                  country={"us"}
                  value={formData.phone}
                  className="form-control"
                  onChange={handlePhoneChange}
                />

                {errors.phone && (
                  <div className="text-danger">{errors.phone}</div>
                )}
              </CCol>

              <CCol md={8} className="my-2">
                <label className="d-flex">Image</label>
                <div className="d-flex gap-4">
                  <CFormInput
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="form-control"
                    style={{ height: "40px" }}
                  />

                  {formData?.image && (
                    <img
                      src={
                        typeof formData?.image === "string"
                          ? `http://3.12.136.26:8000/${formData?.image}`
                          : URL.createObjectURL(formData?.image)
                      }
                      className=""
                      style={{
                        maxWidth: "150px",
                        maxHeight: "100px",
                        objectFit: "contain",
                        borderRadius: "10px",
                      }}
                    />
                  )}
                </div>

                {errors.image && (
                  <div className="text-danger">{errors.image}</div>
                )}
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

export default Profile;
