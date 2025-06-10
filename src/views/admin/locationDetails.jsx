import React, { useState } from "react";
import {
  CButton,
  CCardBody,
  CCol,
  CFormInput,
  CTableBody,
  CRow,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilPenNib, cilDelete, cilArrowLeft } from "@coreui/icons";
import { Link, useNavigate } from "react-router-dom";
import badminton from "../../assets/images/badminton.png";
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const LocationDetails = () => {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const handleBackNavigate = () => {
    navigate(-1);
  };
  const handleEditLocation = () => {
    navigate(`/update-locations/12`);
  };

  return (
    <>
      <CCardBody className="p-2">
        <CRow>
          <CCol sm={12} md={6}>
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
                  Location Details
                </h4>
                <div className="card_description">
                  {`List of Locations > Beach Badminton Club`}
                </div>
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
              <div className="badminton_bg">
                <img src={badminton} alt="logo" />
              </div>
            </CCol>
            <CCol sm={12} md={9}>
              <CRow>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">ID KEY</h6>
                  <p className="details_description">#3214</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">City</h6>
                  <p className="details_description">California</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Email</h6>
                  <p className="details_description">dummy221@gmail.com</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Phone</h6>
                  <p className="details_description">01796-329869</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Name</h6>
                  <p className="details_description">Beach Badminton Club</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">State</h6>
                  <p className="details_description">west coast</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Website</h6>
                  <p className="details_description">
                    www.dummywebsitelink.com
                  </p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Country</h6>
                  <p className="details_description">USA</p>
                </CCol>
                <CCol sm={12} md={12} className="my-1">
                  <h6 className="detail_title">Description</h6>
                  <p className="details_description">
                    Reference site about Lorem Ipsum, giving information n its
                    origins, as well as a random Lipsum generator. Reference
                    site about Lorem Ipsum, giving information on its origins,
                    as well as a random Lipsum generator.
                  </p>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </div>

        <div className="address_Section mt-4">
          <CRow>
            <CCol sm={12} md={6}>
              <label className="add_court_label">Address 1</label>
              <p>
                f-298, 8B, Industrial Area, Sector 74, S.A.S. Nagar, North
                160055
              </p>
            </CCol>
            <CCol sm={12} md={6}>
              <label className="add_court_label">Address 1</label>
              <p>
                f-298, 8B, Industrial Area, Sector 74, S.A.S. Nagar, North
                160055
              </p>
            </CCol>
          </CRow>
        </div>

        <div className="address_Section mt-4">
          <CRow>
            <CCol md={6} sm={12}>
              <h4 id="traffic" className="card-title mb-0">
                Courts List
              </h4>
            </CCol>
            <CCol sm={12} md={6} className="text-end">
              <CButton
                className="add_new_butn"
                onClick={() => setVisible(true)}
              >
                + Add New
              </CButton>
            </CCol>
          </CRow>
          <CTable className="mt-4 main_table" striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Court Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Location ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Court Fee by Hour
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Taxes percentage
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">cc fees%</CTableHeaderCell>
                <CTableHeaderCell scope="col">Availability</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>01</CTableDataCell>
                <CTableDataCell>#3214</CTableDataCell>
                <CTableDataCell>$8.00/hr</CTableDataCell>
                <CTableDataCell>2%</CTableDataCell>
                <CTableDataCell>2%</CTableDataCell>
                <CTableDataCell>$57.00</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={cilPencil}></CIcon>
                  <CIcon icon={cilDelete}></CIcon>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>01</CTableDataCell>
                <CTableDataCell>#3214</CTableDataCell>
                <CTableDataCell>$8.00/hr</CTableDataCell>
                <CTableDataCell>2%</CTableDataCell>
                <CTableDataCell>2%</CTableDataCell>
                <CTableDataCell>$57.00</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={cilPencil}></CIcon>
                  <CIcon icon={cilDelete}></CIcon>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>01</CTableDataCell>
                <CTableDataCell>#3214</CTableDataCell>
                <CTableDataCell>$8.00/hr</CTableDataCell>
                <CTableDataCell>2%</CTableDataCell>
                <CTableDataCell>2%</CTableDataCell>
                <CTableDataCell>$57.00</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={cilPencil}></CIcon>
                  <CIcon icon={cilDelete}></CIcon>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>01</CTableDataCell>
                <CTableDataCell>#3214</CTableDataCell>
                <CTableDataCell>$8.00/hr</CTableDataCell>
                <CTableDataCell>2%</CTableDataCell>
                <CTableDataCell>2%</CTableDataCell>
                <CTableDataCell>$57.00</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={cilPencil}></CIcon>
                  <CIcon icon={cilDelete}></CIcon>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>01</CTableDataCell>
                <CTableDataCell>#3214</CTableDataCell>
                <CTableDataCell>$8.00/hr</CTableDataCell>
                <CTableDataCell>2%</CTableDataCell>
                <CTableDataCell>2%</CTableDataCell>
                <CTableDataCell>$57.00</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={cilPencil}></CIcon>
                  <CIcon icon={cilDelete}></CIcon>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>01</CTableDataCell>
                <CTableDataCell>#3214</CTableDataCell>
                <CTableDataCell>$8.00/hr</CTableDataCell>
                <CTableDataCell>2%</CTableDataCell>
                <CTableDataCell>2%</CTableDataCell>
                <CTableDataCell>$57.00</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={cilPencil}></CIcon>
                  <CIcon icon={cilDelete}></CIcon>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </div>
      </CCardBody>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
        alignment="center"
      >
        <CModalBody className="modal_body_court">
          <div className="add_court_modal">
            <div className="text-center">
              <h4 className="card-title mb-0">Add Court</h4>
            </div>
            <CRow className="d-flex mt-4 justify-content-center">
              <CCol sm={12} md={6} lg={6} className="my-1">
                <label className="add_court_label">Location ID</label>
                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Location ID"
                  aria-label="default input example"
                />
              </CCol>
              <CCol sm={12} md={6} lg={6} className="my-1">
                <label className="add_court_label">Court Number</label>
                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Court Number"
                  aria-label="default input example"
                />
              </CCol>
              <CCol sm={12} md={6} lg={6} className="my-1">
                <label className="add_court_label">Court Fee by Hour</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Court Fee by Hour"
                  aria-label="default input example"
                />
              </CCol>
              <CCol sm={12} md={6} lg={6} className="my-1">
                <label className="add_court_label">Taxes percentage</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter Taxes percentage"
                  aria-label="default input example"
                />
              </CCol>
              <CCol sm={12} md={6} lg={6} className="my-1">
                <label className="add_court_label">cc fees%</label>

                <CFormInput
                  type="text"
                  className="register_input"
                  placeholder="Enter cc fees%"
                  aria-label="default input example"
                />
              </CCol>
              <CCol sm={12} md={6} lg={6} className="my-1">
                <label className="add_court_label">User Type</label>

                <CFormInput
                  type="password"
                  className="register_input"
                  placeholder="Enter User Type"
                  aria-label="default input example"
                />
              </CCol>
            </CRow>
            <div className="d-flex gap-2 mt-4 justify-content-end">
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton className="add_new_butn">Save</CButton>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export default LocationDetails;
