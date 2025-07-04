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
    start_time: "",
    end_time: "",
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
    console.log(data);

    const errors = {};

    if (!data.court_number.trim()) {
      errors.court_number = "Court number is required.";
    }

    if (!data.court_fee_hrs || isNaN(data.court_fee_hrs)) {
      errors.court_fee_hrs = "Court fee per hour must be a number.";
    }

    // Regex for max 2 decimal places
    const decimalRegex = /^\d+(\.\d{1,2})?$/;

    if (!data.tax || isNaN(data.tax)) {
      errors.tax = "Tax must be a number.";
    } else if (!decimalRegex.test(data.tax)) {
      errors.tax = "Tax must have at most 2 decimal places.";
    } else if (Number(data.tax) > 100) {
      errors.tax = "Tax cannot be greater than 100.";
    }

    if (!data.cc_fees || isNaN(data.cc_fees)) {
      errors.cc_fees = "CC fees must be a number.";
    } else if (!decimalRegex.test(data.cc_fees)) {
      errors.cc_fees = "CC fees must have at most 2 decimal places.";
    }

    if (!data.start_time || !data.start_time.trim()) {
      errors.start_time = "Start time is required.";
    }

    if (!data.end_time || !data.end_time.trim()) {
      errors.end_time = "End time is required.";
    }

    // Time format validation (24-hour HH:MM)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    // if (data.start_time && !timeRegex.test(data.start_time.trim())) {
    //   errors.start_time = "Start time must be in HH:MM format.";
    // }

    // if (data.end_time && !timeRegex.test(data.end_time.trim())) {
    //   errors.end_time = "End time must be in HH:MM format.";
    // }

    // ✅ Check: end time must be greater than start time

    if (timeRegex.test(data.start_time)) {
      const [startH, startM] = data.start_time.split(":").map(Number);
      const startTotal = startH * 60 + startM;
      if (startTotal % 30 != 0) {
        errors.start_time =
          "Please select Start time in intervals of 30 minutes (e.g., 10:00, 10:30)";
      }
    }

    if (timeRegex.test(data.end_time)) {
      const [endH, endM] = data.end_time.split(":").map(Number);
      const endTotal = endH * 60 + endM;

      if (endTotal % 30 != 0) {
        errors.end_time =
          "Please select end time in intervals of 30 minutes (e.g., 10:00, 10:30)";
      }
    }

    if (timeRegex.test(data.start_time) && timeRegex.test(data.end_time)) {
      const [startH, startM] = data.start_time.split(":").map(Number);
      const [endH, endM] = data.end_time.split(":").map(Number);

      const startTotal = startH * 60 + startM;
      const endTotal = endH * 60 + endM;

      if (endTotal <= startTotal) {
        errors.end_time = "End time must be after start time.";
      }
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
        } else if (res?.data?.code == "token_not_valid") {
          toast.error(res?.data?.detail, {
            theme: "colored",
          });
          localStorage.removeItem("user_access_valid_token");
          localStorage.removeItem("logged_user_data");
          navigate("/login");
        } else {
          setFormData(null);
          setCourtData([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setFormData(null);
        setCourtData([]);
      });
  };

  const handleBackNavigate = () => {
    navigate(-1);
  };
  const handleEditLocation = (id) => {
    navigate(`/update-locations/${id}`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateCourtData(addCourt);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    const body = {
      location_id: id,
      court_number: addCourt?.court_number,
      court_fee_hrs: addCourt?.court_fee_hrs,
      tax: `${addCourt?.tax}%`,
      cc_fees: `${addCourt?.cc_fees}%`,
      start_time: addCourt?.start_time,
      end_time: addCourt?.end_time,
      availability: true,
    };
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
          }else{
            toast.error(res?.data?.message, {
              theme: "colored",
            });
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
          }else{
            toast.error(res?.data?.message, {
              theme: "colored",
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

  const handleAvailabilityToggle = (courtId, newAvailability) => {
    const updatedCourt = { availability: newAvailability };

    setLoading(true);

    updateCourt(courtId, updatedCourt)
      .then((res) => {
        setLoading(false);
        if (res?.status === 200 || res?.status === 201) {
          toast.success("Availability updated successfully!", {
            theme: "colored",
          });
          getLocationDatabyId();
        }
      })
      .catch((error) => {
        console.error("Failed to update availability", error);
        setLoading(false);
        toast.error("Failed to update availability", { theme: "colored" });
      });
  };

  const handleEditCourtModal = (id, data) => {
    setVisible(true);
    setCourtId(id);
    setAddCourt(data);
  };

  const handleDeletCourtModal = (id) => {
    setDeletCourt(true);
    setDeletCourtId(id);
    console.log("idddddd", id);
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

  const handleCloseCourt = () => {
    setVisible(false);
    setErrors({});
    setAddCourt({
      location_id: id,
      court_number: "",
      court_fee_hrs: "",
      tax: "",
      cc_fees: "",
      availability: true,
      start_time: "",
      end_time: "",
    });
  };

  const convertToAmPm = (time24) => {
    if (!time24) return "";

    const [hours, minutes] = time24.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;

    return `${hours12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
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
                handleEditLocation(formData?.id);
              }}
              className="add_new_butn"
            >
              <CIcon icon={cilPenNib}></CIcon> Edit Location
            </CButton>
          </CCol>
        </CRow>

        <div className="mt-4 location_Details_section">
          <CRow className="align-items-center">
            <CCol sm={12} md={3}>
              <div className="badminton_bg">
                <img
                  src={formData?.logo ? formData?.logo : badminton}
                  alt="logo"
                />
              </div>
            </CCol>
            <CCol sm={12} md={9}>
              <CRow>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Email</h6>
                  <p
                    className="details_description"
                    style={{ textTransform: "lowercase" }}
                  >
                    {formData?.email}
                  </p>
                  <h6 className="detail_title mt-1">Phone</h6>
                  <p className="details_description">{formData?.phone}</p>
                  <h6 className="detail_title mt-1">Website</h6>
                  <p
                    className="details_description"
                    style={{ textTransform: "lowercase" }}
                  >
                    {formData?.website}
                  </p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Description</h6>
                  <p
                    className="details_description"
                    style={{ textTransform: "lowercase" }}
                  >
                    {formData?.description}
                  </p>
                </CCol>

                {/* <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Name</h6>
                  <p className="details_description">{formData?.name}</p>
                </CCol> */}
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Address</h6>
                  <p className="details_description">{`${formData?.address_1} 
                  ${formData?.address_2 ? `${formData?.address_2}` : ""}
                   ${formData?.address_3 ? `${formData?.address_3}` : ""} 
                   ${formData?.address_4 ? `${formData?.address_4}` : ""}
                 
                   `}</p>
                   {/*   ${formData?.city} ${formData?.state} ${formData?.country} */}
                  {/* <p className="details_description">{formData?.city}</p> */}
                  <h6 className="detail_title">State</h6>
                  <p className="details_description">{formData?.state}</p>
                  <h6 className="detail_title">Country</h6>
                  <p className="details_description">{formData?.country}</p>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </div>

        {/* <div className="address_Section mt-4">
          <h5>Address</h5>
          <CRow>
            <CCol sm={12} md={6}>
              <label className="add_court_label">Address 1</label>
              <p className="address_text">{formData?.address_1}</p>
            </CCol>
            <CCol sm={12} md={6}>
              <label className="add_court_label">Address 2</label>
              <p className="address_text">{formData?.address_2}</p>
            </CCol>
            <CCol sm={12} md={6}>
              <label className="add_court_label">Address 3</label>
              <p className="address_text">{formData?.address_3}</p>
            </CCol>
            <CCol sm={12} md={6}>
              <label className="add_court_label">Address 4</label>
              <p className="address_text">{formData?.address_4}</p>
            </CCol>
          </CRow>
        </div> */}

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
                + Add Court
              </CButton>
            </CCol>
          </CRow>

          {courtData?.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <CTable className="mt-4 main_table" striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">
                      Court Number
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Location ID</CTableHeaderCell> */}
                    <CTableHeaderCell scope="col">
                      Court Fee by Hour
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Taxes percentage
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">cc fees%</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Start Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">End Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Availability
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentItems?.map((item, i) => {
                    return (
                      <CTableRow key={i}>
                        <CTableDataCell>{item?.court_number}</CTableDataCell>
                        {/* <CTableDataCell>{item?.location_id}</CTableDataCell> */}
                        <CTableDataCell>{`$${item?.court_fee_hrs}/hr`}</CTableDataCell>
                        <CTableDataCell>{`${item?.tax}%`}</CTableDataCell>
                        <CTableDataCell>{`${item?.cc_fees}%`}</CTableDataCell>
                        <CTableDataCell>
                          {item?.start_time
                            ? convertToAmPm(item?.start_time)
                            : ""}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item?.end_time ? convertToAmPm(item?.end_time) : ""}
                        </CTableDataCell>
                        <CTableDataCell>
                          {/* {`${item?.availability}`} */}
                          <CFormSwitch
                            key={item?.court_id}
                            checked={item?.availability}
                            onChange={(e) =>
                              handleAvailabilityToggle(
                                item?.court_id,
                                e.target.checked
                              )
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </CTableDataCell>
                        <CTableDataCell>
                          <CIcon
                            className="edit_icon me-2"
                            onClick={() =>
                              handleEditCourtModal(item?.court_id, item)
                            }
                            icon={cilPencil}
                          ></CIcon>
                          <CIcon
                            className="delete_icon"
                            onClick={() =>
                              handleDeletCourtModal(item?.court_id, item)
                            }
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
        onClose={() => handleCloseCourt()}
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                  <label className="add_court_label">Start Time</label>

                  <CFormInput
                    type="time"
                    className="register_input"
                    aria-label="default input example"
                    autoComplete="off"
                    value={addCourt?.start_time}
                    name="start_time"
                    onChange={(e) => handleCourtInput(e)}
                  />
                  {errors.start_time && (
                    <div className="text-danger">{errors.start_time}</div>
                  )}
                </CCol>
                <CCol sm={12} md={6} lg={6} className="my-1">
                  <label className="add_court_label">End Time</label>

                  <CFormInput
                    type="time"
                    className="register_input"
                    autoComplete="off"
                    aria-label="default input example"
                    value={addCourt?.end_time}
                    name="end_time"
                    onChange={(e) => handleCourtInput(e)}
                  />
                  {errors?.end_time && (
                    <div className="text-danger">{errors?.end_time}</div>
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
                    style={{ cursor: "pointer" }}
                  />
                </CCol>
                <CCol sm={12} md={6} lg={6}></CCol>
              </CRow>
              <div className="d-flex gap-2 mt-4 justify-content-end">
                <CButton color="secondary" onClick={() => handleCloseCourt()}>
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
            <img src={deleteImage} alt="deleteImage" width={100} />
            <h1 className="card-title my-4">
              Are you really want <br /> to delete?
            </h1>
            <div className="d-flex gap-2 mt-4 justify-content-center">
              <CButton
                type="button"
                onClick={() => handleDeleteCourt()}
                className="delet_yes"
              >
                Yes
              </CButton>
              <CButton
                type="button"
                className="delet_cancel"
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
