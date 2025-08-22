import React, { useEffect, useState } from "react";
import {
  addCourtBookings,
  getBookedCourtAvailability,
} from "../../../utils/api";
import { toast } from "react-toastify";

export default function CourtSelectionStep({
  formData,
  onNext,
  onBack,
  setStep,
  setBookingDetails,
  setFormData,
}) {
  const [selectedCourt, setSelectedCourt] = useState(
    formData?.court_id || null
  );

  console.log("selectedCourt", selectedCourt);
  const [courtData, setCourtData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedPrice, setSelectedPrice] = useState(null);

  const timeToHours = (timeString) => {
    if (!timeString) return 0;
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours + minutes / 60 + seconds / 3600;
  };

  const durationInHours = timeToHours(formData?.duration_time);

  useEffect(() => {
    getAllCourtData();
  }, []);

  const getAllCourtData = () => {
    setLoading(true);
    getBookedCourtAvailability({
      location_id: formData?.location,
      date: formData?.booking_date,
      start_time: formData?.start_time,
      end_time: formData?.end_time,
      book_for_four_weeks: formData?.book_for_four_weeks,
    })
      .then((res) => {
        setLoading(false);
        if (res?.status === 200) {
          setCourtData(res?.data?.courts || []);
        } else {
          setCourtData([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleNext = () => {
    setLoading(true);
    addCourtBookings({
      ...formData,
      total_price: formData?.book_for_four_weeks == "True"
        ? `${durationInHours * Number(formData?.total_price) * 4}`
        : formData?.total_price,
      on_amount: formData?.total_price,
    })
      .then((res) => {
        setLoading(false);
        if (res?.data?.status_code == 200 || res?.data?.status_code == 201) {
          // toast.success(res?.data?.message, { theme: "colored" });
          setBookingDetails(res?.data?.data?.[0]);
          onNext();
        } else {
          toast.error(res?.data?.message, { theme: "colored" });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="court-container">
      {/* Loader */}
      {loading && (
        <div className="loader_outer">
          <span className="loader"></span>
        </div>
      )}

      {/* Selected Date */}
      <div className="my-3">
        <span onClick={() => setStep(1)} className="selected_date_month">
          {formData?.booking_date} <i className="bi bi-caret-down-fill"></i>
        </span>
      </div>

      {/* Court Grid */}
      <div className="court-grid">
        {courtData?.length > 0 &&
          courtData?.map((court, i) => (
            <button
              key={i}
              disabled={court?.is_booked}
              className={`court-box 
                ${selectedCourt === court?.court_id ? "selected" : ""} 
                ${court?.is_booked ? "disabled" : ""}`}
              onClick={() => {
                setSelectedCourt(court?.court_id);
                setSelectedPrice(Number(court?.court_fee_hrs));
                setFormData((prev) => ({
                  ...prev,
                  court_id: court?.court_id,
                  total_price:
                    formData?.book_for_four_weeks === "True"
                      ? `${durationInHours * Number(court?.court_fee_hrs) * 4}`
                      : court?.court_fee_hrs,
                  on_amount: court?.court_fee_hrs,
                }));
              }}
            >
              Court <br /> <span>{court?.court_number}</span>
            </button>
          ))}
      </div>

      {/* ✅ Book for 4 Weeks Checkbox */}
      <div className="my-4">
        <label>
          <input
            type="checkbox"
            checked={formData?.book_for_four_weeks === "True"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                book_for_four_weeks: e.target.checked ? "True" : "False",
              }))
            }
          />{" "}
          Book this time slot every week for 4 weeks
        </label>
      </div>

      {/* Buttons */}
      <div className="button-row">
        <button className="prev-btn" onClick={onBack}>
          PREVIOUS
        </button>
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={!selectedCourt}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
