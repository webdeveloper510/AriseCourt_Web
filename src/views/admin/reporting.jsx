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
import { cilCalendar, cilReload, cilSearch } from "@coreui/icons";
import UserIcon from "../../assets/images/report_user_icon.png";
import BookingIcon from "../../assets/images/report_booking_icon.png";
import CourtsIcon from "../../assets/images/report_court_icon.png";
import ProfitIcon from "../../assets/images/report_profit_icon.png";
import {
  getAllLocations,
  GetCourtBookings,
  getLocation,
  getReportBooking,
  getReportData,
  userDataExcel,
} from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Select from "react-select";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Reporting = () => {
  let SerialId = 1;
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("logged_user_data"));
  const formatDate = (date) => {
    if (typeof date === "string") {
      const splitted_date = date.split("-");
      return `${splitted_date[0]}-${splitted_date[1]}-${splitted_date[2]}`;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 -> 12

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  };

  const calendarRef = useRef(null);
  const filterButtonRef = useRef(null);
  const [selectionRange, setSelectionRange] = useState({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
    key: "selection",
  });

  const [selectedRange, setSeletedRange] = useState({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
    key: "selection",
  });
  useEffect(() => {
    console.log(selectedRange);
  }, [selectedRange]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const itemsPerPage = 10;
  const [totalCounts, setTotalCounts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectStartDate, setSelectStartDate] = useState();
  const [selectEndDate, setSelectEndDate] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [reportData, setReportData] = useState({});
  const [reportTable, setReportTable] = useState([]);
  const [bookingType, setBookingType] = useState("");
  const [locationFilter, setLocationFilter] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const locationOptions = (locationFilter || []).map((address) => {
    const fullAddress = address?.name;
    // `${address?.address_1 || ""} ${address?.address_2 || ""} ${address?.address_3 || ""} ${address?.address_4 || ""}`.trim();
    return {
      label: fullAddress,
      value: fullAddress,
    };
  });

  // Ensure only one "All" option at the top
  const options = [{ label: "All", value: "" }, ...locationOptions];

  // Prevent duplicates
  const uniqueOptions = options.filter(
    (option, index, self) =>
      index === self.findIndex((o) => o.value === option.value)
  );

  // Add 'All' option at the beginning
  options.unshift({ label: "All", value: "" });

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      getLocationData(
        bookingType,
        page,
        searchQuery,
        selectedLocation,
        startDate,
        endDate,
        "loader"
      );
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getReportAllData = () => {
    getReportData()
      .then((res) => {
        if (res?.status == 200) {
          setReportData(res?.data);
        } else {
          setReportData({});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => {
  //       const now = formatDate(new Date());
  //       setSelectionRange({
  //         startDate: now,
  //         endDate: now,
  //         key: "selection",
  //       });
  //       setSeletedRange({
  //         startDate: now,
  //         endDate: now,
  //         key: "selection",
  //       });
  //     },
  //     1 * 60 * 1000
  //   ); // 1 minutes

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const today = formatDate(new Date());

      if (
        today !== selectionRange.startDate ||
        today !== selectionRange.endDate
      ) {
        setSelectionRange({
          startDate: today,
          endDate: today,
          key: "selection",
        });
        setSeletedRange({
          startDate: now,
          endDate: now,
          key: "selection",
        });
      }
    }, 60 * 1000); // check every 1 minute

    return () => clearInterval(interval);
  }, [selectionRange]);

  useEffect(() => {
    const { startDate, endDate } = selectionRange;
    getLocationData(
      bookingType,
      currentPage,
      searchQuery,
      selectedLocation,
      startDate,
      endDate
    );
    getReportAllData();
    getAllLocationData();
  }, [selectionRange]);

  useEffect(() => {
    getAllLocationData();
    getExcelData();
  }, []);

  const getAllLocationData = () => {
    getAllLocations()
      .then((res) => {
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

  const getLocationData = (
    bookingType = "",
    page = 1,
    query = "",
    selectedLocation = "",
    startDate = "",
    endDate = "",
    loader
  ) => {
    setLoading(query ? false : true);
    GetCourtBookings(
      bookingType,
      page,
      query,
      selectedLocation,
      startDate,
      endDate
    )
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
  };

  const handleFilterClick = () => {
    setCurrentPage(1);
    // setSelectionRange(selectedRange)
    setStartDate(selectStartDate);
    setEndDate(selectEndDate);
    getLocationData(
      bookingType,
      1,
      searchQuery,
      selectedLocation,
      selectStartDate,
      selectEndDate,
      "loader"
    );
  };

  const handleSelect = (ranges) => {
    setSeletedRange(ranges.selection); // Update selection range with the new dates
    setIsCalendarOpen(false); // Close the calendar after selecting the date range
    const formattedStartDate = formatDate(ranges.selection.startDate);
    const formattedEndDate = formatDate(ranges.selection.endDate);
    setSelectStartDate(formattedStartDate);
    setSelectEndDate(formattedEndDate);
  };

  const handleCalendarClick = () => {
    setIsCalendarOpen(!isCalendarOpen); // Toggle calendar visibility
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    setCurrentPage(1);
    getLocationData(
      bookingType,
      currentPage,
      value,
      selectedLocation,
      startDate,
      endDate
    );
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

  const formatNewDate = (dateStr) => {
    const date = new Date(dateStr);
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const [{ value: dd }, , { value: mm }, , { value: yyyy }] =
      formatter.formatToParts(date);
    return `${mm}-${dd}-${yyyy}`;
  };

  // const formatNewDate = (dateStr) => { const date = new Date(dateStr);
  //  console.log(date);
  //  const mm = String(date.getMonth() + 1).padStart(2, "0");
  //  const dd = String(date.getDate()).padStart(2, "0");
  //  const yyyy = date.getFullYear();
  //  return ${mm}-${dd}-${yyyy};
  //  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedLocation(value);
    setCurrentPage(1);
    getLocationData(
      bookingType,
      currentPage,
      searchQuery,
      value,
      startDate,
      endDate
    );
  };

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

  const getExcelData = () => {
    userDataExcel()
      .then((res) => {
        if (res?.status == 200) {
          setExcelData(res?.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const exportToExcel = () => {
    const dataToExport = reportTable?.map((item, index) => ({
      "S.No": index + 1,
      "Booking Date": formatNewDate(item.created_at),
      "Reservation Date": formatNewDate(item.booking_date),
      "Reservation From Time": convertToAmPm(item.start_time),
      Duration: convertToHoursAndMinutes(item.duration_time),
      "Court Number": item.court?.court_number,
      "Full Name": `${item.user?.first_name} ${item.user?.last_name}`,
      Email: item.user?.email,
      Phone: item.user?.phone,
      Country: item.user?.country,
      Amount: `$${item.court?.court_fee_hrs || 0}`,
      "Sales Tax": `$${item.court?.tax || 0}`,
      "CC Fees": `$${item.court?.cc_fees || 0}`,
      "Total Amount": `$${parseFloat(item.on_amount).toFixed(2)}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "Court_Booking_Report.xlsx");
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
              Reporting
            </h4>
            <div className="card_description">Standard reports</div>
          </CCol>
        </CRow>

        <div className="my-3">
          <CRow>
            <CCol md={3} className="my-1">
              <div className="report_cards">
                <div className="report_card_image">
                  <img src={UserIcon} alt="UserIcon" />
                </div>
                <div>
                  <h6 className="report_card_title">
                    {reportData?.total_users}
                  </h6>
                  <p className="report_card_Desc">Total users</p>
                </div>
              </div>
            </CCol>

            <CCol md={3} className="my-1">
              <div className="report_cards">
                <div className="report_card_image">
                  <img src={BookingIcon} alt="UserIcon" />
                </div>
                <div>
                  <h6 className="report_card_title">
                    {reportData?.total_bookings}
                  </h6>
                  <p className="report_card_Desc">Bookings</p>
                </div>
              </div>
            </CCol>

            <CCol md={3} className="my-1">
              <div className="report_cards">
                <div className="report_card_image">
                  <img src={CourtsIcon} alt="UserIcon" />
                </div>
                <div>
                  <h6 className="report_card_title">
                    {reportData?.total_courts}
                  </h6>
                  <p className="report_card_Desc">Total courts</p>
                </div>
              </div>
            </CCol>

            <CCol md={3} className="my-1">
              <div className="report_cards">
                <div className="report_card_image">
                  <img src={ProfitIcon} alt="UserIcon" />
                </div>
                <div>
                  <h6 className="report_card_title">
                    {reportData?.total_profit
                      ? `${reportData?.total_profit}`
                      : "0"}
                  </h6>
                  <p className="report_card_Desc">Total profit</p>
                </div>
              </div>
            </CCol>
          </CRow>
        </div>

        <CRow className="mt-5">
          <CCol xs={6} md={6} className="my-1">
            <h6 id="traffic" className="card-title mb-0">
              Reports
            </h6>
          </CCol>
          <CCol xs={6} md={6} className="my-1 text-end">
            <CButton className="add_new_butn" onClick={exportToExcel}>
              Download XLS
            </CButton>
          </CCol>

          <CCol sm={12} xl={12} className="my-1">
            <CRow>
              <CCol
                md={6}
                lg={6}
                xl={4}
                className="my-1 d-flex align-items-center gap-1 "
              >
                {userData?.user_type == 0 && (
                  <>
                    <div className="input_section mt-1">
                      <Select
                        className="select_location"
                        placeholder="Select Location"
                        name="location"
                        options={uniqueOptions}
                        value={uniqueOptions.find(
                          (opt) => opt.value === selectedLocation
                        )}
                        onChange={(selected) =>
                          handleInputChange({
                            target: {
                              name: "location",
                              value: selected?.value || "",
                            },
                          })
                        }
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: "40px",
                            border: "1px solid #ccc",
                            boxShadow: "none",
                            "&:hover": { borderColor: "#aaa" },
                          }),
                          option: (base) => ({
                            ...base,
                            textTransform: "capitalize",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }),
                          menu: (base) => ({
                            ...base,
                            zIndex: 9999,
                          }),
                          indicatorSeparator: () => ({ display: "none" }),
                        }}
                        menuPortalTarget={document.body}
                      />
                    </div>
                  </>
                )}
              </CCol>
              <CCol
                md={6}
                lg={6}
                xl={4}
                className="my-1 d-flex align-items-center gap-1 "
              >
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
                    const booking_type = "";
                    const page = 1;
                    const query = "";
                    const selected_location = "";
                    const start_date = formatDate(new Date());
                    const end_date = formatDate(new Date());
                    setSearchQuery("");
                    setCurrentPage(1);
                    setStartDate(new Date());
                    setEndDate(new Date());
                    setSelectionRange({
                      startDate: formatDate(new Date()),
                      endDate: formatDate(new Date()),
                      key: "selection",
                    });
                    setSeletedRange({
                      startDate: formatDate(new Date()),
                      endDate: formatDate(new Date()),
                      key: "selection",
                    });
                    setSelectedLocation("");
                    getLocationData(
                      booking_type,
                      page,
                      query,
                      selected_location,
                      start_date,
                      end_date
                    );
                  }}
                  className="add_new_butn"
                  style={{ height: "50px !important" }}
                >
                  <CIcon icon={cilReload} />
                </CButton>
              </CCol>

              <CCol md={6} lg={6} xl={4} className="my-1">
                <div className="text-end date_filter_section">
                  {/* Calendar area */}
                  <div className="date_section">
                    <div
                      className="selected_date"
                      onClick={handleCalendarClick}
                    >
                      <span>
                        {" "}
                        <CIcon icon={cilCalendar}></CIcon>{" "}
                        {`${
                          selectedRange.startDate
                            ? moment(selectedRange.startDate).format("ll")
                            : "Start Date"
                        } - ${selectedRange.endDate ? moment(selectedRange.endDate).format("ll") : "End Date"}`}
                      </span>
                    </div>

                    {/* Display DateRangePicker when calendar is open */}
                    {isCalendarOpen && (
                      <div style={{ position: "absolute", zIndex: 999999 }}>
                        <DateRangePicker
                          ranges={[selectedRange]}
                          onChange={handleSelect}
                          startDatePlaceholder="Start Date"
                          endDatePlaceholder="End Date"
                        />
                      </div>
                    )}
                  </div>

                  <div className="search_butn">
                    <CButton
                      className="filter_butn"
                      ref={filterButtonRef}
                      style={{ whiteSpace: "nowrap" }}
                      onClick={handleFilterClick}
                    >
                      Search
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
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Request Date
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Reservation Date
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Reservation From Time
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Duration
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Court Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Amount
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Sales Tax</CTableHeaderCell>
                  <CTableHeaderCell scope="col">CC Fees</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {reportTable
                  ?.sort((a, b) => b?.id - a?.id)
                  ?.map((item, i) => {
                    return (
                      <CTableRow key={i}>
                        <CTableDataCell>
                          {(currentPage - 1) * itemsPerPage + i + 1}
                        </CTableDataCell>
                        <CTableDataCell style={{ whiteSpace: "nowrap" }}>
                          {item?.created_at
                            ? formatNewDate(item?.created_at)
                            : ""}
                        </CTableDataCell>
                        <CTableDataCell style={{ whiteSpace: "nowrap" }}>
                          {item?.booking_date
                            ? formatNewDate(item?.booking_date)
                            : ""}
                        </CTableDataCell>
                        <CTableDataCell style={{ whiteSpace: "nowrap" }}>
                          {item?.start_time
                            ? convertToAmPm(item?.start_time)
                            : ""}
                        </CTableDataCell>
                        <CTableDataCell style={{ whiteSpace: "nowrap" }}>
                          {item?.duration_time
                            ? convertToHoursAndMinutes(item?.duration_time)
                            : ""}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item?.court?.court_number}
                        </CTableDataCell>
                        <CTableDataCell
                          style={{ whiteSpace: "nowrap" }}
                        >{`${item?.user?.first_name} ${item?.user?.last_name}`}</CTableDataCell>
                        <CTableDataCell style={{ whiteSpace: "nowrap" }}>
                          {item?.user?.email}
                        </CTableDataCell>
                        <CTableDataCell>{item?.user?.phone}</CTableDataCell>

                        <CTableDataCell>
                          {item?.court?.court_fee_hrs
                            ? `$${item?.court?.court_fee_hrs}`
                            : ""}
                        </CTableDataCell>
                        <CTableDataCell>
                          {" "}
                          {item?.tax || item?.tax == 0 ? `$${item?.tax}` : ""}
                        </CTableDataCell>
                        <CTableDataCell>
                          {" "}
                          {item?.cc_fees || item?.cc_fees == 0
                            ? `$${item?.cc_fees}`
                            : ""}
                        </CTableDataCell>
                        <CTableDataCell>
                          {" "}
                          {item?.on_amount
                            ? `$${parseFloat(item?.on_amount).toFixed(2)}`
                            : ""}
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

        {reportTable?.length > 0 && (
          <div className="pagination_outer mt-5 pt-4">
            <div className="pagination_section">
              <CRow className="align-items-center">
                <CCol sm={6} className="my-1">
                  <p className="showing_page">
                    {`Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, totalCounts)} of ${totalCounts} entries`}
                  </p>
                </CCol>
                <CCol sm={6} className="my-1">
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
      {/* </CCard> */}
    </>
  );
};

export default Reporting;
