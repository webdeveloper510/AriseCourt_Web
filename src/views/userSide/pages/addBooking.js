import React, { useState } from "react";
import Stepper from "../../../components/MultiForm/stepper";
import CalendarStep from "../../../components/MultiForm/Steps/CalendarStep";
import TimeSlotStep from "../../../components/MultiForm/Steps/TimeSlotStep";
import CourtSelectionStep from "../../../components/MultiForm/Steps/CourtSelectionStep";
import CheckoutStep from "../../../components/MultiForm/Steps/CheckoutStep";
import UserLayout from "../../../components/UserLayout";
import PaymentStep from "../../../components/MultiForm/Steps/PaymentStep";

export default function BookCourt() {
  const [step, setStep] = useState(1);

  const locationId = localStorage.getItem("selectedLocationId");

  const [formData, setFormData] = useState({
    booking_date: "",
    start_time: "",
    end_time: "",
    duration_time: "",
    court_id: null,
    location: locationId,
    book_for_four_weeks: "False",
    total_price: "",
    on_amount: "",
  });
  const [bookingDetails, setBookingDetails] = useState(null);

  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const handleNext = () => {
    console.log("Step:", step, "Form Data:", formData);

    if (step === 4) {
      console.log("📌 Final Checkout Data:", formData);
    }

    if (step < 5) setStep(step + 1);
  };

  // ✅ handle previous button
  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <UserLayout>
      <div className="book_court_section">
        <div className="container">
          <h3 className="book_court_title">Book Court</h3>
          <div className="multi-step-container mt-4">
            <Stepper step={step} />
            <div className="step-content">
              {step === 1 && (
                <CalendarStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  setStep={setStep}
                />
              )}
              {step === 2 && (
                <TimeSlotStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onBack={handlePrev}
                  setStep={setStep}
                />
              )}
              {step === 3 && (
                <CourtSelectionStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onBack={handlePrev}
                  setStep={setStep}
                  bookingDetails={bookingDetails}
                  setBookingDetails={setBookingDetails}
                  setFormData={setFormData}
                />
              )}
              {step === 4 && (
                <CheckoutStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onBack={handlePrev}
                  bookingDetails={bookingDetails}
                />
              )}
              {step === 5 && (
                <PaymentStep
                  formData={formData}
                  updateFormData={updateFormData}
                  onBack={handlePrev}
                  bookingDetails={bookingDetails}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
