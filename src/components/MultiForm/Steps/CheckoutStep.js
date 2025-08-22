import React, { useEffect, useState } from "react";
import { getCourtBookingbyId } from "../../../utils/api";

export default function CheckoutStep({ bookingDetails, onNext, onBack }) {
  const [allBooking, setAllBooking] = useState([]);

  useEffect(() => {
    setAllBooking(bookingDetails);
  }, [allBooking]);

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
    <div className="checkout-container">
      {/* My Details */}
      <div className="section">
        <h5 className="my_details_title">My Details</h5>
        <div className="row">
          <div className="col-md-4">
            <p className="label_text">Name</p>
            <p className="value_text">
              {" "}
              {`${
                allBooking?.user?.first_name ? allBooking?.user?.first_name : ""
              } ${
                allBooking?.user?.last_name ? allBooking?.user?.last_name : ""
              }`}
            </p>
          </div>
          <div className="col-md-4">
            <p className="label_text">Phone</p>
            <p className="value_text">
              {allBooking?.user?.phone ? allBooking?.user?.phone : ""}
            </p>
          </div>
          <div className="col-md-4">
            <p className="label_text">Email</p>
            <p className="value_text">
              {allBooking?.user?.email ? allBooking?.user?.email : ""}
            </p>
          </div>
        </div>
      </div>

      <hr />

      {/* Court Details */}
      <div className="section">
        <h5 className="my_details_title">Court Details</h5>
        <div className="row">
          <div className="col-md-4">
            <p className="label_text">Name</p>
            <p className="value_text">
              {allBooking?.court?.location?.name
                ? allBooking?.court?.location?.name
                : ""}
            </p>
          </div>
          <div className="col-md-4">
            <p className="label_text">Location</p>
            <p className="value_text">
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
                  ? `${allBooking?.court?.location?.address_4},`
                  : ""
              }`}
            </p>
          </div>
        </div>
      </div>

      <hr />

      {/* Booking Details */}
      <div className="section">
        <h5 className="my_details_title">Booking Details</h5>
        <div className="row">
          <div className="col-4">
            <p className="label_text">
              <span>Court Number :</span>{" "}
            </p>
          </div>
          <div className="col-8">
            <p className="label_text">
              <span className="value_text">
                {" "}
                {allBooking?.court?.court_number
                  ? allBooking?.court?.court_number
                  : ""}
              </span>
            </p>
          </div>
          <div className="col-4">
            <p className="label_text">
              <span>Date :</span>{" "}
            </p>
          </div>
          <div className="col-8">
            <p className="label_text">
              <span className="value_text">
                {" "}
                {allBooking?.booking_date ? allBooking?.booking_date : ""}
              </span>
            </p>
          </div>
          <div className="col-4">
            <p className="label_text">
              <span>Time :</span>{" "}
            </p>
          </div>
          <div className="col-8">
            <p className="label_text">
              <span className="value_text">{`${allBooking?.start_time ? convertToAmPm(allBooking?.start_time) : ""} - ${allBooking?.end_time ? convertToAmPm(allBooking?.end_time) : ""}`}</span>
            </p>
          </div>
          <div className="col-4">
            <p className="label_text">
              <span>Duration :</span>
            </p>
          </div>
          <div className="col-8">
            <p className="label_text">
              <span className="value_text">
                {" "}
                {allBooking?.duration_time
                  ? convertToHoursAndMinutes(allBooking?.duration_time)
                  : ""}
              </span>
            </p>
          </div>
          <div className="col-4">
            <p className="label_text">
              <span>Booking ID :</span>{" "}
            </p>
          </div>
          <div className="col-8">
            <p className="label_text">
              <span className="value_text">
                {" "}
                {allBooking?.booking_id ? allBooking?.booking_id : ""}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-row">
        <button className="prev-btn" onClick={onBack}>
          PREVIOUS
        </button>
        <button className="next-btn" onClick={onNext}>
          NEXT
        </button>
      </div>
    </div>
  );
}
