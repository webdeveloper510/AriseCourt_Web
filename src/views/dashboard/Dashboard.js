import React, { useEffect, useRef, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
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
import CIcon, { CIconSvg } from "@coreui/icons-react";
import {
  cilCalendar,
  cilDelete,
  cilFilter,
  cilFilterX,
  cilPencil,
  cilReload,
  cilSearch,
  cilX,
  cilXCircle,
} from "@coreui/icons";
import { CPagination, CPaginationItem } from "@coreui/react";
import { deleteAdminbyId, getAdmin } from "../../utils/api";
import deleteImage from "../../assets/images/delete_image.png";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { toast } from "react-toastify";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const Dashboard = () => {
  let SerialId = 1;
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
  const [loading, setLoading] = useState(true);

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

  const getAdminData = (
    page = 1,
    query = "",
    startDate = "",
    endDate = "",
    loader
  ) => {
    setLoading(query ? false : true);
    getAdmin(page, query, startDate, endDate)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setAdminData(res?.data?.results);
          setTotalCounts(res?.data?.count);
          setTotalPages(Math.ceil(res?.data?.count / itemsPerPage));
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
    getAdminData(currentPage, searchQuery, startDate, endDate, "loader");
  };

  useEffect(() => {
    getAdminData(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

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
    navigate(`/update-registraion/${id}`);
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
          getAdminData();
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
      {/* <WidgetsDropdown className="mb-4" /> */}
      {/* <CCard className="mb-4"> */}
      {loading && (
        <div className="loader_outer">
          <span className="loader"></span>
        </div>
      )}
      <CCardBody className="p-2 position-relative">
        <CRow>
          <CCol sm={6} md={6} xs={6}>
            <h4 id="traffic" className="card-title mb-0">
              Admin
            </h4>
            <div className="card_description">
              View all of your admin information.
            </div>
          </CCol>
          <CCol xs={6} sm={6} md={6} className="text-end">
            <Link to="/admin-registration">
              <CButton className="add_new_butn">+ Add New</CButton>
            </Link>
          </CCol>
          <CCol sm={12} md={6} className="mt-3 d-flex align-items-center gap-1">
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
                getAdminData();
              }}
              className="add_new_butn"
              style={{ height: "50px !important" }}
            >
              <CIcon icon={cilReload} />
            </CButton>
          </CCol>

          <CCol sm={6} className="mt-3">
            <div className="text-end date_filter_section">
              {/* <div
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
              </div> */}

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
              {/* <CButton
                ref={filterButtonRef}
                className="filter_butn"
                onClick={handleFilterClick}
              >
                <CIcon icon={cilFilter}></CIcon> FILTERS
              </CButton> */}
            </div>
          </CCol>
        </CRow>
        {adminData?.length > 0 ? (
          <div style={{ overflowX: "auto" }} className="table_flow">
            <CTable className="mt-4 main_table" striped>
              <CTableHead>
                <CTableRow>
                  {/* <CTableHeaderCell scope="col">Location Id</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col">Sr no.</CTableHeaderCell>
                  <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Access</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col">
                    E-mail Address
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {adminData
                  ?.sort((a, b) => b?.id - a?.id)
                  ?.map((item, i) => {
                    const location = `${item?.locations?.[0]?.address_1 ? item?.locations?.[0]?.address_1 : ""} ${item?.locations?.[0]?.address_2 ? item?.locations?.[0]?.address_2 : ""} ${item?.locations?.[0]?.address_3 ? item?.locations?.[0]?.address_3 : ""} ${item?.locations?.[0]?.address_4 ? item?.locations?.[0]?.address_4 : ""}`;
                    return (
                      <CTableRow key={i}>
                        {/* <CTableDataCell>#123</CTableDataCell> */}
                        <CTableDataCell>
                          {(currentPage - 1) * itemsPerPage + i + 1}
                        </CTableDataCell>
                        <CTableDataCell title={item?.first_name}>
                          {item?.first_name?.length > 10
                            ? `${item?.first_name?.slice(0, 10)}...`
                            : item?.first_name}
                        </CTableDataCell>
                        <CTableDataCell title={item?.last_name}>
                          {item?.last_name?.length > 10
                            ? `${item?.last_name?.slice(0, 10)}...`
                            : item?.last_name}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item?.user_type == 1 ? "Admin" : ""}
                        </CTableDataCell>
                        {/* <CTableDataCell>0</CTableDataCell> */}
                        <CTableDataCell>{item?.email}</CTableDataCell>
                        <CTableDataCell>
                          {item?.phone ? formatPhoneNumber(item?.phone) : ""}
                        </CTableDataCell>
                        <CTableDataCell
                          title={location}
                          style={{ width: "20%" }}
                        >
                          {location?.length > 50
                            ? `${location?.slice(0, 50)}...`
                            : location}
                        </CTableDataCell>
                        <CTableDataCell>
                          <div
                            style={{
                              position: "relative",
                              marginBottom: "16px",
                            }}
                            onClick={() => toggleMenu(item.id)}
                          >
                            {/* Three-dot icon */}
                            <span
                              style={{ fontSize: "24px", cursor: "pointer" }}
                              // onClick={() => toggleMenu(item.id)}
                            >
                              ⋮
                            </span>

                            {/* Dropdown menu only for selected item */}
                            {openMenuId === item.id && (
                              <div
                                style={
                                  {
                                    // position: "absolute",
                                    // top: "30px",
                                    // right: 0,
                                    // backgroundColor: "#fff",
                                    // borderRadius: "10px",
                                    // padding: "12px",
                                    // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                                    // zIndex: 999999,
                                  }
                                }
                                className="outer_action_icons"
                              >
                                <div
                                  onClick={() => {
                                    handleEditAdmin(item?.id);
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
                      icon={cilPencil}
                      onClick={() => {
                        handleEditAdmin(item?.id);
                      }}
                      className="mx-2 edit_icon"
                    ></CIcon>
                    <CIcon icon={cilDelete} className="delete_icon"></CIcon> */}
                        </CTableDataCell>
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
          <div className="pagination_outer mt-5">
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
                onClick={() => handleDeleteAdmin()}
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

export default Dashboard;
