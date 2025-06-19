import React, { useEffect, useState } from "react";
import { CButton, CCardBody, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPenNib } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import badminton from "../../assets/images/badminton.png";
import UserImage from "../../assets/images/user_image.avif";
import { getProfile } from "../../utils/api";

const Profile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    getProfileData()
  },[])

  const getProfileData = () => {
    getProfile().then((res)=>{
        console.log("getProfile", res)
    }).catch((error)=>{
        console.log(error)
    })
  }

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
          <CCol sm={12} md={6} className="text-end">
            <CButton
              onClick={() => {
                handleEditLocation();
              }}
              className="add_new_butn"
            >
              <CIcon icon={cilPenNib}></CIcon> Edit
            </CButton>
          </CCol>
        </CRow>

        <div className="mt-4 location_Details_section">
          <CRow className="align-items-center">
            <CCol sm={12} md={3}>
              <div className="profile_image">
                <img src={UserImage} alt="logo" />
              </div>
            </CCol>
            <CCol sm={12} md={9}>
              <CRow>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">ID KEY</h6>
                  <p className="details_description">{formData?.id}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">City</h6>
                  <p className="details_description">{formData?.city}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Email</h6>
                  <p className="details_description">{formData?.email}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Phone</h6>
                  <p className="details_description">{formData?.phone}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Name</h6>
                  <p className="details_description">{formData?.name}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">State</h6>
                  <p className="details_description">{formData?.state}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Website</h6>
                  <p className="details_description">{formData?.website}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Country</h6>
                  <p className="details_description">{formData?.country}</p>
                </CCol>
                <CCol sm={12} md={12} className="my-1">
                  <h6 className="detail_title">Description</h6>
                  <p className="details_description">{formData?.description}</p>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </div>
      </CCardBody>
    </>
  );
};

export default Profile;
