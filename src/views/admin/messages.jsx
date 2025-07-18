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
  cilPencil,
  cilReload,
  cilSearch,
  cilX,
} from "@coreui/icons";
import { CPagination, CPaginationItem } from "@coreui/react";
import { deleteAdminbyId, getAdmin, getContactMessage } from "../../utils/api";
import deleteImage from "../../assets/images/delete_image.png";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { toast } from "react-toastify";
import moment from "moment/moment";

const Messages = () => {
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
    getContactMessage(page, query, startDate, endDate)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setAdminData(res?.data?.results?.data);
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
          <CCol sm={12} md={12} xs={12}>
            <h4 id="traffic" className="card-title mb-0">
              Messages
            </h4>
            {/* <div className="card_description">
              View all of your admin information.
            </div> */}
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
                setCurrentPage(1)
                setStartDate(new Date());
                setEndDate(new Date());
                setSelectionRange({
                  startDate: new Date(),
                  endDate: new Date(),
                  key: "selection",
                });
                getAdminData();
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
        {adminData?.length > 0 ? (
          <div style={{ overflowX: "auto" }} className="table_flow">
            <CTable className="mt-4 main_table" striped>
              <CTableHead>
                <CTableRow>
                  {/* <CTableHeaderCell scope="col">Location Id</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col">Sr no.</CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    First Name
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Last Name
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    E-mail Address
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Phone Number
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Action</CTableHeaderCell> */}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {adminData
                  ?.sort((a, b) => b?.id - a?.id)
                  ?.map((item, i) => {
                    return (
                      <CTableRow key={i}>
                        {/* <CTableDataCell>#123</CTableDataCell> */}
                        <CTableDataCell>{(currentPage - 1) * itemsPerPage + i + 1}</CTableDataCell>
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

                        <CTableDataCell>{item?.email}</CTableDataCell>
                        <CTableDataCell>{item?.phone}</CTableDataCell>
                        <CTableDataCell className="address_text">
                          {item?.message}
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
                              }} className="outer_action_icons"
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

export default Messages;
