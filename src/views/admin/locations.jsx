import React, { useEffect, useRef, useState } from "react";
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
  CFormSelect,
} from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import CIcon, { CIconSvg } from "@coreui/icons-react";
import {
  cilCalendar,
  cilCloudUpload,
  cilDelete,
  cilFilter,
  cilPencil,
  cilReload,
  cilSearch,
  cilX,
} from "@coreui/icons";
import { deleteLocationbyId, getLocation } from "../../utils/api";
import deleteImage from "../../assets/images/delete_image.png";
import { toast } from "react-toastify";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import moment from "moment";
import parsePhoneNumberFromString from "libphonenumber-js";

const Locations = () => {
  let SerialId = 1;
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const filterButtonRef = useRef(null);
  const [locationData, setLocationData] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [selectLocation, setSelectLocation] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState(formatDate(new Date())); // Start date for API
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [openMenuId, setOpenMenuId] = useState(null);
  const itemsPerPage = 10;
  const [totalCounts, setTotalCounts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const toggleMenu = (id) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id)); // Toggle
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
    setCurrentPage(1); // Reset to the first page when a new search is made
  };

  useEffect(() => {
    getLocationData(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const getLocationData = (
    page = 1,
    query = "",
    startDate = "",
    endDate = "",
    loader
  ) => {
    setLoading(query ? false : true);
    getLocation(page, query, startDate, endDate)
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          setLocationData(res?.data?.results);
          setLocationFilter(res?.data?.results);
          setTotalCounts(res?.data?.count); // Total count of admin data
          setTotalPages(Math.ceil(res?.data?.count / itemsPerPage));
        } else {
          setLocationData([]);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setLocationData([]);
      });
  };

  const handleFilterClick = () => {
    getLocationData(currentPage, searchQuery, startDate, endDate, "loader");
  };

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection); // Update selection range with the new dates
    setIsCalendarOpen(false); // Close the calendar after selecting the date range
    const formattedStartDate = formatDate(ranges.selection.startDate);
    const formattedEndDate = formatDate(ranges.selection.endDate);

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
  };

  const handleCalendarClick = () => {
    setIsCalendarOpen(!isCalendarOpen); // Toggle calendar visibility
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
    setLoading(true);
    deleteLocationbyId(locationId)
      .then((res) => {
        setLoading(false);
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
        setLoading(false);
      });
  };

  function formatPhoneNumber(number) {
    if (!number) return "";

    const input = number.startsWith("+") ? number : `+${number}`;

    const phoneNumber = parsePhoneNumberFromString(input);

    if (phoneNumber) {
      return phoneNumber.formatInternational(); // like "+1 893 268 7354"
    }

    return number;
  }

  const getVisiblePageNumbers = () => {
    const maxVisible = 4;
    const pages = [];

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      {loading && (
        <div className="loader_outer">
          <span className="loader"></span>
        </div>
      )}
      {/* <WidgetsDropdown className="mb-4" /> */}
      {/* <CCard className="mb-4"> */}
      <CCardBody className="p-2 position-relative">
        <CRow>
          <CCol sm={12} md={6}>
            <h4 id="traffic" className="card-title mb-0">
              Locations
            </h4>
            <div className="card_description">
              List of locations configured for court bookings.
            </div>
          </CCol>
          <CCol sm={12} md={6} className="text-end">
            <Link to="/add-locations">
              <CButton className="add_new_butn">+ Add New</CButton>
            </Link>
          </CCol>
          <CCol sm={12} md={6} className="my-3 d-flex align-items-center gap-1">
            <CInputGroup
              className="search_input_group"
              style={{ height: "45px" }}
            >
              <CInputGroupText className="input_icons">
                <CIcon icon={cilSearch}></CIcon>
              </CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Search..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                className="seacrh_input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </CInputGroup>
            <CButton
              type="button"
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
                setLocationData(locationFilter);
                setSelectLocation("");
              }}
              className="add_new_butn"
              style={{ height: "50px !important" }}
            >
              <CIcon icon={cilReload} />
            </CButton>
          </CCol>

          {/* <CCol sm={6} className="mt-3">
            <div className="text-end date_filter_section">
              <div
                onClick={handleCalendarClick}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  display: "inline-block",
                  cursor: "pointer",
                  borderRadius: "12px",
                  height: "50px",
                }}
              >
                <span>
                  <CIcon icon={cilCalendar}></CIcon>{" "}
                  {`${
                    selectionRange.startDate
                      ? moment(selectionRange.startDate).format("ll")
                      : "Start Date"
                  } - ${selectionRange.endDate ? moment(selectionRange.endDate).format("ll") : "End Date"}`}
                </span>
              </div>
              {isCalendarOpen && (
                <div
                  ref={calendarRef}
                  style={{ position: "absolute", zIndex: 10, top: "130px" }}
                >
                  <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect} 
                  />
                </div>
              )}

              <CButton
                ref={filterButtonRef}
                className="filter_butn"
                onClick={handleFilterClick}
              >
                <CIcon icon={cilFilter}></CIcon> FILTERS
              </CButton>
            </div>
          </CCol> */}
        </CRow>

        {locationData?.length > 0 ? (
          <div style={{ overflowX: "auto" }} className="table_flow">
            <CTable className="mt-4 main_table" striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Sr no.</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Logo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">City</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                  <CTableHeaderCell scope="col">No. of Courts</CTableHeaderCell>
                  <CTableHeaderCell scope="col">View Courts</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {locationData
                  ?.sort((a, b) => b?.id - a?.id)
                  ?.map((item, i) => {
                    return (
                      <CTableRow key={i}>
                        <CTableDataCell>
                          {(currentPage - 1) * itemsPerPage + i + 1}
                          {/* <div
                            onClick={() => {
                              handleViewDetails(item.id);
                              setOpenMenuId(null);
                            }}
                            className="action_icons"
                          >
                            <i
                              className="bi bi-eye-fill view_icon"
                              style={{ color: "#0860fb" }}
                            />
                          </div> */}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item?.logo && (
                            <img
                              src={item?.logo}
                              height={50}
                              width={50}
                              style={{ borderRadius: "5px" }}
                            />
                          )}
                        </CTableDataCell>
                        <CTableDataCell>{item?.email}</CTableDataCell>
                        <CTableDataCell style={{whiteSpace:"nowrap"}}>
                          {item?.phone ? formatPhoneNumber(item?.phone) : ""}
                        </CTableDataCell>
                        <CTableDataCell style={{whiteSpace:"nowrap"}}>{item?.city}</CTableDataCell>
                        <CTableDataCell style={{whiteSpace:"nowrap"}}>{item?.country}</CTableDataCell>
                        <CTableDataCell>{item?.courts?.length}</CTableDataCell>
                        <CTableDataCell>
                          <i
                            onClick={() => {
                              handleViewDetails(item.id);
                              setOpenMenuId(null);
                            }}
                            className="bi bi-eye-fill view_icon"
                            style={{ color: "#0860fb" }}
                          />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div
                            style={{
                              position: "relative",
                              marginBottom: "16px",
                            }}
                          >
                            <span
                              style={{ fontSize: "24px", cursor: "pointer" }}
                              onClick={() => toggleMenu(item.id)}
                            >
                              ⋮
                            </span>

                            {openMenuId === item.id && (
                              <div className="outer_action_icons">
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
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-trash-fill delete_icon"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                  </svg>
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
          </div>
        ) : (
          !loading && (
            <div className="my-5 d-flex justify-content-center">
              <h1 className="card-title">Data Not Found</h1>
            </div>
          )
        )}

        {locationData?.length > 0 && (
          <div className="pagination_outer mt-5 pt-4">
            <div className="pagination_section">
              <CRow className="align-items-center">
                <CCol md={6}>
                  <p className="showing_page">
                    {`Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, totalCounts)} of ${totalCounts} entries`}
                  </p>
                </CCol>
                <CCol md={6}>
                  <CPagination align="end" aria-label="Page navigation example">
                    <CPaginationItem
                      disabled={currentPage === 1}
                      className="prev_next"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      {"<<"}
                    </CPaginationItem>

                    {getVisiblePageNumbers().map((page) => (
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
      </CCardBody>

      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
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
                onClick={() => handleDeleteLocation()}
                className="delet_yes"
              >
                Yes
              </CButton>
              <CButton
                type="button"
                className="delet_cancel"
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
