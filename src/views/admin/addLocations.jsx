import React, { useState } from "react";
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

const AddLocations = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    user: "",
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
    id: "",
    description: "",
  });

  const handleBackNavigate = () => {
    navigate(-1);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("formData",formData)
  }

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
              <CCol sm={12} md={6} lg={3} className="my-1">
                <label>ID KEY</label>
                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter ID KEY"
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
              </CCol>
              <CCol sm={12} md={6} lg={3} className="my-1">
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
              </CCol>
              <CCol sm={12} md={6} lg={3} className="my-1">
                <label>Phone</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Phone"
                  aria-label="default input example"
                  value={formData.phone}
                  name="phone"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </CCol>
              <CCol sm={12} md={6} lg={3} className="my-1">
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
              </CCol>
              <CCol sm={12} md={6} lg={3} className="my-1">
                <label>State</label>

                <CFormInput
                  type="password"
                  className="register_input"
                  placeholder="Enter State"
                  aria-label="default input example"
                  value={formData.state}
                  name="state"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </CCol>
              <CCol sm={12} md={6} lg={3} className="my-1">
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
              </CCol>
              <CCol sm={12} md={6} lg={3} className="my-1">
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
                <CButton className="add_new_butn">Save</CButton>
              </CCol>
            </CRow>
          </CForm>
        </div>
      </CCardBody>
    </>
  );
};

export default AddLocations;
