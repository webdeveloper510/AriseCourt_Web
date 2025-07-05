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
import { DateRangePicker } from "react-date-range";
import CIcon, { CIconSvg } from "@coreui/icons-react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  cilCloudUpload,
  cilDelete,
  cilFilter,
  cilPencil,
  cilReload,
  cilSearch,
} from "@coreui/icons";
import UserIcon from "../../assets/images/report_user_icon.png";
import BookingIcon from "../../assets/images/report_booking_icon.png";
import CourtsIcon from "../../assets/images/report_court_icon.png";
import ProfitIcon from "../../assets/images/report_profit_icon.png";
import {
  getLocation,
  getPerLocation,
  getReportBooking,
  getReportData,
} from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Users = () => {
  let SerialId = 1;
  const navigate = useNavigate();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const calendarRef = useRef(null);
  const filterButtonRef = useRef(null);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [loading, setLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const itemsPerPage = 10;
  const [totalCounts, setTotalCounts] = useState(0);
  const [startDate, setStartDate] = useState(formatDate(new Date())); // Start date for API
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [reportData, setReportData] = useState({});
  const [reportTable, setReportTable] = useState([]);
  const [bookingType, setBookingType] = useState("");

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const userData = JSON.parse(localStorage.getItem("logged_user_data"));

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("logged_user_data"));
    if (userData?.user_type == 0) {
    } else if (userData?.user_type == 1) {
    }
  }, []);

  useEffect(() => {
    getLocationData(bookingType, currentPage, searchQuery);
  }, [bookingType, currentPage, searchQuery]);

  const getLocationData = (
    bookingType = "",
    page = 1,
    query = "",
    startDate = "",
    endDate = "",
    loader
  ) => {
    setLoading(query ? false : true);
    if (userData?.user_type == 0) {
      getReportBooking(bookingType, page, query, startDate, endDate)
        .then((res) => {
          setLoading(false);
          if (res.status == 200) {
            setReportTable(res?.data?.results);
            setTotalCounts(res?.data?.count); // Total count of admin data
            setTotalPages(Math.ceil(res?.data?.count / itemsPerPage));
          } else {
            setReportTable([]);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setReportTable([]);
        });
    } else {
      getPerLocation(bookingType, page, query, startDate, endDate)
        .then((res) => {
          setLoading(false);
          if (res.status == 200) {
            setReportTable(res?.data?.results);
            setTotalCounts(res?.data?.count); // Total count of admin data
            setTotalPages(Math.ceil(res?.data?.count / itemsPerPage));
          } else {
            setReportTable([]);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setReportTable([]);
        });
    }
  };

  const handleFilterClick = () => {
    getLocationData(
      bookingType,
      currentPage,
      searchQuery,
      startDate,
      endDate,
      "loader"
    );
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
    setCurrentPage(1); // Reset to the first page when a new search is made
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

  const convertToAmPm = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hourNum = parseInt(hours, 10);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const adjustedHour = hourNum % 12 || 12; // Convert 0 to 12
    return `${adjustedHour}:${minutes} ${ampm}`;
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
              Users
            </h4>
          </CCol>
        </CRow>

        <CRow className="mt-5">
          <CCol sm={12} xl={12} className="my-1">
            <CRow>
              <CCol md={6} className="my-1 d-flex align-items-center gap-1 ">
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
                    setStartDate(new Date());
                    setEndDate(new Date());
                    setSelectionRange({
                      startDate: new Date(),
                      endDate: new Date(),
                      key: "selection",
                    });
                    getLocationData();
                  }}
                  className="add_new_butn"
                  style={{ height: "50px !important" }}
                >
                  <CIcon icon={cilReload} />
                </CButton>
              </CCol>

              <CCol md={6} className="my-1 text-end">
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
                        height: "50px",
                      }}
                    >
                      <span>{`${
                        selectionRange.startDate
                          ? moment(selectionRange.startDate).format("ll")
                          : "Start Date"
                      } - ${selectionRange.endDate ? moment(selectionRange.endDate).format("ll") : "End Date"}`}</span>
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
                    <CButton
                      className="filter_butn"
                      ref={filterButtonRef}
                      style={{ whiteSpace: "nowrap" }}
                      onClick={handleFilterClick}
                    >
                      <CIcon icon={cilFilter}></CIcon> FILTERS
                    </CButton>
                  </div>
                </div>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        {reportTable?.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <CTable className="mt-4 main_table" striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Sr no.</CTableHeaderCell>
                  <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {reportTable
                  ?.sort((a, b) => b?.id - a?.id)
                  ?.map((item, i) => {
                    return (
                      <CTableRow key={i}>
                        <CTableDataCell>{SerialId++}</CTableDataCell>

                        <CTableDataCell
                          style={{ whiteSpace: "nowrap" }}
                        >{`${item?.first_name}`}</CTableDataCell>
                        <CTableDataCell
                          style={{ whiteSpace: "nowrap" }}
                        >{`${item?.last_name}`}</CTableDataCell>
                        <CTableDataCell>{item?.email}</CTableDataCell>
                        <CTableDataCell>{item?.phone}</CTableDataCell>
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

        {reportTable?.length > 0 && (
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

export default Users;
