import React from "react";
import { CCardBody, CCol, CFormInput, CRow } from "@coreui/react";

const CourtConfiguration = () => {
  return (
    <>
      <CCardBody className="p-2">
        <CRow>
          <CCol sm={5}>
            <h4 id="traffic" className="card-title mb-0">
            Court Configuration
            </h4>
            <div className="small text-body-secondary">Number of Courts Per Location
            Fields</div>
          </CCol>
        </CRow>

        <div className="registration_form">
          <CRow className="d-flex justify-content-center">
            <CCol sm={12} md={6} lg={4}>
              <label>First Name</label>
              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter First Name"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={4}>
              <label>Last Name</label>
              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Last Name"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={4}>
              <label>Email Address</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Email Address"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={4}>
              <label>User Type</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter User Type"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={4}>
              <label>Phone Number</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Phone Number"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={4}>
              <label>Password</label>

              <CFormInput
                type="password"
                className="register_input"
                placeholder="Enter Password"
                aria-label="default input example"
              />
            </CCol>
          </CRow>
        </div>
      </CCardBody>
    </>
  );
};

export default CourtConfiguration;
