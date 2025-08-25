import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });
    setLoading(false);
    if (error) {
      setMessage(error.message);
      navigate("/payment-cancel")
    } else if (paymentIntent?.status === "succeeded") {
      setMessage("✅ Payment Successful");
    }

    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="loader_outer">
          <span className="loader"></span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div className="text-end">
          <button
            type="submit"
            className="next-btn mt-3 text-end"
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
        {message && <div>{message}</div>}
      </form>
    </>
  );
}
