import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import { getCourtBooking, getMyCourtBooking } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { CCol, CPagination, CPaginationItem, CRow } from "@coreui/react";

export default function MyBooking() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allBooking, setAllBooking] = useState([]);
  const itemsPerPage = 10;
  const [totalCounts, setTotalCounts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    getAllBookingData(currentPage);
  }, [currentPage]);

  const getAllBookingData = (page = 1) => {
    setLoading(true);
    getMyCourtBooking(page)
      .then((res) => {
        setLoading(false);
        if (res?.status == 200) {
          setAllBooking(res?.data?.results);
          setTotalCounts(res?.data?.count);
          setTotalPages(Math.ceil(res?.data?.count / itemsPerPage));
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const convertToAmPm = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hourNum = parseInt(hours, 10);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const adjustedHour = hourNum % 12 || 12; // Convert 0 to 12
    return `${adjustedHour}:${minutes} ${ampm}`;
  };

  const convertToHoursAndMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hourNum = parseInt(hours, 10);
    const minuteNum = parseInt(minutes, 10);

    let result = "";

    if (hourNum > 0) {
      result += `${hourNum} Hour`;
    }

    if (minuteNum > 0) {
      result += ` ${minuteNum} min`;
    }

    return result.trim();
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Update current page
      getAllBookingData(page);
    }
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

  return (
    <UserLayout>
      <div className="book_court_section"
       style={{ height: allBooking?.length > 5 ? "auto" : "450px" }}
       >
        <div className="container position-relative pe-0">
          <h3 className="book_court_title">My Bookigs</h3>

          {loading && (
            <div className="loader_outer">
              <span className="loader"></span>
            </div>
          )}
          <div className="booking-container">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Sr no</th>
                  <th>Location Name & ID</th>
                  <th>Date & Time</th>
                  <th>Court No.</th>
                  <th>Contact Details</th>
                  <th>Price & Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allBooking?.map((b, i) => (
                  <tr key={i}>
                    <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                    <td>
                      <div className="location">
                        <span className="loc-id">{b?.locationId}</span>
                        <span className="loc-name">
                          {b?.court?.location?.name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="datetime">
                        <span className="loc-id">{`${b?.start_time ? convertToAmPm(b?.start_time) : ""} - ${b?.end_time ? convertToAmPm(b?.end_time) : ""}`}</span>
                        <span>
                          {b?.duration_time
                            ? convertToHoursAndMinutes(b?.duration_time)
                            : ""}
                        </span>
                        <span>{b?.booking_date}</span>
                      </div>
                    </td>
                    <td>{b?.court?.court_number}</td>
                    <td>
                      <div className="contact">
                        <span className="loc-id">{b?.user?.phone}</span>
                        <span>{b?.user?.email}</span>
                      </div>
                    </td>
                    <td>
                      <div className="status">
                        <span className={b?.status.toLowerCase()}>
                          {b?.status}
                        </span>
                        <span>${Number(b?.on_amount) || b?.total_price}</span>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/user-booking-details/${b?.booking_id}`)
                        }
                        className="action-btn"
                      >
                        ›
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {allBooking?.length > 0 && (
            <div className="px-5">
              <div className="pagination_outer mt-5 pt-4">
                <div className="pagination_section">
                  <CRow className="align-items-center">
                    <CCol md={6}>
                      <p className="showing_page">
                        {`Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, totalCounts)} of ${totalCounts} entries`}
                      </p>
                    </CCol>
                    <CCol md={6}>
                      <CPagination
                        align="end"
                        aria-label="Page navigation example"
                      >
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
                            className={
                              currentPage === page ? "active_page" : ""
                            }
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
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
