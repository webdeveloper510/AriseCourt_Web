import React, { useEffect, useState } from "react";
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
  CFormSwitch,
  CForm,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilPenNib, cilDelete, cilArrowLeft } from "@coreui/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import badminton from "../../assets/images/badminton.png";
import { CModal, CModalBody } from "@coreui/react";
import deleteImage from "../../assets/images/delete_image.png";
import {
  addCourtData,
  deleteCourtbyId,
  getCourts,
  getLocationbyId,
  updateCourt,
} from "../../utils/api";
import { toast } from "react-toastify";

const LocationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [deletCourt, setDeletCourt] = useState(false);
  const [deletCourtId, setDeletCourtId] = useState("");
  const [formData, setFormData] = useState(null);
  const [courtData, setCourtData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addCourt, setAddCourt] = useState({
    location_id: id,
    court_number: "",
    court_fee_hrs: "",
    tax: "",
    cc_fees: "",
    availability: true,
  });
  const [courtId, setCourtId] = useState("");
  const [errors, setErrors] = useState({});
  const itemsPerPage = 5; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalCounts = courtData.length;
  const totalPages = Math.ceil(totalCounts / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Set the new page
    }
  };

  // Get data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courtData.slice(indexOfFirstItem, indexOfLastItem); // Slice the data to display on current page

  // Create page numbers dynamically
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleCourtInput = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...addCourt, [name]: value };

    setAddCourt(updatedData);

    const fieldErrors = validateCourtData(updatedData);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }));
  };

  const validateCourtData = (data) => {
    const errors = {};

    if (!data.court_number.trim()) {
      errors.court_number = "Court number is required.";
    }

    if (!data.court_fee_hrs || isNaN(data.court_fee_hrs)) {
      errors.court_fee_hrs = "Court fee per hour must be a number.";
    }

    if (!data.tax || isNaN(data.tax)) {
      errors.tax = "Tax must be a number.";
    }

    if (!data.cc_fees || isNaN(data.cc_fees)) {
      errors.cc_fees = "CC fees must be a number.";
    }

    return errors;
  };

  useEffect(() => {
    getLocationDatabyId();
    // getCourtsData(currentPage);
  }, [id]);

  const getLocationDatabyId = () => {
    setLoading(true);
    getLocationbyId(id)
      .then((res) => {
        setLoading(false);
        if (res?.status == 200) {
          setFormData(res?.data);
          setCourtData(res?.data?.courts);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // const getCourtsData = (page = 1) => {
  //   getCourts(id, page)
  //     .then((res) => {
  //       if (res.status == 200) {
  //         setCourtData(res?.data?.results);
  //       } else {
  //         setCourtData([]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setCourtData([]);
  //     });
  // };

  const handleBackNavigate = () => {
    navigate(-1);
  };
  const handleEditLocation = () => {
    navigate(`/update-locations/12`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateCourtData(addCourt);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    if (courtId) {
      updateCourt(courtId, addCourt)
        .then((res) => {
          setLoading(false);
          if (res?.status == 200 || res?.status == 201) {
            setVisible(false);
            toast.success(res?.data?.message, {
              theme: "colored",
            });
            getLocationDatabyId();
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      addCourtData(addCourt)
        .then((res) => {
          setLoading(false);
          if (res?.status == 200 || res?.status == 201) {
            setVisible(false);
            toast.success(res?.data?.message, {
              theme: "colored",
            });
            getLocationDatabyId();
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

  const handleEditCourtModal = (id, data) => {
    setVisible(true);
    setCourtId(id);
    setAddCourt(data);
  };

  const handleDeletCourtModal = (id) => {
    setDeletCourt(true);
    setDeletCourtId(id);
  };

  const handleDeleteCourt = () => {
    setLoading(true);
    deleteCourtbyId(deletCourtId)
      .then((res) => {
        setLoading(false);
        if (res.status == 200 || res?.status == 204) {
          toast.success(res?.data?.message, {
            theme: "colored",
          });
          getLocationDatabyId();
          setDeletCourt(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
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

        <div className="address_Section mt-4">
          <CRow>
            <CCol sm={12} md={6}>
              <label className="add_court_label">Address 1</label>
              <p>{formData?.address_1}</p>
            </CCol>
            <CCol sm={12} md={6}>
              <label className="add_court_label">Address 1</label>
              <p>{formData?.address_2}</p>
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

          {courtData?.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
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
                {currentItems?.map((item, i) => {
                  return (
                    <CTableRow key={i}>
                      <CTableDataCell>{item?.court_number}</CTableDataCell>
                      <CTableDataCell>{item?.location_id}</CTableDataCell>
                      <CTableDataCell>{`$${item?.court_fee_hrs}/hr`}</CTableDataCell>
                      <CTableDataCell>{`${item?.tax}%`}</CTableDataCell>
                      <CTableDataCell>{`${item?.cc_fees}%`}</CTableDataCell>
                      <CTableDataCell>{`${item?.availability}`}</CTableDataCell>
                      <CTableDataCell>
                        <CIcon
                          className="edit_icon me-2"
                          onClick={() => handleEditCourtModal(item?.id, item)}
                          icon={cilPencil}
                        ></CIcon>
                        <CIcon
                          className="delete_icon"
                          onClick={() => handleDeletCourtModal(item?.id, item)}
                          icon={cilDelete}
                        ></CIcon>
                      </CTableDataCell>
                    </CTableRow>
                  );
                })}
              </CTableBody>
            </CTable>
            </div>
          ) : (
            <div className="my-5 d-flex justify-content-center">
              <h1 className="card-title">Data Not Found</h1>
            </div>
          )}

          {courtData?.length > 0 && (
            <div className="pagination_outer mt-5">
              <div className="pagination_section">
                <CRow className="align-items-center">
                  <CCol md={6}>
                    <p className="showing_page">
                      {`Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, totalCounts)} of ${totalCounts} entries`}
                    </p>
                  </CCol>
                  <CCol md={6}>
                    <CPagination
                      align="end"
                      aria-label="Page navigation example"
                    >
                      <CPaginationItem
                        disabled={currentPage === 1}
                        className="prev_next"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        {"<<"}
                      </CPaginationItem>
                      {pageNumbers.map((page) => (
                        <CPaginationItem
                          key={page}
                          active={currentPage === page}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </CPaginationItem>
                      ))}
                      <CPaginationItem
                        disabled={currentPage === totalPages}
                        className="prev_next"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        {">>"}
                      </CPaginationItem>
                    </CPagination>
                  </CCol>
                </CRow>
              </div>
            </div>
          )}
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
              <h4 className="card-title mb-0">
                {courtId ? "Edit" : "Add"} Court
              </h4>
            </div>
            <CForm onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
              <CRow className="d-flex mt-4 justify-content-center">
                <CCol sm={12} md={6} lg={6} className="my-1">
                  <label className="add_court_label">Court Number</label>
                  <CFormInput
                    type="text"
                    className="register_input"
                    placeholder="Enter Court Number"
                    aria-label="default input example"
                    value={addCourt?.court_number}
                    name="court_number"
                    onChange={(e) => handleCourtInput(e)}
                  />
                  {errors.court_number && (
                    <div className="text-danger">{errors.court_number}</div>
                  )}
                </CCol>
                <CCol sm={12} md={6} lg={6} className="my-1">
                  <label className="add_court_label">Court Fee by Hour</label>

                  <CFormInput
                    type="text"
                    className="register_input"
                    placeholder="Enter Court Fee by Hour"
                    aria-label="default input example"
                    value={addCourt?.court_fee_hrs}
                    name="court_fee_hrs"
                    onChange={(e) => handleCourtInput(e)}
                  />
                  {errors.court_fee_hrs && (
                    <div className="text-danger">{errors.court_fee_hrs}</div>
                  )}
                </CCol>
                <CCol sm={12} md={6} lg={6} className="my-1">
                  <label className="add_court_label">Taxes percentage</label>

                  <CFormInput
                    type="text"
                    className="register_input"
                    placeholder="Enter Taxes percentage"
                    aria-label="default input example"
                    value={addCourt?.tax}
                    name="tax"
                    onChange={(e) => handleCourtInput(e)}
                  />
                  {errors.tax && (
                    <div className="text-danger">{errors.tax}</div>
                  )}
                </CCol>
                <CCol sm={12} md={6} lg={6} className="my-1">
                  <label className="add_court_label">cc fees%</label>

                  <CFormInput
                    type="text"
                    className="register_input"
                    placeholder="Enter cc fees%"
                    aria-label="default input example"
                    value={addCourt?.cc_fees}
                    name="cc_fees"
                    onChange={(e) => handleCourtInput(e)}
                  />
                  {errors.cc_fees && (
                    <div className="text-danger">{errors.cc_fees}</div>
                  )}
                </CCol>
                <CCol sm={12} md={6} lg={6} className="my-1">
                  <label className="add_court_label">Availability</label>
                  <CFormSwitch
                    id="formSwitchCheckDefault"
                    checked={addCourt.availability}
                    onChange={(e) =>
                      setAddCourt({
                        ...addCourt,
                        availability: e.target.checked,
                      })
                    }
                  />
                </CCol>
                <CCol sm={12} md={6} lg={6}></CCol>
              </CRow>
              <div className="d-flex gap-2 mt-4 justify-content-end">
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton type="submit" className="add_new_butn">
                  Save
                </CButton>
              </div>
            </CForm>
          </div>
        </CModalBody>
      </CModal>

      <CModal
        alignment="center"
        visible={deletCourt}
        onClose={() => setDeletCourt(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalBody className="modal_body_court">
          <div className="add_court_modal text-center">
            <img src={deleteImage} alt="deleteImage" />
            <h1 className="card-title my-4">
              Are You really Want <br /> To Delete?
            </h1>
            <div className="d-flex gap-2 mt-4 justify-content-center">
              <CButton
                type="button"
                onClick={() => handleDeleteCourt()}
                className="add_new_butn"
              >
                Yes
              </CButton>
              <CButton
                type="button"
                color="secondary"
                onClick={() => setDeletCourt(false)}
              >
                No
              </CButton>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export default LocationDetails;
