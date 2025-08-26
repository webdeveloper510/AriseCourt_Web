import React, { useEffect, useState } from "react";
import StripeImage from "../../../assets/images/stripe_image.png";
import { updateCourtBookings } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export default function PaymentStep({ bookingDetails, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [allBooking, setAllBooking] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("logged_user_data"));
  const role = localStorage.getItem("role");
  useEffect(() => {
    setAllBooking(bookingDetails);
  }, [allBooking]);

  const handleConfirm = () => {
    const id = allBooking?.booking_id;
    setLoading(true);
    updateCourtBookings(id, {
      status: "confirmed",
    })
      .then((res) => {
        setLoading(false);
        console.log("confirmed", res);
        navigate(`${role == "user" ? "/user-bookings" : "/bookings"}`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="checkout-container">
      {loading && (
        <div className="loader_outer">
          <span className="loader"></span>
        </div>
      )}
      <div className="section">
        <h5 className="my_details_title">Payment Method</h5>
        <label className="payment-option">
          <span className="payment-label">
            <img src={StripeImage} alt="Stripe" className="payment-logo" />
            Stripe
          </span>

          <input
            type="radio"
            name="payment"
            value="stripe"
            checked={paymentMethod === "stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </label>
      </div>

      <hr />

      <div className="section">
        <h5 className="my_details_title">Payment Summary</h5>
        <div className="summary-row">
          <span className="label">Amount :</span>
          <span className="value">
            {" "}
            {allBooking?.total_price ? `$${parseFloat(allBooking?.total_price)?.toFixed(2)}` : ""}
          </span>
        </div>
        <div className="summary-row">
          <span className="label">CC Fees :</span>
          <span className="value">
            {" "}
            {allBooking?.cc_fees ? `$${allBooking?.cc_fees}` : ""}
          </span>
        </div>
        <div className="summary-row">
          <span className="label">Tax :</span>
          <span className="value">
            {allBooking?.tax ? `$${allBooking?.tax}` : ""}
          </span>
        </div>
        <div className="summary-row">
          <span className="label summary">Summary :</span>
          <span className="value summary">
            {allBooking?.summary ? `$${parseFloat(allBooking?.summary)?.toFixed(2)}` : ""}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-row">
        <button className="prev-btn" onClick={onBack}>
          PREVIOUS
        </button>

        {/* <CheckoutPage booking_id={String(allBooking?.booking_id)} /> */}

        <div>
          {(userData?.user_type ==  1 || userData?.user_type == 0) && (
            <button
              className="next-btn me-2"
              onClick={() => {
                handleConfirm();
              }}
            >
              CONFIRM
            </button>
          )}

          <button
            className="next-btn"
            onClick={() => {
              navigate("/checkout-session", {
                state: String(allBooking?.booking_id),
              });
            }}
          >
            CONFIRM & PAY NOW
          </button>
        </div>
      </div>
      {/* <CheckoutPage booking_id={String(allBooking?.booking_id)} /> */}
    </div>
  );
}
