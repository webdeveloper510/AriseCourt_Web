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
import { getStripeKey } from "../../../utils/api";

// const secretKey = import.meta.env.VITE_APP_CLIENT_SECRET_KET;

// const stripePromise = loadStripe(secretKey);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [stripeKey, setStripeKey] = useState("");
  const [loading, setLoading] = useState(false);
  const state = useLocation();

  useEffect(()=>{
    getStripeKey().then((res)=>{
      if(res?.status == 200){
        setStripeKey(loadStripe(res?.data?.publishableKey))
      }
    }).catch((error)=>{
      console.log(error)
    })
  },[])

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
            stripe={stripeKey}
            options={{ clientSecret, appearance }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}
