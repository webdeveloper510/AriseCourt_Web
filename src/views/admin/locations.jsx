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
import { cilCloudUpload, cilDelete, cilFilter, cilPencil, cilSearch } from "@coreui/icons";

const Locations = () => {

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

  const handleEditLocation = () => {
    navigate("/location-details")
  }

  return (
    <>
      {/* <WidgetsDropdown className="mb-4" /> */}
      {/* <CCard className="mb-4"> */}
      <CCardBody className="p-2">
        <CRow>
          <CCol sm={12} md={6}>
            <h4 id="traffic" className="card-title mb-0">
            Locations
            </h4>
            <div className="small text-body-secondary">
            List of Locations configured for Court Bookings.
            </div>
          </CCol>
          <CCol sm={12} md={6} className="text-end">
            <Link to="/add-locations">
              <CButton className="add_new_butn">+ Add New</CButton>
            </Link>
          </CCol>
          <CCol sm={12} md={6} className="mt-3">
            <CInputGroup className="search_input_group" style={{height:"45px"}}>
              <CInputGroupText className="input_icons"><CIcon icon={cilSearch}></CIcon></CInputGroupText>
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
                  borderRadius:"12px"
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
              <CButton className="filter_butn"><CIcon icon={cilFilter}></CIcon> FILTERS</CButton>
             </div>
            </div>
          </CCol>
        </CRow>

        <CTable className="mt-4" striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID KEY</CTableHeaderCell>
              <CTableHeaderCell scope="col">Logo & Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
              <CTableHeaderCell scope="col">City</CTableHeaderCell>
              <CTableHeaderCell scope="col">Country</CTableHeaderCell>
              <CTableHeaderCell scope="col"># of Courts</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>#3214</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>dummy221@gmail.com</CTableDataCell>
              <CTableDataCell>01796-329869</CTableDataCell>
              <CTableDataCell>California</CTableDataCell>
              <CTableDataCell>USA</CTableDataCell>
              <CTableDataCell>19</CTableDataCell>
              <CTableDataCell><CIcon icon={cilPencil} onClick={()=>{handleEditLocation()}}></CIcon><CIcon icon={cilDelete}></CIcon></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#3214</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>dummy221@gmail.com</CTableDataCell>
              <CTableDataCell>01796-329869</CTableDataCell>
              <CTableDataCell>California</CTableDataCell>
              <CTableDataCell>USA</CTableDataCell>
              <CTableDataCell>19</CTableDataCell>
              <CTableDataCell><CIcon icon={cilPencil} onClick={()=>{handleEditLocation()}}></CIcon><CIcon icon={cilDelete}></CIcon></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#3214</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>dummy221@gmail.com</CTableDataCell>
              <CTableDataCell>01796-329869</CTableDataCell>
              <CTableDataCell>California</CTableDataCell>
              <CTableDataCell>USA</CTableDataCell>
              <CTableDataCell>19</CTableDataCell>
              <CTableDataCell><CIcon icon={cilPencil} onClick={()=>{handleEditLocation()}}></CIcon><CIcon icon={cilDelete}></CIcon></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#3214</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>dummy221@gmail.com</CTableDataCell>
              <CTableDataCell>01796-329869</CTableDataCell>
              <CTableDataCell>California</CTableDataCell>
              <CTableDataCell>USA</CTableDataCell>
              <CTableDataCell>19</CTableDataCell>
              <CTableDataCell><CIcon icon={cilPencil} onClick={()=>{handleEditLocation()}}></CIcon><CIcon icon={cilDelete}></CIcon></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#3214</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>dummy221@gmail.com</CTableDataCell>
              <CTableDataCell>01796-329869</CTableDataCell>
              <CTableDataCell>California</CTableDataCell>
              <CTableDataCell>USA</CTableDataCell>
              <CTableDataCell>19</CTableDataCell>
              <CTableDataCell><CIcon icon={cilPencil} onClick={()=>{handleEditLocation()}}></CIcon><CIcon icon={cilDelete}></CIcon></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#3214</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>dummy221@gmail.com</CTableDataCell>
              <CTableDataCell>01796-329869</CTableDataCell>
              <CTableDataCell>California</CTableDataCell>
              <CTableDataCell>USA</CTableDataCell>
              <CTableDataCell>19</CTableDataCell>
              <CTableDataCell><CIcon icon={cilPencil} onClick={()=>{handleEditLocation()}}></CIcon><CIcon icon={cilDelete}></CIcon></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#3214</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>dummy221@gmail.com</CTableDataCell>
              <CTableDataCell>01796-329869</CTableDataCell>
              <CTableDataCell>California</CTableDataCell>
              <CTableDataCell>USA</CTableDataCell>
              <CTableDataCell>19</CTableDataCell>
              <CTableDataCell><CIcon icon={cilPencil} onClick={()=>{handleEditLocation()}}></CIcon><CIcon icon={cilDelete}></CIcon></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>#3214</CTableDataCell>
              <CTableDataCell>Beach Badminton Club</CTableDataCell>
              <CTableDataCell>dummy221@gmail.com</CTableDataCell>
              <CTableDataCell>01796-329869</CTableDataCell>
              <CTableDataCell>California</CTableDataCell>
              <CTableDataCell>USA</CTableDataCell>
              <CTableDataCell>19</CTableDataCell>
              <CTableDataCell><CIcon icon={cilPencil} onClick={()=>{handleEditLocation()}}></CIcon><CIcon icon={cilDelete}></CIcon></CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
      {/* </CCard> */}
    </>
  );
};

export default Locations;
