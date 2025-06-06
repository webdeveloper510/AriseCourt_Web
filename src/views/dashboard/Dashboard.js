import React from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";

const Dashboard = () => {
  return (
    <>
      {/* <WidgetsDropdown className="mb-4" /> */}
      {/* <CCard className="mb-4"> */}
        <CCardBody className="p-2">
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Admin
              </h4>
              <div className="small text-body-secondary">
                View all of your Admin information.
              </div>
            </CCol>
          </CRow>

          <CTable className="mt-4" striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Client</CTableHeaderCell>
                <CTableHeaderCell scope="col">E-mail Id</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col">Added Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Access Level</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>Dummy Name</CTableDataCell>
                <CTableDataCell>dummy221email.@gmail.com</CTableDataCell>
                <CTableDataCell>01796-329869</CTableDataCell>
                <CTableDataCell>22-10-2022</CTableDataCell>
                <CTableDataCell>3</CTableDataCell>
                <CTableDataCell>Edit</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>Dummy Name</CTableDataCell>
                <CTableDataCell>dummy221email.@gmail.com</CTableDataCell>
                <CTableDataCell>01796-329869</CTableDataCell>
                <CTableDataCell>22-10-2022</CTableDataCell>
                <CTableDataCell>3</CTableDataCell>
                <CTableDataCell>Edit</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>Dummy Name</CTableDataCell>
                <CTableDataCell>dummy221email.@gmail.com</CTableDataCell>
                <CTableDataCell>01796-329869</CTableDataCell>
                <CTableDataCell>22-10-2022</CTableDataCell>
                <CTableDataCell>3</CTableDataCell>
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
