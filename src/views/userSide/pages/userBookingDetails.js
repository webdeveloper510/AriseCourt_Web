import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import { getCourtBooking, getCourtBookingbyId } from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

export default function UserBookingDetails() {
  const navigate = useNavigate();
  const [allBooking, setAllBooking] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllBookingData();
  }, []);

  const getAllBookingData = () => {
    setLoading(true);
    getCourtBookingbyId(id)
      .then((res) => {
        setLoading(false);
        if (res?.status == 200) {
          setAllBooking(res?.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
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

  return (
    <UserLayout>
      <div className="book_court_section">
        <div className="container">
          <h3 className="book_court_title">Booking Details</h3>

          {loading ? (
            <div className="loader_outer">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="summary-container">
              {/* Court Details */}
              <div className="summary-section">
                <h3>Court Details</h3>
                <div className="summary-row-last row">
                  <div className="col-12 col-md-6 mb-1">
                    <span className="label">Name</span>
                    <span className="value">
                      {allBooking?.court?.location?.name
                        ? allBooking?.court?.location?.name
                        : ""}
                    </span>
                  </div>
                  <div className="col-12 col-md-6 mb-1">
                    <span className="label">Location</span>
                    <span className="value">
                      {`${
                        allBooking?.court?.location?.address_1
                          ? `${allBooking?.court?.location?.address_1},`
                          : ""
                      } ${
                        allBooking?.court?.location?.address_2
                          ? `${allBooking?.court?.location?.address_2},`
                          : ""
                      } ${
                        allBooking?.court?.location?.address_3
                          ? `${allBooking?.court?.location?.address_3},`
                          : ""
                      } ${
                        allBooking?.court?.location?.address_4
                          ? `${allBooking?.court?.location?.address_4}`
                          : ""
                      }`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="summary-section">
                <h3>Booking Details</h3>
                <div className="summary-row-last row">
                  <div className="col-12 col-md-6 mb-1">
                    <div className="mb-1">
                      <span className="label">Court Number</span>
                      <span className="value">
                        {" "}
                        {allBooking?.court?.court_number
                          ? allBooking?.court?.court_number
                          : ""}
                      </span>
                    </div>

                    <div className="mb-1">
                      <span className="label">Booking ID</span>
                      <span className="value">
                        {allBooking?.booking_id ? allBooking?.booking_id : ""}
                      </span>
                    </div>

                    <div className="mb-1">
                      <span className="label">Amount Paid</span>
                      <span className="value">
                        {allBooking?.on_amount
                          ? `$${parseFloat(allBooking?.on_amount)?.toFixed(2)}`
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-1">
                    <div className="mb-1">
                      <span className="label">Date</span>
                      <span className="value">
                        {allBooking?.booking_date
                          ? allBooking?.booking_date
                          : ""}
                      </span>
                    </div>

                    <div className="mb-1">
                      <span className="label">Time</span>
                      <span className="value">{`${allBooking?.start_time ? convertToAmPm(allBooking?.start_time) : ""} - ${allBooking?.end_time ? convertToAmPm(allBooking?.end_time) : ""}`}</span>
                    </div>

                    <div className="mb-1">
                      <span className="label">Duration</span>
                      <span className="value">
                        {allBooking?.duration_time
                          ? convertToHoursAndMinutes(allBooking?.duration_time)
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="summary-section-last">
                <h3>Payment Details</h3>
                <div className="summary-row-last row">
                  <div className="col-6 col-md-3 mb-1">
                    <span className="label">Payment Method</span>
                    <span className="value">Stripe</span>
                  </div>
                  <div className="col-6 col-md-3 mb-1">
                    <span className="label">CC Fees</span>
                    <span className="value">
                      {allBooking?.cc_fees ? `$${allBooking?.cc_fees}` : ""}
                    </span>
                  </div>
                  <div className="col-6 col-md-3 mb-1">
                    <span className="label">Tax</span>
                    <span className="value">
                      {allBooking?.tax ? `$${allBooking?.tax}` : ""}
                    </span>
                  </div>
                  <div className="col-6 col-md-3 mb-1">
                    <span className="label">Summary</span>
                    <span className="value">
                      {allBooking?.on_amount ? `$${parseFloat(allBooking?.on_amount)?.toFixed(2)}` : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Button */}
            </div>
          )}
          <div className="summary-footer">
            <button
              onClick={() => navigate("/user-book-court")}
              className="rebook-btn"
            >
              REBOOK NOW
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
