import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import { CDateRangePicker } from "@coreui/react-pro";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import CIcon, { CIconSvg } from "@coreui/icons-react";
import { cilDelete, cilFilter, cilPencil, cilSearch } from "@coreui/icons";

const Dashboard = () => {
  const navigate = useNavigate()
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSelect = (ranges) => {
    console.log(ranges);
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

  const handleEditAdmin = () => {
    navigate(`/update-registraion/12`);
  };

  return (
    <>
      {/* <WidgetsDropdown className="mb-4" /> */}
      {/* <CCard className="mb-4"> */}
      <CCardBody className="p-2">
        <CRow>
          <CCol sm={12} md={6}>
            <h4 id="traffic" className="card-title mb-0">
              Admin
            </h4>
            <div className="small text-body-secondary">
              View all of your Admin information.
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

        <CTable className="mt-4" striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Location Id</CTableHeaderCell>
              <CTableHeaderCell scope="col">Admin Id</CTableHeaderCell>
              <CTableHeaderCell scope="col">Password</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Access</CTableHeaderCell>
              <CTableHeaderCell scope="col">E-mail Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
              <CTableHeaderCell scope="col">City</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
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
            </CTableRow>
            <CTableRow>
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
            </CTableRow>
            <CTableRow>
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
            </CTableRow>
            <CTableRow>
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
            </CTableRow>
            <CTableRow>
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
            </CTableRow>
            <CTableRow>
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
            </CTableRow>
            <CTableRow>
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
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
      {/* </CCard> */}
    </>
  );
};

export default Dashboard;
