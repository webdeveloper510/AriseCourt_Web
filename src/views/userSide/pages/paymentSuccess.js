import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { paymentSuccess } from "../../../utils/api";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  const query = new URLSearchParams(location.search);
  const payment_intent = query.get("payment_intent");

  useEffect(() => {
    checkPaymentSuccess();
  }, []);

  const checkPaymentSuccess = () => {
    paymentSuccess({
      payment_intent_id: payment_intent,
    })
      .then((res) => {
        setLoading(false);
        if (res?.status === 200) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      })
      .catch((error) => {
        setLoading(false);
        setStatus("failed");
        console.error(error);
      });
  };

  return (
    <UserLayout>
      <div className="book_court_section">
        <div className="payment-wrapper">
          {loading ? (
            <div className="loader_outer">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="payment-card">
              {status == "success" ? (
                <>
                  <div className="success success_icon">✔</div>
                  <h2 className="title success">Payment Successful 🎉</h2>
                  <p className="message">
                    Thank you! Your payment has been processed successfully.
                  </p>
                  <button
                    className="btn success"
                    onClick={() => navigate("/user/bookings")}
                  >
                    Go to Dashboard
                  </button>
                </>
              ) : (
                <>
                  <div className="failed cancel_icon">✖</div>
                  <h2 className="title failed">Payment Failed</h2>
                  <p className="message">
                    Something went wrong. Please try again or contact support.
                  </p>
                  <button className="btn failed" onClick={() => navigate("/")}>
                    Try Again
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
