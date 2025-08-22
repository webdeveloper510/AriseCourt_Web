import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { paymentSuccess } from "../../../utils/api";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <UserLayout>
      <div className="book_court_section">
        <div className="payment-wrapper">
          <div className="payment-card">
            <div className="failed cancel_icon">✖</div>
            <h2 className="title failed">Payment Failed</h2>
            <p className="message">
              Something went wrong. Please try again or contact support.
            </p>
            <button
              className="btn failed"
              onClick={() => navigate("/")}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
