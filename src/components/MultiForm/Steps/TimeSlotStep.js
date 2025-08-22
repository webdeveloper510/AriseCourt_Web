import React, { useState } from "react";
import dayjs from "dayjs";

export default function TimeSlotStep({ formData, updateFormData, onNext, onBack,setStep }) {

  const [duration, setDuration] = useState(1);
  const [startTime, setStartTime] = useState("06:30 AM");


  const timeOptions = [
    "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM",
    "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM",
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
    "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
    "09:00 PM", "09:30 PM", "10:00 PM"
  ];

  const to24Hour = (time) => {
    return dayjs(`2023-01-01 ${time}`, "YYYY-MM-DD hh:mm A").format("HH:mm:ss");
  };
  
  const calculateEndTime = (start, dur) => {
    return dayjs(`2023-01-01 ${start}`, "YYYY-MM-DD hh:mm A")
      .add(dur, "hour")
      .format("HH:mm:ss");
  };

  const durationTime = `${String(duration).padStart(2, "0")}:00:00`;

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
      {/* Month Selector */}
      <div className="my-3">
        <span onClick={()=>setStep(1)} className="selected_date_month">{formData?.booking_date} <i className="bi bi-caret-down-fill"></i></span>
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
          <button onClick={() => setDuration(Math.max(1, duration - 1))}>−</button>
          <span>{duration} hr</span>
          <button onClick={() => setDuration(duration + 1)}>+</button>
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
