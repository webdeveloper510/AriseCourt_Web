import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLocation, useParams } from "react-router-dom";
import CheckoutForm from "./checkoutForm";

const stripePromise = loadStripe(
  "pk_test_51RbEv9IorG3LMbfblOcsWQtpVzPj3Hg6jRwgAeamUV6SqEICC1I0UNgEjWQPazjVmepwgHsTyulBboKdvChRnwMK00qgdQCFE2"
);

export default function CheckoutPage({ booking_id }) {
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const state = useLocation();
  const params = useParams();
  const location = window.location;

  useEffect(() => {
    if (state) {
      setLoading(true);
      axios
        .post("https://api.get1court.com/create-checkout-session/", {
          booking_id: state?.state,
        })
        .then((res) => {
          setLoading(false);
          setClientSecret(res?.data?.client_secret); // MUST be passed to Elements
        })
        .catch((err) => {
          console.error("Error creating PaymentIntent:", err);
          setLoading(false);
        });
    }
  }, []);

  const appearance = {
    theme: "stripe",
  };

  return (
    <div className="container py-5">
      {loading && (
        <div className="loader_outer">
          <span className="loader"></span>
        </div>
      )}
      <div className="payment_form">
        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}
