import React, { useEffect, useState } from "react";
import {
  CButton,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
} from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import { cilArrowLeft } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  addAdmintData,
  getAdminbyId,
  getAllLocation,
  getLocation,
  registerUser,
  updateAdmin,
} from "../../utils/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { CMultiSelect } from "@coreui/react-pro";
import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";

const AdminRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [locationFilter, setLocationFilter] = useState([]);
  const [options] = useState([
    { name: "Full Access", id: 0 },
    { name: "Location Tab only", id: 1 },
    { name: "Court Bookings Tab only", id: 2 },
    { name: "Reporting Only", id: 3 },
  ]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirm_password: "",
    user_type: 1,
    access_flag: [],
    location_id: "",
    locations_id: "",
  });
  const [locationAddress, setLocationAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const selectedOptions = options.filter((option) =>
    formData?.access_flag?.includes(option.id)
  );
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword(!showConfPassword);
  };

  useEffect(() => {
    getAdminData();
  }, [id]);

  const getAdminData = () => {
    getAdminbyId(id)
      .then((res) => {
        if (res?.status == 200 || res?.status == 201) {
          setFormData(res?.data);
          const loc = res?.data?.locations?.[0];
          const address = `${loc?.address_1 ? loc?.address_1 : ""} ${loc?.address_2 ? loc?.address_2 : ""} ${loc?.address_3 ? loc?.address_3 : ""} ${loc?.address_4 ? loc?.address_4 : ""}`;
          setLocationAddress(address);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLocationData();
  }, []);

  const getLocationData = () => {
    getAllLocation()
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          setLocationFilter(res?.data?.results);
        } else {
          setLocationFilter([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setLocationFilter([]);
      });
  };

  const onSelect = (selectedList) => {
    const selectedIds = selectedList.map((item) => item.id);

    if (selectedIds.includes(0)) {
      // If Full Access selected, ignore all others
      setFormData((prevState) => ({
        ...prevState,
        access_flag: "0", // Store as string
      }));
    } else {
      // If Full Access was already selected, don't allow adding others
      if (formData.access_flag === "0") return;

      const formatted = selectedIds.join(","); // Convert to string
      setFormData((prevState) => ({
        ...prevState,
        access_flag: formatted,
      }));
    }

    const isEditMode = Boolean(id);
    const fieldErrors = validateFormData(
      { ...formData, access_flag: selectedIds.join(",") },
      isEditMode,
      "access_flag"
    );

    setErrors((prevErrors) => ({
      ...prevErrors,
      access_flag: fieldErrors.access_flag || "",
    }));
  };

  const onRemove = (selectedList) => {
    const selectedIds = selectedList.map((item) => item.id);

    const formatted = selectedIds.join(",");
    setFormData((prevState) => ({
      ...prevState,
      access_flag: formatted,
    }));

    const isEditMode = Boolean(id);
    const fieldErrors = validateFormData(
      { ...formData, access_flag: formatted },
      isEditMode,
      "access_flag"
    );

    setErrors((prevErrors) => ({
      ...prevErrors,
      access_flag: fieldErrors.access_flag || "",
    }));
  };

  const renderedOptions = options.map((option) => {
    if (formData?.access_flag?.includes(0) && option.id !== 0) {
      return { ...option, disabled: true };
    }
    return { ...option, disabled: false };
  });

  const validateFormData = (
    data,
    isEditMode = false,
    fieldToValidate = null
  ) => {
    const errors = {};

    const validateField = (field) => {
      switch (field) {
        case "first_name":
          if (!data.first_name.trim()) {
            errors.first_name = "First name is required.";
          } else if (data.first_name.length < 2) {
            errors.first_name = "First name must be at least 2 characters.";
          } else if (data.first_name.length > 100) {
            errors.first_name =
              "First name must be no more than 100 characters.";
          }
          break;
        case "last_name":
          if (!data.last_name.trim()) {
            errors.last_name = "Last name is required.";
          } else if (data.last_name.length < 2) {
            errors.last_name = "Last name must be at least 2 characters.";
          } else if (data.last_name.length > 100) {
            errors.last_name = "Last name must be no more than 100 characters.";
          }
          break;
        case "email":
          if (!data.email.trim()) {
            errors.email = "Email is required.";
          } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email is not valid.";
          }
          break;
        case "phone":
          if (!data.phone.trim()) {
            errors.phone = "Phone number is required.";
          } else if (data.phone.length < 7) {
            errors.phone = "Phone number must be at least 7 characters.";
          }
          break;
        case "country":
          if (!data.country.trim()) {
            errors.country = "Country code is required.";
          }
          break;
        case "location_id":
        case "locations_id": {
          const key =
            data.location_id !== undefined ? "location_id" : "locations_id";
          const value = data[key]?.trim();
          if (!value) {
            errors.location_id = "Location is required.";
          }
          break;
        }
        case "password":
          if (!isEditMode && !data.password) {
            errors.password = "Password is required.";
          } else if (data.password) {
            const strongPasswordRegex =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

            if (!strongPasswordRegex.test(data.password)) {
              errors.password =
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
            }
          }
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
        case "access_flag":
          if (!data.access_flag || data.access_flag.length === 0) {
            errors.access_flag = "Permission is required.";
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

    const isEditMode = Boolean(id);
    const fieldErrors = validateFormData(
      { ...formData, phone: value, country: data.countryCode },
      isEditMode,
      "phone"
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: fieldErrors.phone || "",
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
    let payload = formData;
    if (isEditMode) {
      // remove locations AND rename location_id → locatios_id
      const { locations, location_id, ...rest } = formData;

      payload = {
        ...rest,
        locatios_id: location_id, // renamed key
      };
    }

    setLoading(true);

    const apiCall = isEditMode
      ? updateAdmin(id, payload)
      : addAdmintData(formData);

    apiCall
      .then((res) => {
        setLoading(false);
        if (res.status === 200 || res.status === 201) {
          navigate(-1);
          toast.success(res?.data?.message, { theme: "colored" });
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
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
    }),
  };

  const optionsLocation = locationFilter?.map((address) => ({
    value: address?.id,
    label: `${address?.address_1 || ""} ${address?.address_2 || ""} ${address?.address_3 || ""} ${address?.address_4 || ""}`,
  }));

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
                  Admins Registration
                </h4>
                <div className="card_description">
                  {id ? "Edit admin" : "Add new admin"}
                </div>
              </div>
            </div>
          </CCol>
        </CRow>

        <div className="registration_form">
          <CForm onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
            <CRow className="d-flex ">
              {/* {locationFilter?.length > 0 && ( */}
              <CCol md={4} className="my-2">
                <label>Select Location</label>
                <Select
                  name="location_id"
                  styles={customStyles}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select Location"
                  options={optionsLocation}
                  value={optionsLocation.find(
                    (opt) =>
                      opt.value === formData?.location_id ||
                      opt.value === formData?.locations_id
                  )}
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "location_id",
                        value: selectedOption?.value,
                      },
                    })
                  }
                  isDisabled={!!id}
                />
                {errors.location_id && (
                  <div className="text-danger">{errors.location_id}</div>
                )}
              </CCol>
              {/* )} */}
              <CCol sm={12} md={6} lg={4} className="my-2">
                <label>First Name</label>
                <CFormInput
                  type="text"
                  className="register_input"
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
                  aria-label="default input example"
                  value={formData.email}
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                  readOnly={!!id}
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
                  autoComplete="off"
                  className="form-control"
                  onChange={handlePhoneChange}
                />

                {errors.phone && (
                  <div className="text-danger">{errors.phone}</div>
                )}
              </CCol>

              {!id && (
                <>
                  <CCol sm={12} md={6} lg={4} className="my-2">
                    <div className="position-relative">
                      <label>Password</label>

                      <CFormInput
                        type={showPassword ? "text" : "password"}
                        className="register_input"
                        placeholder="Enter Password"
                        aria-label="default input example"
                        value={formData.password}
                        name="password"
                        onChange={(e) => handleInputChange(e)}
                      />
                      <i
                        className={
                          showPassword ? "bi bi-eye-slash" : "bi bi-eye-fill"
                        }
                        onClick={() => togglePasswordVisibility()}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          right: "10px",
                          top: "38px",
                          color: "#0860FB",
                          zIndex: "99",
                        }}
                      />
                      {errors.password && (
                        <div className="text-danger">{errors.password}</div>
                      )}
                    </div>
                  </CCol>

                  <CCol sm={12} md={6} lg={4} className="my-2">
                    <div className="position-relative">
                      <label>Confirm Password</label>

                      <CFormInput
                        type={showConfPassword ? "text" : "password"}
                        className="register_input"
                        placeholder="Enter Password"
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
                          top: "38px",
                          color: "#0860FB",
                          zIndex: "99",
                        }}
                      />
                    </div>
                    {errors.confirm_password && (
                      <div className="text-danger">
                        {errors.confirm_password}
                      </div>
                    )}
                  </CCol>
                </>
              )}

              <CCol sm={12} md={6} lg={4} className="my-2">
                <label>Permission</label>
                <Multiselect
                  options={renderedOptions}
                  autoComplete="off"
                  selectedValues={selectedOptions}
                  onSelect={onSelect}
                  onRemove={onRemove}
                  displayValue="name"
                  className={
                    formData?.access_flag?.length > 0
                      ? "permission_multi_select"
                      : "fix_height"
                  }
                />
                {errors.access_flag && (
                  <div className="text-danger">{errors.access_flag}</div>
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

export default AdminRegistration;
