import React, { useEffect, useRef, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
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
import CIcon from "@coreui/icons-react";
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import {
  cilCalendar,
  cilFilter,
  cilPencil,
  cilReload,
  cilSearch,
  cilX,
} from "@coreui/icons";
import {
  getAllBookedLocation,
  getCourtBooking,
  getCourtBookingByAdmin,
  getLocation,
  updateCourtBooking,
} from "../../utils/api";
import { toast } from "react-toastify";
import moment from "moment";
import deleteImage from "../../assets/images/delete_image.png";

const CourtConfiguration = () => {
  let SerialId = 1;
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const filterButtonRef = useRef(null);
  const [visible, setVisible] = useState(false);
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
  const [locationFilter, setLocationFilter] = useState([]);
  const [selectLocation, setSelectLocation] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const itemsPerPage = 10;
  const [totalCounts, setTotalCounts] = useState(0); // Total number of items
  const [totalPages, setTotalPages] = useState(0); // Total pages
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingType, setBookingType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentId, setPaymentId] = useState("");

  const userData = JSON.parse(localStorage.getItem("logged_user_data"));

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

  const getCourtBookingData = (
    bookingType = "",
    page = 1,
    query = "",
    startDate = "",
    endDate = "",
    loader
  ) => {
    setLoading(query ? false : true);
    if (userData?.user_type == 0) {
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
    } else {
      getCourtBookingByAdmin(bookingType, page, query, startDate, endDate)
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
    }
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
    getLocationData();
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

  const convertToHoursAndMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hourNum = parseInt(hours, 10);
    const minuteNum = parseInt(minutes, 10);

    let result = "";

    if (hourNum > 0) {
      result += `${hourNum}hr`;
    }

    if (minuteNum > 0) {
      result += ` ${minuteNum}min`;
    }

    return result.trim();
  };

  const handleViewDetails = (id) => {
    navigate(`/court-details/${id}`);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSelectLocation(value);
    const filteredData = locationFilter?.filter(
      (location) => location.city === value
    );
    setAdminData(filteredData);
  };

  const getLocationData = () => {
    getAllBookedLocation()
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          setLocationFilter(res?.data);
        } else {
          setLocationFilter([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setLocationFilter([]);
      });
  };
  const handlePaymentChange = (e, id) => {
    const status = e.target.value;
    setVisible(true);
    setPaymentStatus(status);
    setPaymentId(id);
  };

  const handleUpdateStatus = () => {
    setLoading(true);
    updateCourtBooking(paymentId, {
      status: "cancelled",
    })
      .then((res) => {
        setLoading(false);
        setVisible(false);
        if (res?.data?.status_code == 200) {
          toast.success(res?.data?.message, {
            theme: "colored",
          });
          getCourtBookingData(bookingType, currentPage, searchQuery);
        } else {
          toast.error(res?.data?.message, {
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
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
            <div className="card_description">Court bookings</div>
          </CCol>
          {/* <CCol sm={12} md={6} className="text-end">
            <Link to="/add-locations">
              <CButton className="add_new_butn">+ Add New</CButton>
            </Link>
          </CCol> */}
        </CRow>

        <CRow className="mt-2">
          <CCol sm={12} md={12}>
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

          <CCol sm={12} md={12} className="mt-2">
            <CRow>
              <CCol md={4} className="d-flex align-items-center gap-1">
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
                <CButton
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setStartDate(new Date());
                    setEndDate(new Date());
                    setSelectionRange({
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    });
                    getCourtBookingData();
                  }}
                  className="add_new_butn"
                  style={{ height: "50px !important" }}
                >
                  <CIcon icon={cilReload} />
                </CButton>
              </CCol>

              <CCol md={4}>
                <CFormSelect
                  className="form-control select_location_field"
                  placeholder="Select Location"
                  defaultValue=""
                  onChange={(e) => handleLocationChange(e)}
                  value={selectLocation}
                >
                  <option disabled value="">
                    Select Location
                  </option>
                  {locationFilter?.map((address, index) => (
                    <option
                      key={index}
                      value={address?.id}
                      style={{ textTransform: "capitalize" }}
                    >
                      {address?.address_1} {address?.address_2}{" "}
                      {address?.address_3} {address?.address_4}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol md={4}>
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
                      height: "50px",
                      background: "white",
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
                  <CTableHeaderCell scope="col">Sr no.</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Location</CTableHeaderCell> */}
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Date & Time
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Court No.
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Booked By
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Type</CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Address
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Location Name
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Payment Status
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {adminData
                  ?.sort((a, b) => b?.id - a?.id)
                  ?.map((item, i) => {
                    return (
                      <CTableRow key={i}>
                        <CTableDataCell>
                          {SerialId++}
                          <div
                            onClick={() => {
                              handleViewDetails(item.booking_id);
                              setOpenMenuId(null);
                            }}
                            className="action_icons"
                          >
                            <i
                              className="bi bi-eye-fill view_icon"
                              style={{ color: "#0860fb" }}
                            />
                          </div>
                        </CTableDataCell>
                        {/* <CTableDataCell>{item?.user?.first_name}</CTableDataCell> */}
                        <CTableDataCell>
                          <div>
                            <p className="mb-0 user_phone">
                              {item?.start_time
                                ? `${convertToAmPm(item?.start_time)} - ${convertToAmPm(item?.end_time)}`
                                : ""}
                            </p>
                            <p className="mb-0 user_phone">
                              {item?.duration_time
                                ? convertToHoursAndMinutes(item?.duration_time)
                                : ""}
                            </p>
                            <p className="mb-0">{item?.booking_date}</p>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          {item?.court?.court_number}
                        </CTableDataCell>
                        <CTableDataCell>
                          {`${item?.user?.first_name} ${item?.user?.last_name}`}
                          <div>
                            <p className="mb-0 user_phone">
                              {item?.user?.phone}
                            </p>
                            <p className="mb-0">{item?.user?.email}</p>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell>
                          {item?.user?.user_type == 1
                            ? "Admin"
                            : item?.user?.user_type == 3
                              ? "Player"
                              : item?.user?.user_type == 2
                                ? "Coach"
                                : item?.user?.user_type == 4
                                  ? "Court"
                                  : ""}
                        </CTableDataCell>
                        {/* <CTableDataCell>
                          <div>
                            <p className="mb-0 user_phone">
                              {item?.user?.phone}
                            </p>
                            <p className="mb-0">{item?.user?.email}</p>
                          </div>
                        </CTableDataCell> */}
                        <CTableDataCell>
                          {item.court.location.address_1}{" "}
                          {item.court.location.address_2}{" "}
                          {item.court.location.address_3}{" "}
                          {item.court.location.address_4}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.court.location.name}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item?.summary ? `$${item?.summary}` : ""}
                        </CTableDataCell>

                        <CTableDataCell>
                          {
                            <span
                              style={{
                                textTransform: "capitalize",
                                fontWeight: "600",
                                color:
                                  item?.status == "cancelled"
                                    ? "#FA3B3B"
                                    : item?.status == "completed"
                                      ? "#05D005"
                                      : item?.status == "confirmed"
                                        ? "#0860fb"
                                        : item?.status == "pending"
                                          ? "#f99e15"
                                          : "#182B4D",
                              }}
                            >
                              {/* {item?.status} */}

                              {item.status === "pending" ||
                              item.status === "confirmed" ||
                              item.status === "completed" ? (
                                <CDropdown className="">
                                  <CDropdownToggle color="secondary">
                                    {item?.status}
                                  </CDropdownToggle>
                                  <CDropdownMenu>
                                    <CDropdownItem
                                      onClick={() =>
                                        handlePaymentChange(
                                          { target: { value: item?.status } },
                                          item?.booking_id
                                        )
                                      }
                                    >
                                      {item?.status}
                                    </CDropdownItem>
                                    <CDropdownItem
                                      onClick={() =>
                                        handlePaymentChange(
                                          { target: { value: "Cancel" } },
                                          item?.booking_id
                                        )
                                      }
                                    >
                                      Cancel
                                    </CDropdownItem>
                                  </CDropdownMenu>
                                </CDropdown>
                              ) : (
                                <>{item?.status}</>
                              )}
                            </span>
                          }
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
                              onClick={() => toggleMenu(item.booking_id)}
                            >
                              ⋮
                            </span>
                            {openMenuId === item.booking_id && (
                              <div
                                className="outer_action_icons"
                                style={{ right: "68px" }}
                              >
                                <div
                                  onClick={() => {
                                    handleViewDetails(item.booking_id);
                                    setOpenMenuId(null);
                                  }}
                                  className="action_icons"
                                >
                                  <i className="bi bi-eye-fill view_icon" />{" "}
                                  View
                                </div>
                              </div>
                            )}
                          </div>
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

      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalBody className="modal_body_court">
          <div className="add_court_modal text-center">
            <img src={deleteImage} alt="deleteImage" width={100} />
            <h1 className="card-title mt-4">
              Are you sure
              <br />
            </h1>
            <h4 className="card-title-cancel">
              you want to cancel this booking?
            </h4>
            <div className="d-flex gap-2 mt-4 justify-content-center">
              <CButton
                type="button"
                onClick={() => handleUpdateStatus()}
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

export default CourtConfiguration;
