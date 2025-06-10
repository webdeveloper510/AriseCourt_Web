import React from "react";
import { CButton, CCardBody, CCol, CFormInput, CRow } from "@coreui/react";
import { useParams } from "react-router-dom";

const AdminRegistration = () => {
  const {id} = useParams();
  return (
    <>
      <CCardBody className="p-2">
        <CRow>
          <CCol sm={5}>
            <h4 id="traffic" className="card-title mb-0">
              Admin Registration
            </h4>
            <div className="small text-body-secondary">{id ? "Edit" : "Add"} new Users</div>
          </CCol>
        </CRow>

        <div className="registration_form">
          <CRow className="d-flex justify-content-center">
            <CCol sm={12} md={6} lg={4} className="my-2" >
              <label>First Name</label>
              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter First Name"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={4} className="my-2" >
              <label>Last Name</label>
              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Last Name"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={4} className="my-2" >
              <label>Email Address</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Email Address"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={4} className="my-2" >
              <label>User Type</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter User Type"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={4} className="my-2" >
              <label>Phone Number</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Phone Number"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={4} className="my-2" >
              <label>Password</label>

              <CFormInput
                type="password"
                className="register_input"
                placeholder="Enter Password"
                aria-label="default input example"
              />
            </CCol>
            <CCol md={12} className="mt-4">
              <CButton className="add_new_butn">Save</CButton>
            </CCol>
          </CRow>
        </div>
      </CCardBody>
    </>
  );
};

export default AdminRegistration;
