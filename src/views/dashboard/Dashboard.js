import React, { useEffect, useState } from "react";
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
import { cilDelete, cilFilter, cilPencil, cilSearch } from "@coreui/icons";
import { CPagination, CPaginationItem } from "@coreui/react";
import { deleteAdminbyId, getAdmin } from "../../utils/api";
import deleteImage from "../../assets/images/delete_image.png";
import { toast } from "react-toastify";


const Dashboard = () => {
  const navigate = useNavigate();
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [visible, setVisible] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id)); // Toggle
  };

  useEffect(() => {
    getAdminData();
  }, []);

  const getAdminData = () => {
    getAdmin()
      .then((res) => {
        if (res.status == 200) {
          setAdminData(res?.data?.results);
        } else {
          setAdminData([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setAdminData([]);
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

  const handleEditAdmin = (id) => {
    navigate(`/update-registraion/${id}`);
  };

  const handleDeleteModal = (id) => {
    setVisible(true);
    setAdminId(id);
  };

  const handleDeleteAdmin = () => {
    deleteAdminbyId(adminId)
      .then((res) => {
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
              Admin
            </h4>
            <div className="card_description">
              View All Of Your Admin Information.
            </div>
          </CCol>
          <CCol sm={12} md={6} className="text-end">
            <Link to="/admin-registraion">
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
        {adminData?.length > 0 ? (
          <CTable className="mt-4 main_table" striped>
            <CTableHead>
              <CTableRow>
                {/* <CTableHeaderCell scope="col">Location Id</CTableHeaderCell> */}
                <CTableHeaderCell scope="col">Admin Id</CTableHeaderCell>
                <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Access</CTableHeaderCell>
                <CTableHeaderCell scope="col">E-mail Address</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">City</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {adminData?.map((item, i) => {
                return (
                  <CTableRow key={i}>
                    {/* <CTableDataCell>#123</CTableDataCell> */}
                    <CTableDataCell>{item?.id}</CTableDataCell>
                    <CTableDataCell>{item?.first_name}</CTableDataCell>
                    <CTableDataCell>{item?.last_name}</CTableDataCell>
                    <CTableDataCell>
                      {item?.user_type == 1 ? "Admin" : ""}
                    </CTableDataCell>
                    <CTableDataCell>0</CTableDataCell>
                    <CTableDataCell>{item?.email}</CTableDataCell>
                    <CTableDataCell>{item?.phone}</CTableDataCell>
                    <CTableDataCell>{item?.city}</CTableDataCell>
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
                              <CIcon icon={cilDelete} className="delete_icon" />{" "}
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
        ) : (
          ""
        )}
        <div className="pagination_outer mt-5">
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
                onClick={() => handleDeleteAdmin()}
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

export default Dashboard;
