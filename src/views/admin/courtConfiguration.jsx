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
} from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import CIcon, { CIconSvg } from "@coreui/icons-react";
import {
  cilCalendar,
  cilCloudUpload,
  cilDelete,
  cilFilter,
  cilPencil,
  cilSearch,
} from "@coreui/icons";
import { getCourtBooking } from "../../utils/api";
import { toast } from "react-toastify";
import moment from "moment";

const CourtConfiguration = () => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const filterButtonRef = useRef(null);
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
  const [visible, setVisible] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const itemsPerPage = 10;
  const [totalCounts, setTotalCounts] = useState(0); // Total number of items
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingType, setBookingType] = useState("");

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Update current page
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const toggleMenu = (id) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id)); // Toggle
  };

  // const getCourtBookingData = () => {
  //   getCourtBooking()
  //     .then((res) => {
  //       console.log("getCourtBookingData", res)
  //       if (res?.status == 200) {
  //         setAdminData(res?.data?.results);
  //         setTotalCounts(res?.data?.count);
  //         setTotalPages(Math.ceil(res?.data?.count / itemsPerPage));
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const getCourtBookingData = (
    bookingType = "",
    page = 1,
    query = "",
    startDate = "",
    endDate = "",
    loader
  ) => {
    setLoading(query ? false : true);
    getCourtBooking(bookingType, page, query, startDate, endDate)
      .then((res) => {
        setLoading(false);
        if (res?.status === 200) {
          setAdminData(res?.data?.results);
          setTotalCounts(res?.data?.count);
          setTotalPages(Math.ceil(res?.data?.count / itemsPerPage));
        } else if (res?.data?.code == "token_not_valid") {
          toast.error(res?.data?.detail, {
            theme: "colored",
          });
          localStorage.removeItem("user_access_valid_token");
          localStorage.removeItem("logged_user_data");
          navigate("/login");
        } else {
          setAdminData([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setAdminData([]);
        setLoading(false);
      });
  };

  const handleFilterClick = () => {
    getCourtBookingData(
      bookingType,
      currentPage,
      searchQuery,
      startDate,
      endDate,
      "loader"
    );
  };

  useEffect(() => {
    getCourtBookingData(bookingType, currentPage, searchQuery);
  }, [bookingType, currentPage, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
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

  const handleEditAdmin = (id) => {
    // navigate(`/update-registraion/${id}`);
  };

  const handleDeleteModal = (id) => {
    setVisible(true);
    setAdminId(id);
  };

  const handleDeleteAdmin = () => {
    setLoading(true);
    deleteAdminbyId(adminId)
      .then((res) => {
        setLoading(false);
        if (res.status == 200 || res?.status == 204) {
          toast.success(res?.data?.message, {
            theme: "colored",
          });
          getCourtBookingData();
          setVisible(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleClickOutside = (event) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target) &&
      filterButtonRef.current &&
      !filterButtonRef.current.contains(event.target)
    ) {
      setIsCalendarOpen(false); // Close calendar if clicked outside
    }
  };

  // Add event listener for detecting outside clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const convertToAmPm = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hourNum = parseInt(hours, 10);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const adjustedHour = hourNum % 12 || 12; // Convert 0 to 12
    return `${adjustedHour}:${minutes} ${ampm}`;
  };

  const convertToHoursOnly = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    const hourNum = parseInt(hours, 10);
    return `${hourNum} Hour${hourNum !== 1 ? "s" : ""}`;
  };

  return (
    <>
      {/* <WidgetsDropdown className="mb-4" /> */}
      {/* <CCard className="mb-4"> */}
      {loading && (
        <div className="loader_outer">
          <span className="loader"></span>
        </div>
      )}
      <CCardBody className="p-2 position-relative">
        <CRow>
          <CCol sm={12} md={6}>
            <h4 id="traffic" className="card-title mb-0">
              Court Bookings
            </h4>
            <div className="card_description">Court Bookings</div>
          </CCol>
          {/* <CCol sm={12} md={6} className="text-end">
            <Link to="/add-locations">
              <CButton className="add_new_butn">+ Add New</CButton>
            </Link>
          </CCol> */}
        </CRow>

        <CRow className="mt-2">
          <CCol sm={12} md={5}>
            <CButton
              onClick={() => setBookingType("")}
              style={{
                color: bookingType === "past" ? "" : "#0860FB",
                fontWeight: bookingType === "500" ? "" : "600",
              }}
              className="upcoming_booking"
            >
              Upcoming Bookings
            </CButton>

            <CButton
              onClick={() => setBookingType("past")}
              style={{
                color: bookingType === "past" ? "#0860FB" : "",
                fontWeight: bookingType === "600" ? "" : "500",
              }}
              className="upcoming_booking mx-1"
            >
              Past Bookings
            </CButton>
          </CCol>

          <CCol sm={12} md={7}>
            <CRow>
              <CCol md={5}>
                <CInputGroup
                  className="search_input_group_reports"
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
              </CCol>

              <CCol md={7}>
                <div className="text-end date_filter_section">
                  <div
                    onClick={handleCalendarClick}
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      display: "inline-block",
                      cursor: "pointer",
                      borderRadius: "12px",
                      whiteSpace: "nowrap",
                      height: "50px"
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

                  {/* Display DateRangePicker when calendar is open */}
                  {isCalendarOpen && (
                    <div
                      ref={calendarRef}
                      style={{ position: "absolute", zIndex: 10, top: "130px" }}
                    >
                      <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={handleSelect} // Update the selection when a date is selected
                      />
                    </div>
                  )}

                  {/* Filter Button */}
                  <CButton
                    ref={filterButtonRef}
                    className="filter_butn"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={handleFilterClick}
                  >
                    <CIcon icon={cilFilter}></CIcon> FILTERS
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        {adminData?.length > 0 ? (
          <div style={{ overflowX: "auto" }} className="table_flow">
            <CTable className="mt-4 main_table" striped>
              <CTableHead>
                <CTableRow>
                  {/* <CTableHeaderCell scope="col">Location Id</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col">Admin Id</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Location</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col">Date & Time</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Court No.</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Booked By</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Contact Details
                  </CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Action</CTableHeaderCell> */}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {adminData?.map((item, i) => {
                  return (
                    <CTableRow key={i}>
                      <CTableDataCell>{item?.id}</CTableDataCell>
                      {/* <CTableDataCell>{item?.user?.first_name}</CTableDataCell> */}
                      <CTableDataCell>
                        <div>
                          <p className="mb-0 user_phone">
                            {item?.start_time
                              ? `${convertToAmPm(item?.start_time)} - ${convertToHoursOnly(item?.duration_time)}`
                              : ""}
                          </p>
                          <p className="mb-0">{item?.booking_date}</p>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>0</CTableDataCell>
                      <CTableDataCell>{`${item?.user?.first_name} ${item?.user?.last_name}`}</CTableDataCell>
                      <CTableDataCell>
                        {item?.user?.user_type == 1
                          ? "Admin"
                          : item?.user?.user_type == 3
                            ? "Player"
                            : ""}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          <p className="mb-0 user_phone">{item?.user?.phone}</p>
                          <p className="mb-0">{item?.user?.email}</p>
                        </div>
                      </CTableDataCell>
                      {/* <CTableDataCell>
                        <div
                          style={{ position: "relative", marginBottom: "16px" }}
                        >
                          <span
                            style={{ fontSize: "24px", cursor: "pointer" }}
                            onClick={() => toggleMenu(item.id)}
                          >
                            ⋮
                          </span>
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
                                  handleEditAdmin(item?.id);
                                }}
                                className="action_icons"
                              >
                                <CIcon icon={cilPencil} className="edit_icon" />{" "}
                                Edit
                              </div>
                              <div
                                onClick={() => {
                                  handleDeleteModal(item.id);
                                  setOpenMenuId(null);
                                }}
                                className="action_icons"
                              >
                                <CIcon
                                  icon={cilDelete}
                                  className="delete_icon"
                                />{" "}
                                Delete
                              </div>
                            </div>
                          )}
                        </div>
                       
                      </CTableDataCell> */}
                    </CTableRow>
                  );
                })}
                {/* <CTableRow>
                <CTableDataCell>#123</CTableDataCell>
                <CTableDataCell>#123</CTableDataCell>
                <CTableDataCell>8987464kkdfet</CTableDataCell>
                <CTableDataCell>Admin</CTableDataCell>
                <CTableDataCell>3</CTableDataCell>
                <CTableDataCell>dummy221@gmail.com</CTableDataCell>
                <CTableDataCell>01796-329869</CTableDataCell>
                <CTableDataCell>California</CTableDataCell>
                <CTableDataCell>
                  <CIcon
                    icon={cilPencil}
                    onClick={() => {
                      handleEditAdmin();
                    }}
                    className="mx-2 edit_icon"
                  ></CIcon>
                  <CIcon icon={cilDelete} className="delete_icon"></CIcon>
                </CTableDataCell>
              </CTableRow> */}
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

        {adminData?.length > 0 && (
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
      </CCardBody>
      {/* </CCard> */}
    </>
  );
};

export default CourtConfiguration;
