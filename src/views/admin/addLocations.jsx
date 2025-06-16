import React, { useEffect, useState } from "react";
import {
  CButton,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { addLocation, getLocationbyId, updateLocation } from "../../utils/api";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";

const AddLocations = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("logged_user_data"));
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    address_1: "",
    address_2: "",
    address_3: "",
    address_4: "",
    city: "",
    phone: "",
    website: "",
    state: "",
    country: "",
    description: "",
    user: userData?.id,
  });

  const [errors, setErrors] = useState({});

  const validateFormData = (data, fieldToValidate = null) => {
    const errors = {};

    const validateField = (field) => {
      switch (field) {
        case "email":
          if (!data.email.trim()) {
            errors.email = "Email is required.";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "Enter a valid email address.";
          }
          break;
        case "address_1":
          if (!data.address_1.trim())
            errors.address_1 = "Address 1 is required.";
          break;
        case "city":
          if (!data.city.trim()) errors.city = "City is required.";
          break;
        case "phone":
          if (!data.phone.trim()) errors.phone = "Phone number is required.";
          break;
        case "state":
          if (!data.state.trim()) errors.state = "State is required.";
          break;
        case "country":
          if (!data.country.trim()) errors.country = "Country is required.";
          break;
        case "website":
          if (
            data.website &&
            !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(data.website)
          ) {
            errors.website = "Enter a valid website URL.";
          }
          break;
        default:
          break;
      }
    };

    if (fieldToValidate) {
      validateField(fieldToValidate);
    } else {
      Object.keys(data).forEach(validateField);
    }

    return errors;
  };

  useEffect(() => {
    getLocationbyId(id)
      .then((res) => {
        if (res?.status == 200) {
          setFormData(res?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleBackNavigate = () => {
    navigate(-1);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };

    setFormData(updatedData);

    const fieldErrors = validateFormData(updatedData, name);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }));
  };

  const handlePhoneChange = (value, data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone: value, // full phone number
      country: data.countryCode.toUpperCase(), // e.g., "US"
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    if (id) {
      updateLocation(id, formData)
        .then((res) => {
          setLoading(false);

          if (res?.status == 200 || res?.status == 201) {
            toast.success(res?.data?.message, {
              theme: "colored",
            });
            navigate("/locations");
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
          setLoading(false);
        });
    } else {
      addLocation(formData)
        .then((res) => {
          setLoading(false);

          if (res?.status == 200 || res?.status == 201) {
            toast.success(res?.data?.message, {
              theme: "colored",
            });
            navigate("/locations");
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
          setLoading(false);
        });
    }
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
                  {id ? "Edit" : "Add"} Location Details
                </h4>
                <div className="card_description">
                  {`List of Locations > Beach Badminton Club`}
                </div>
              </div>
            </div>
          </CCol>
        </CRow>

        <div className=" add_location_form">
          <CForm onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
            <CRow className="d-flex justify-content-center">
              {/* <CCol sm={12} md={6} lg={3} className="my-1">
                <label>Id Key</label>
                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Id Key"
                  aria-label="default input example"
                  name="id"
                  value={formData.id}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </CCol>
              <CCol sm={12} md={6} lg={3} className="my-1">
                <label>Name</label>
                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Name"
                  aria-label="default input example"
                  name="user"
                  value={formData.user}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </CCol> */}
              <CCol sm={12} md={6} lg={6} className="my-1">
                <label>Email Address</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Email Address"
                  aria-label="default input example"
                  value={formData.email}
                  name="email"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </CCol>
              <CCol sm={12} md={6} lg={6} className="my-1">
                <label>Phone</label>
                <PhoneInput
                  country={"us"}
                  value={formData.phone}
                  className="form-control"
                  onChange={handlePhoneChange}
                />
                {/* <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Phone"
                  aria-label="default input example"
                  value={formData.phone}
                  name="phone"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                /> */}
                {errors.phone && (
                  <div className="text-danger">{errors.phone}</div>
                )}
              </CCol>
              <CCol sm={12} md={6} lg={4} className="my-1">
                <label>City</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter City"
                  aria-label="default input example"
                  value={formData.city}
                  name="city"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                {errors.city && (
                  <div className="text-danger">{errors.city}</div>
                )}
              </CCol>
              <CCol sm={12} md={6} lg={4} className="my-1">
                <label>State</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter State"
                  aria-label="default input example"
                  value={formData.state}
                  name="state"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                {errors.state && (
                  <div className="text-danger">{errors.state}</div>
                )}
              </CCol>
              {/* <CCol sm={12} md={6} lg={4} className="my-1">
                <label>Country</label>
                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Country"
                  aria-label="default input example"
                  value={formData.country}
                  name="country"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                {errors.country && (
                  <div className="text-danger">{errors.country}</div>
                )}
              </CCol> */}
              <CCol sm={12} md={6} lg={4} className="my-1">
                <label>Website</label>
                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Website"
                  aria-label="default input example"
                  value={formData.website}
                  name="website"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                {errors.website && (
                  <div className="text-danger">{errors.website}</div>
                )}
              </CCol>
              <CCol sm={12} md={6} lg={6} className="my-1">
                <label>Address 1</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Address 1"
                  aria-label="default input example"
                  value={formData.address_1}
                  name="address_1"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                {errors.address_1 && (
                  <div className="text-danger">{errors.address_1}</div>
                )}
              </CCol>
              <CCol sm={12} md={6} lg={6} className="my-1">
                <label>Address 2</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Address 2"
                  aria-label="default input example"
                  value={formData.address_2}
                  name="address_2"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </CCol>
              <CCol sm={12} md={6} lg={6} className="my-1">
                <label>Address 3</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Address 3"
                  aria-label="default input example"
                  value={formData.address_3}
                  name="address_3"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </CCol>
              <CCol sm={12} md={6} lg={6} className="my-1">
                <label>Address 4</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Address 4"
                  aria-label="default input example"
                  value={formData.address_4}
                  name="address_4"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </CCol>
              <CCol sm={12} md={12} lg={12} className="my-1">
                <label>Description</label>

                <CFormTextarea
                  type="text"
                  cols={4}
                  className="register_input"
                  placeholder="Enter Description"
                  aria-label="default input example"
                  value={formData.description}
                  name="description"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </CCol>

              <CCol sm={12} md={12} lg={12} className="mt-5">
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

export default AddLocations;
