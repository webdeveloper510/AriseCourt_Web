import React from "react";
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
import { CDateRangePicker } from '@coreui/react-pro'

const Dashboard = () => {
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
          <CCol sm={12} md={6}>
            <CInputGroup className="mb-3">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput
                placeholder="Search..."
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </CInputGroup>
          </CCol>

          <CCol sm={12} md={6}>
            <CDateRangePicker
              label="Date range"
              locale="en-US"
              onStartDateChange={(date) => console.log(date)}
              onEndDateChange={(date) => console.log(date)}
            />
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
              <CTableDataCell>Edit</CTableDataCell>
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
              <CTableDataCell>Edit</CTableDataCell>
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
              <CTableDataCell>Edit</CTableDataCell>
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
              <CTableDataCell>Edit</CTableDataCell>
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
              <CTableDataCell>Edit</CTableDataCell>
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
              <CTableDataCell>Edit</CTableDataCell>
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
              <CTableDataCell>Edit</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
      {/* </CCard> */}
    </>
  );
};

export default Dashboard;
