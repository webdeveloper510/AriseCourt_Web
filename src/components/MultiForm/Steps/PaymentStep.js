import React, { useEffect, useState } from "react";
import StripeImage from "../../../assets/images/stripe_image.png";
import { paymentStripe } from "../../../utils/api";
import CheckoutForm from "../../../views/userSide/pages/checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "../../../views/userSide/pages/CheckoutPage";
import { useNavigate } from "react-router-dom";

export default function PaymentStep({
  bookingDetails,
  onBack,
  onConfirm,
  formData,
}) {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [allBooking, setAllBooking] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setAllBooking(bookingDetails);
  }, [allBooking]);

  const handlePayment = () => {
    setLoading(true);
    paymentStripe({
      booking_id: String(allBooking?.booking_id),
    })
      .then((res) => {
        setLoading(false);
        console.log("handlePayment", res);
        if (res?.status == 200) {
          const url = res?.data?.checkout_url;
          if (url) {
            window.location.href = url;
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
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

      {/* Payment Summary */}
      <div className="section">
        <h5 className="my_details_title">Payment Summary</h5>
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
            {" "}
            {allBooking?.total_price ? `$${allBooking?.total_price}` : ""}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-row">
        <button className="prev-btn" onClick={onBack}>
          PREVIOUS
        </button>

        {/* <CheckoutPage booking_id={String(allBooking?.booking_id)} /> */}

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
      {/* <CheckoutPage booking_id={String(allBooking?.booking_id)} /> */}
    </div>
  );
}
