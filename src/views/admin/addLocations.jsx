import React from "react";
import {
  CButton,
  CCardBody,
  CCol,
  CFormInput,
  CFormTextarea,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { useNavigate, useParams } from "react-router-dom";

const AddLocations = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const handleBackNavigate = () => {
    navigate(-1);
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
                <div className="small text-body-secondary">
                  {`List of Locations > Beach Badminton Club`}
                </div>
              </div>
            </div>
          </CCol>
        </CRow>

        <div className=" add_location_form">
          <CRow className="d-flex justify-content-center">
            <CCol sm={12} md={6} lg={3} className="my-1">
              <label>ID KEY</label>
              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter ID KEY"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={3} className="my-1">
              <label>Name</label>
              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Name"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={3} className="my-1">
              <label>Email Address</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Email Address"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={3} className="my-1">
              <label>Phone</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Phone"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={3} className="my-1">
              <label>City</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter City"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={3} className="my-1">
              <label>State</label>

              <CFormInput
                type="password"
                className="register_input"
                placeholder="Enter State"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={3} className="my-1">
              <label>Country</label>
              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Country"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={3} className="my-1">
              <label>Website</label>
              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Website"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={6} className="my-1">
              <label>Address 1</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Address 1"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={6} className="my-1">
              <label>Address 2</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Address 2"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={6} className="my-1">
              <label>Address 3</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Address 3"
                aria-label="default input example"
              />
            </CCol>
            <CCol sm={12} md={6} lg={6} className="my-1">
              <label>Address 4</label>

              <CFormInput
                type="text"
                className="register_input"
                placeholder="Enter Address 4"
                aria-label="default input example"
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
              />
            </CCol>

            <CCol sm={12} md={12} lg={12} className="mt-5">
              <CButton className="add_new_butn">Save</CButton>
            </CCol>
          </CRow>
        </div>
      </CCardBody>
    </>
  );
};

export default AddLocations;
