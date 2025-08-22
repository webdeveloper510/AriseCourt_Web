import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CRow,
} from "@coreui/react";
import Logo from "../../../assets/images/login_logo.png";
import HomeBg from "../../../assets/images/login_bg_image.png";
import { getAllLocation, getAllLocations, loginUser } from "../../../utils/api";
import { toast } from "react-toastify";
import Select from "react-select";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [locationFilter, setLocationFilter] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    location: "",
  });
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState("staff");

  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    getLocationData();
  }, []);

  const getLocationData = () => {
    getAllLocations()
      .then((res) => {
        if (res.status == 200) {
          setLocationFilter(res?.data);
        } else {
          setLocationFilter([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setLocationFilter([]);
      });
  };

  const validateFormData = (formData) => {
    let errors = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is required and must be valid.";
    }

    if (!formData.password || formData.password.length < 6) {
      errors.password =
        "Password is required and must be at least 6 characters long.";
    }

    if (!formData.location && userType == "staff") {
      errors.location = "Location is required ";
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

    let dataToSend = { ...formData };

    if (userType === "super") {
      const { location, ...rest } = formData;
      dataToSend = rest;
    }

    loginUser(dataToSend)
      .then((res) => {
        setLoading(false);
        if (res.data.code == 200) {
          const userData = res?.data?.data;
          const accessToken = res?.data?.data?.access_token;
          localStorage.setItem("role", "superadmin");
          localStorage.setItem("user_access_valid_token", accessToken);
          localStorage.setItem("logged_user_data", JSON.stringify(userData));
          if (userData?.user_type === 0 || userData?.user_type === 1) {
            toast.success(res?.data?.message, { theme: "colored" });
            if (
              userData?.user_type === 0 ||
              userData?.access_flag?.includes("0")
            ) {
              navigate("/reporting");
            } else if (userData?.access_flag?.includes("3")) {
              navigate("/reporting");
            } else if (userData?.access_flag?.includes("1")) {
              if (userData?.user_type === 0) {
                navigate("/locations");
              } else if (userData?.user_type === 1) {
                navigate("/location");
              }
            } else if (userData?.access_flag?.includes("2")) {
              navigate("/court-bookings");
            }
          } else {
            toast.error("Details are incorrect", {
              theme: "colored",
            });
          }
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

  const options = locationFilter.map((address) => {
    const fullAddress = 
    address?.name
      // `${address?.address_1 || ""} ${address?.address_2 || ""} ${address?.address_3 || ""} ${address?.address_4 || ""}`.trim();

    return {
      value: address?.id,
      label:
        fullAddress.length > 60
          ? fullAddress.slice(0, 57) + "..."
          : fullAddress,
      fullLabel: fullAddress, // optional: for tooltip
    };
  });

  return (
    <div className=" min-vh-100 d-flex flex-row align-items-center login_outer">
      <CRow className="justify-content-center" style={{ width: "100%" }}>
        <CCol md={12}>
          <CRow
            className="align-items-center"
            style={{ background: "#E7F0FF" }}
          >
            <CCol md={5}>
              <CCard className="p-3">
                <img src={HomeBg} alt="login_bg" style={{ height: "92vh" }} />
              </CCard>
            </CCol>
            <CCol md={7}>
              <div className="d-flex justify-content-center form_outer_section">
                <div className="form_inner_section">
                  <CForm onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
                    <img src={Logo} alt="login-logo" />
                    <h2 id="traffic" className="card-title mt-3 mb-0">
                      Login
                    </h2>
                    <p className="text-body-secondary">Welcome Back</p>
                    <div className="mb-2">
                      <CButton
                        onClick={() => setUserType("staff")}
                        className={`${userType == "staff" ? "add_new_butn" : "selected_type"}`}
                      >
                        Staff sign in
                      </CButton>
                      <CButton
                        onClick={() => setUserType("super")}
                        className={`mx-2 ${userType == "super" ? "add_new_butn" : "selected_type"}`}
                      >
                        Super User
                      </CButton>
                    </div>
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
                      {errors.email && (
                        <span className="error_message">{errors.email}</span>
                      )}
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
                    {userType == "staff" && (
                      <>
                        <div className="input_section mb-3">
                          <label>Select Location</label>
                          <Select
                            className="select_location"
                            options={options}
                            value={options.find(
                              (opt) => opt.value === formData?.location
                            )}
                            onChange={(selected) =>
                              handleInputChange({
                                target: {
                                  name: "location",
                                  value: selected.value,
                                },
                              })
                            }
                            styles={{
                              control: (base, state) => ({
                                ...base,
                                minHeight: 30,
                                border: "none",
                                boxShadow: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                                "&:hover": {
                                  border: "none",
                                },
                              }),
                              option: (base) => ({
                                ...base,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }),
                              menu: (base) => ({
                                ...base,
                                width: "100%",
                                zIndex: 9999, // ensure it's above other elements
                              }),
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                              indicatorSeparator: () => ({
                                display: "none",
                              }),
                            }}
                            menuPortalTarget={document.body}
                            placeholder="Select Location"
                          />
                        </div>
                        {errors.location && (
                          <div className="text-danger">{errors.location}</div>
                        )}
                      </>
                    )}
                    <CRow>
                      <CCol xs={12} className="">
                        <CButton type="button" className="text_color px-0">
                          <Link to="/forgot-password">Forgot password?</Link>
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
