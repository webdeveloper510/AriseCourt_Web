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
import { DateRangePicker } from "react-date-range";
import CIcon, { CIconSvg } from "@coreui/icons-react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
  cilCloudUpload,
  cilDelete,
  cilFilter,
  cilPencil,
  cilSearch,
} from "@coreui/icons";
import UserIcon from "../../assets/images/report_user_icon.png";
import BookingIcon from "../../assets/images/report_booking_icon.png";
import CourtsIcon from "../../assets/images/report_court_icon.png";
import ProfitIcon from "../../assets/images/report_profit_icon.png";

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
            <div className="card_description">Standard Reports</div>
          </CCol>
        </CRow>

        <div className="my-3">
          <CRow>
            <CCol md={3}>
              <div className="report_cards">
                <div className="report_card_image">
                  <img src={UserIcon} alt="UserIcon" />
                </div>
                <div>
                  <h6 className="report_card_title">800</h6>
                  <p className="report_card_Desc">Total users</p>
                </div>
              </div>
            </CCol>

            <CCol md={3}>
              <div className="report_cards">
                <div className="report_card_image">
                  <img src={BookingIcon} alt="UserIcon" />
                </div>
                <div>
                  <h6 className="report_card_title">5869851+</h6>
                  <p className="report_card_Desc">Bookings</p>
                </div>
              </div>
            </CCol>

            <CCol md={3}>
              <div className="report_cards">
                <div className="report_card_image">
                  <img src={CourtsIcon} alt="UserIcon" />
                </div>
                <div>
                  <h6 className="report_card_title">369851+</h6>
                  <p className="report_card_Desc">Total courts</p>
                </div>
              </div>
            </CCol>

            <CCol md={3}>
              <div className="report_cards">
                <div className="report_card_image">
                  <img src={ProfitIcon} alt="UserIcon" />
                </div>
                <div>
                  <h6 className="report_card_title">$986545.00</h6>
                  <p className="report_card_Desc">Total profit</p>
                </div>
              </div>
            </CCol>
          </CRow>
        </div>

        <CRow className="mt-5">
          <CCol sm={12} md={4}>
            <h6 id="traffic" className="card-title mb-0">
              Reports
            </h6>
          </CCol>

          <CCol sm={12} md={8}>
            <CRow>
              <CCol md={6}>
                <CInputGroup
                  className="search_input_group_reports"
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

              <CCol md={6}>
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
          </CCol>
        </CRow>

        <CTable className="mt-4 main_table" striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Booking Id</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Location Name & ID
              </CTableHeaderCell>
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
              <CTableDataCell>dummy22@gmail.com</CTableDataCell>
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
              <CTableDataCell>dummy22@gmail.com</CTableDataCell>
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
              <CTableDataCell>dummy22@gmail.com</CTableDataCell>
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
              <CTableDataCell>dummy22@gmail.com</CTableDataCell>
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
              <CTableDataCell>dummy22@gmail.com</CTableDataCell>
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
              <CTableDataCell>dummy22@gmail.com</CTableDataCell>
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
              <CTableDataCell>dummy22@gmail.com</CTableDataCell>
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
              <CTableDataCell>dummy22@gmail.com</CTableDataCell>
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
