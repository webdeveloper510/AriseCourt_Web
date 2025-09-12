import React, { useState, useEffect } from "react";
import moment from "moment";

// Convert 12h AM/PM → 24h "HH:mm:ss"
export const to24Hour = (time) => {
  if (!time) return null;
  return moment(time, "hh:mm A").format("HH:mm:ss");
};

// Calculate end time: start (hh:mm A) + duration (hours)
export const calculateEndTime = (start, dur) => {
  if (!start || !dur) return "";
  return moment(start, "hh:mm A")
    .add(dur, "hours")
    .format("HH:mm:ss"); // backend format
};

// Convert backend "HH:mm:ss" → UI "hh:mm A"
export const endTimeFormat = (time) => {
  if (!time) return "";
  return moment(time, "HH:mm:ss").format("hh:mm A");
};

// Convert numeric duration → "HH:mm:ss"
export const formatDuration = (dur) => {
  if (!dur) return "00:00:00";
  const hours = Math.floor(dur);
  const minutes = Math.round((dur % 1) * 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:00`;
};


export default function TimeSlotStep({
  formData,
  updateFormData,
  onNext,
  onBack,
  setStep,
}) {
  const [duration, setDuration] = useState(1);
  const [startTime, setStartTime] = useState("");

  // Time slots (fixed every 30 mins)
  const timeSlots = [
    "12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM",
    "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM",
    "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM",
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
    "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM",
  ];



  const startTime24 = to24Hour(startTime);
  const endTime24 = calculateEndTime(startTime, duration);
  const durationTime = formatDuration(duration);

  // ✅ Restore data or set default slot
  useEffect(() => {
    if (formData?.start_time && formData?.duration_time) {
      // Convert saved time (HH:mm:ss) → dropdown format (hh:mm A)
      const displayStart = moment(formData.start_time, "HH:mm:ss").format(
        "hh:mm A"
      );
      setStartTime(displayStart);

      // Restore duration
      const [h, m] = formData.duration_time.split(":");
      const restoredDuration =
        parseInt(h, 10) + (parseInt(m, 10) > 0 ? 0.5 : 0);
      setDuration(restoredDuration);
    } else {
      // ✅ Set next nearest 30 min slot as default
      const now = moment();
      const rounded =
        now.minutes() < 30
          ? now.minutes(30).seconds(0)
          : now.add(1, "hour").minutes(0).seconds(0);
      const nextSlot = rounded.format("hh:mm A");
      setStartTime(nextSlot);
    }
  }, [formData]);

  // ✅ Save data on NEXT
  const handleNext = () => {
    updateFormData({
      start_time: startTime24,
      end_time: endTime24,
      duration_time: durationTime,
    });
    onNext();
  };

  // ✅ Disable past times if booking_date = today
  const isToday =
    formData?.booking_date === moment().format("YYYY-MM-DD");

  const startTimes = timeSlots;

  // ✅ Max duration (not past midnight)
  const maxDuration = (() => {
    const start = moment(startTime, "hh:mm A");
    const endOfDay = moment("23:59", "HH:mm");
    const diffMinutes = endOfDay.diff(start, "minutes") + 1;
    return diffMinutes / 60;
  })();

  return (
    <div className="timeslot-container">
      {/* Selected Date */}
      <div className="my-3">
        <span onClick={() => setStep(1)} className="selected_date_month">
          {formData?.booking_date} <i className="bi bi-caret-down-fill"></i>
        </span>
      </div>

      {/* Start Time */}
      <div className="time-row">
        <label>Start Time</label>
        <div className="time-input">
          <select
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              setDuration(1);
            }}
          >
            {startTimes?.map((t, i) => {
              const slotTime = moment(t, "hh:mm A");

              let disabled = false;

              if (isToday) {
                // Round up to next 30-min slot
                const now = moment();
                const minAllowedTime =
                  now.minutes() < 30
                    ? now.minutes(30).seconds(0)
                    : now.add(1, "hour").minutes(0).seconds(0);

                disabled = slotTime.isBefore(
                  moment(minAllowedTime.format("hh:mm A"), "hh:mm A")
                );
              }

              return (
                <option key={i} value={t} disabled={disabled}>
                  {t}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Duration */}
      <div className="time-row">
        <label className="duration_text">Duration</label>
        <div className="duration-input">
          <button
            disabled={duration <= 1}
            onClick={() => setDuration(Math.max(1, duration - 0.5))}
          >
            −
          </button>
          <span className="duration_time">
            {duration % 1 === 0
              ? `${duration} hr`
              : `${Math.floor(duration)} hr 30 min`}
          </span>
          <button
            disabled={duration >= maxDuration}
            onClick={() => setDuration(Math.min(maxDuration, duration + 0.5))}
          >
            +
          </button>
        </div>
      </div>

      {/* End Time */}
      <div className="time-row">
        <label>End Time</label>
        <div className="time-input">
          <span className="end_time">
            {endTime24 ? endTimeFormat(endTime24) : ""}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-row">
        <button className="prev-btn" onClick={onBack}>
          PREVIOUS
        </button>
        <button className="next-btn" onClick={handleNext}>
          NEXT
        </button>
      </div>
    </div>
  );
}
