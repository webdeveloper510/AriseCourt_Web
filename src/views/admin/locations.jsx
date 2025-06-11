import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import CIcon, { CIconSvg } from "@coreui/icons-react";
import {
  cilCloudUpload,
  cilDelete,
  cilFilter,
  cilPencil,
  cilSearch,
} from "@coreui/icons";
import { deleteLocationbyId, getLocation } from "../../utils/api";
import deleteImage from "../../assets/images/delete_image.png";
import { toast } from "react-toastify";

const Locations = () => {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id)); // Toggle
  };

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    getLocationData();
  }, []);

  const getLocationData = () => {
    getLocation()
      .then((res) => {
        if (res.status == 200) {
          setLocationData(res?.data?.results);
        } else {
          setLocationData([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setLocationData([]);
      });
  };

  const handleSelect = (ranges) => {
    const selectedRange = ranges.selection;
    setSelectionRange(selectedRange);
    if (selectedRange.startDate && selectedRange.endDate) {
      setIsCalendarOpen(true);
    } else {
      setIsCalendarOpen(false);
    }
  };

  const handleCalendarClick = () => {
    if (selectionRange.startDate && selectionRange.endDate) {
      setIsCalendarOpen(!isCalendarOpen);
    }
  };

  const handleEditLocation = (id) => {
    navigate(`/update-locations/${id}`);
  };

  const handleViewDetails = (id) => {
    navigate(`/location-details/${id}`);
  };

  const handleDeleteModal = (id) => {
    setVisible(true);
    setLocationId(id);
  };

  const handleDeleteLocation = () => {
    deleteLocationbyId(locationId)
      .then((res) => {
        if (res.status == 200 || res?.status == 204) {
          toast.success(res?.data?.message, {
            theme: "colored",
          });
          getLocationData();
          setVisible(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* <WidgetsDropdown className="mb-4" /> */}
      {/* <CCard className="mb-4"> */}
      <CCardBody className="p-2 position-relative">
        <CRow>
          <CCol sm={12} md={6}>
            <h4 id="traffic" className="card-title mb-0">
              Locations
            </h4>
            <div className="card_description">
              List of Locations configured for Court Bookings.
            </div>
          </CCol>
          <CCol sm={12} md={6} className="text-end">
            <Link to="/add-locations">
              <CButton className="add_new_butn">+ Add New</CButton>
            </Link>
          </CCol>
          <CCol sm={12} md={6} className="mt-3">
            <CInputGroup
              className="search_input_group"
              style={{ height: "45px" }}
            >
              <CInputGroupText className="input_icons">
                <CIcon icon={cilSearch}></CIcon>
              </CInputGroupText>
              <CFormInput
                placeholder="Search..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                className="seacrh_input"
              />
            </CInputGroup>
          </CCol>

          <CCol sm={6} className="mt-3">
            <div className="text-end date_filter_section">
              {/* Calendar area */}
              <div>
                <div
                  onClick={handleCalendarClick}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    display: "inline-block",
                    cursor: "pointer",
                    borderRadius: "12px",
                  }}
                >
                  <span>{`${selectionRange.startDate ? selectionRange.startDate.toLocaleDateString() : "Start Date"} - ${selectionRange.endDate ? selectionRange.endDate.toLocaleDateString() : "End Date"}`}</span>
                </div>

                {/* Display DateRangePicker when calendar is open */}
                {isCalendarOpen && (
                  <div style={{ position: "absolute", zIndex: 10 }}>
                    <DateRangePicker
                      ranges={[selectionRange]}
                      onChange={handleSelect}
                    />
                  </div>
                )}
              </div>

              <div>
                <CButton className="filter_butn">
                  <CIcon icon={cilFilter}></CIcon> FILTERS
                </CButton>
              </div>
            </div>
          </CCol>
        </CRow>

        {locationData?.length > 0 ? (
          <CTable className="mt-4 main_table" striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Id Key</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">Logo & Name</CTableHeaderCell> */}
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col">City</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <CTableHeaderCell scope="col">No. of Courts</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {locationData?.map((item, i) => {
                return (
                  <CTableRow key={i}>
                    <CTableDataCell>{item?.id}</CTableDataCell>
                    {/* <CTableDataCell>Beach Badminton Club</CTableDataCell> */}
                    <CTableDataCell>{item?.email}</CTableDataCell>
                    <CTableDataCell>{item?.phone}</CTableDataCell>
                    <CTableDataCell>{item?.city}</CTableDataCell>
                    <CTableDataCell>{item?.country}</CTableDataCell>
                    <CTableDataCell>19</CTableDataCell>
                    <CTableDataCell>
                      <div
                        style={{ position: "relative", marginBottom: "16px" }}
                      >
                        {/* Three-dot icon */}
                        <span
                          style={{ fontSize: "24px", cursor: "pointer" }}
                          onClick={() => toggleMenu(item.id)}
                        >
                          ⋮
                        </span>

                        {/* Dropdown menu only for selected item */}
                        {openMenuId === item.id && (
                          <div
                            style={{
                              position: "absolute",
                              top: "30px",
                              right: 0,
                              backgroundColor: "#fff",
                              borderRadius: "10px",
                              padding: "12px",
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                              zIndex: 999999,
                            }}
                          >
                            <div
                              onClick={() => {
                                handleViewDetails(item.id);
                                setOpenMenuId(null);
                              }}
                              className="action_icons"
                              
                            >
                              <CIcon icon={cilSearch} className="view_icon" />{" "}
                              View
                            </div>
                            <div
                              onClick={() => {
                                handleEditLocation(item.id);
                                setOpenMenuId(null);
                              }}
                              className="action_icons"
                            >
                              <CIcon
                                icon={cilPencil}
                                className="edit_icon"
                              />{" "}
                              Edit
                            </div>
                            <div
                              onClick={() => {
                                handleDeleteModal(item.id);
                                setOpenMenuId(null);
                              }}
                              className="action_icons"
                            >
                              <CIcon icon={cilDelete} className="delete_icon" />{" "}
                              Delete
                            </div>
                          </div>
                        )}
                      </div>
                      {/* <CIcon
                        icon={cilSearch}
                        onClick={() => {
                          handleViewDetails();
                        }}
                        className="view_icon"
                      ></CIcon>
                      <CIcon
                        icon={cilPencil}
                        onClick={() => {
                          handleEditLocation(item?.id);
                        }}
                        className="mx-2 edit_icon"
                      ></CIcon>
                      <CIcon
                        onClick={() => {
                          handleDeleteModal(item?.id);
                        }}
                        icon={cilDelete}
                        className="delete_icon"
                      ></CIcon> */}
                    </CTableDataCell>
                  </CTableRow>
                );
              })}
            </CTableBody>
          </CTable>
        ) : (
          ""
        )}

        <div className="pagination_outer mt-5 pt-2">
          <div className="pagination_section">
            <CRow className="align-items-center">
              <CCol md={6}>
                <p className="showing_page">{`Showing 1 to 6 of 6 entries`}</p>
              </CCol>
              <CCol md={6}>
                <CPagination align="end" aria-label="Page navigation example">
                  <CPaginationItem
                    disabled
                    className="prev_next"
                  >{`<<`}</CPaginationItem>
                  <CPaginationItem>1</CPaginationItem>
                  <CPaginationItem>2</CPaginationItem>
                  <CPaginationItem>3</CPaginationItem>
                  <CPaginationItem className="prev_next">{`>>`}</CPaginationItem>
                </CPagination>
              </CCol>
            </CRow>
          </div>
        </div>
      </CCardBody>

      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
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
                onClick={() => handleDeleteLocation()}
                className="add_new_butn"
              >
                Yes
              </CButton>
              <CButton
                type="button"
                color="secondary"
                onClick={() => setVisible(false)}
              >
                No
              </CButton>
            </div>
          </div>
        </CModalBody>
      </CModal>
      {/* </CCard> */}
    </>
  );
};

export default Locations;
