import React, { useState } from "react";
import dayjs from "dayjs";

export default function TimeSlotStep({ formData, updateFormData, onNext, onBack, setStep }) {
  const [duration, setDuration] = useState(1); // store in hours (can be decimal like 1.5)
  const [startTime, setStartTime] = useState("06:30 AM");

  // ✅ Generate all 30-min slots for 24 hrs
  const generateTimeOptions = () => {
    const times = [];
    const start = dayjs("2023-01-01 00:00", "YYYY-MM-DD HH:mm");
    for (let i = 0; i < 48; i++) {
      times.push(start.add(i * 30, "minute").format("hh:mm A"));
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  // Convert to 24hr format
  const to24Hour = (time) => {
    return dayjs(`2023-01-01 ${time}`, "YYYY-MM-DD hh:mm A").format("HH:mm:ss");
  };

  // Calculate end time based on duration
  const calculateEndTime = (start, dur) => {
    return dayjs(`2023-01-01 ${start}`, "YYYY-MM-DD hh:mm A")
      .add(dur * 60, "minute") // multiply hours by 60 minutes
      .format("HH:mm:ss");
  };

  // Convert duration (decimal) to HH:mm:ss
  const durationTime = (() => {
    const hours = Math.floor(duration);
    const minutes = (duration % 1) * 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  })();

  const startTime24 = to24Hour(startTime);
  const endTime24 = calculateEndTime(startTime, duration);

  const handleNext = () => {
    updateFormData({
      start_time: startTime24,
      end_time: endTime24,
      duration_time: durationTime,
    });
    onNext();
  };

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
            onChange={(e) => setStartTime(e.target.value)}
          >
            {timeOptions.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Duration */}
      <div className="time-row">
        <label className="duration_text">Duration</label>
        <div className="duration-input">
          <button disabled={duration == 1} onClick={() => setDuration(Math.max(0.5, duration - 0.5))}>
            −
          </button>
          <span className="duration_time">
            {duration % 1 === 0 ? `${duration} hr` : `${Math.floor(duration)} hr 30 min`}
          </span>
          <button onClick={() => setDuration(duration + 0.5)}>+</button>
        </div>
      </div>

      {/* End Time */}
      <div className="time-row">
        <label>End Time</label>
        <div className="time-input">
          <span>{endTime24}</span>
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
