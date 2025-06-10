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
import { Link } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import CIcon, { CIconSvg } from "@coreui/icons-react";
import {
  cilCloudUpload,
  cilDelete,
  cilFilter,
  cilPencil,
  cilSearch,
} from "@coreui/icons";

const Reporting = () => {
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

  return (
    <>
      {/* <WidgetsDropdown className="mb-4" /> */}
      {/* <CCard className="mb-4"> */}
      <CCardBody className="p-2">
        <CRow>
          <CCol sm={12} md={6}>
            <h4 id="traffic" className="card-title mb-0">
              Reporting
            </h4>
            <div className="card_description">
            Standard Reports
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

        <CTable className="mt-4 main_table" striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Booking Id</CTableHeaderCell>
              <CTableHeaderCell scope="col">Location Name & ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date & Time</CTableHeaderCell>
              <CTableHeaderCell scope="col">Court No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">Booked By</CTableHeaderCell>
              <CTableHeaderCell scope="col">Contact Details</CTableHeaderCell>
              <CTableHeaderCell scope="col">Price & Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>#32144569870</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>August 29, 2026</CTableDataCell>
              <CTableDataCell>08</CTableDataCell>
              <CTableDataCell>Dummy Name</CTableDataCell>
              <CTableDataCell>dummy221email.@gmail.com</CTableDataCell>
              <CTableDataCell>$57.00</CTableDataCell>
              <CTableDataCell>
                <CIcon icon={cilPencil}></CIcon>
                <CIcon icon={cilDelete}></CIcon>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#32144569870</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>August 29, 2026</CTableDataCell>
              <CTableDataCell>08</CTableDataCell>
              <CTableDataCell>Dummy Name</CTableDataCell>
              <CTableDataCell>dummy221email.@gmail.com</CTableDataCell>
              <CTableDataCell>$57.00</CTableDataCell>
              <CTableDataCell>
                <CIcon icon={cilPencil}></CIcon>
                <CIcon icon={cilDelete}></CIcon>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#32144569870</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>August 29, 2026</CTableDataCell>
              <CTableDataCell>08</CTableDataCell>
              <CTableDataCell>Dummy Name</CTableDataCell>
              <CTableDataCell>dummy221email.@gmail.com</CTableDataCell>
              <CTableDataCell>$57.00</CTableDataCell>
              <CTableDataCell>
                <CIcon icon={cilPencil}></CIcon>
                <CIcon icon={cilDelete}></CIcon>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#32144569870</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>August 29, 2026</CTableDataCell>
              <CTableDataCell>08</CTableDataCell>
              <CTableDataCell>Dummy Name</CTableDataCell>
              <CTableDataCell>dummy221email.@gmail.com</CTableDataCell>
              <CTableDataCell>$57.00</CTableDataCell>
              <CTableDataCell>
                <CIcon icon={cilPencil}></CIcon>
                <CIcon icon={cilDelete}></CIcon>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#32144569870</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>August 29, 2026</CTableDataCell>
              <CTableDataCell>08</CTableDataCell>
              <CTableDataCell>Dummy Name</CTableDataCell>
              <CTableDataCell>dummy221email.@gmail.com</CTableDataCell>
              <CTableDataCell>$57.00</CTableDataCell>
              <CTableDataCell>
                <CIcon icon={cilPencil}></CIcon>
                <CIcon icon={cilDelete}></CIcon>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#32144569870</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>August 29, 2026</CTableDataCell>
              <CTableDataCell>08</CTableDataCell>
              <CTableDataCell>Dummy Name</CTableDataCell>
              <CTableDataCell>dummy221email.@gmail.com</CTableDataCell>
              <CTableDataCell>$57.00</CTableDataCell>
              <CTableDataCell>
                <CIcon icon={cilPencil}></CIcon>
                <CIcon icon={cilDelete}></CIcon>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#32144569870</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>August 29, 2026</CTableDataCell>
              <CTableDataCell>08</CTableDataCell>
              <CTableDataCell>Dummy Name</CTableDataCell>
              <CTableDataCell>dummy221email.@gmail.com</CTableDataCell>
              <CTableDataCell>$57.00</CTableDataCell>
              <CTableDataCell>
                <CIcon icon={cilPencil}></CIcon>
                <CIcon icon={cilDelete}></CIcon>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#32144569870</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>August 29, 2026</CTableDataCell>
              <CTableDataCell>08</CTableDataCell>
              <CTableDataCell>Dummy Name</CTableDataCell>
              <CTableDataCell>dummy221email.@gmail.com</CTableDataCell>
              <CTableDataCell>$57.00</CTableDataCell>
              <CTableDataCell>
                <CIcon icon={cilPencil}></CIcon>
                <CIcon icon={cilDelete}></CIcon>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
      {/* </CCard> */}
    </>
  );
};

export default Reporting;
