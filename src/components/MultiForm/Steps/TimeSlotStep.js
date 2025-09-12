import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const TIME_ZONE = "America/Chicago";

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
    "12:00 AM",
    "12:30 AM",
    "01:00 AM",
    "01:30 AM",
    "02:00 AM",
    "02:30 AM",
    "03:00 AM",
    "03:30 AM",
    "04:00 AM",
    "04:30 AM",
    "05:00 AM",
    "05:30 AM",
    "06:00 AM",
    "06:30 AM",
    "07:00 AM",
    "07:30 AM",
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
    "09:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
  ];

  // ✅ Convert to 24hr
  const to24Hour = (time) =>
    dayjs(`2023-01-01 ${time}`, "YYYY-MM-DD hh:mm A").format("HH:mm:ss");

  // ✅ Calculate end time
  const calculateEndTime = (start, dur) =>
    dayjs(`2023-01-01 ${start}`, "YYYY-MM-DD hh:mm A")
      .add(dur * 60, "minute")
      .format("HH:mm:ss");

  // ✅ Format duration
  const formatDuration = (dur) => {
    const hours = Math.floor(dur);
    const minutes = (dur % 1) * 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:00`;
  };

  const startTime24 = to24Hour(startTime);
  const endTime24 = calculateEndTime(startTime, duration);
  const durationTime = formatDuration(duration);

  // ✅ Restore data or set default slot
  useEffect(() => {
    if (formData?.start_time && formData?.duration_time) {
      // Convert saved time back to dropdown format
      const displayStart = dayjs(
        `2023-01-01 ${formData.start_time}`,
        "YYYY-MM-DD HH:mm:ss"
      ).format("hh:mm A");
      setStartTime(displayStart);

      // Restore duration
      const [h, m] = formData.duration_time.split(":");
      const restoredDuration =
        parseInt(h, 10) + (parseInt(m, 10) > 0 ? 0.5 : 0);
      setDuration(restoredDuration);
    } else {
      // ✅ Set next nearest 30 min slot as default
      const now = dayjs();
      const rounded =
        now.minute() < 30
          ? now.minute(30).second(0)
          : now.add(1, "hour").minute(0).second(0);
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

  // ✅ Format end time
  const endTimeFormate = (time) => {
    const [hours, minutes, seconds] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ✅ Disable past times if booking_date = today
  const isToday = formData?.booking_date === dayjs().format("YYYY-MM-DD");
  const minAllowedTime = isToday
    ? dayjs().minute() < 30
      ? dayjs().minute(30).second(0)
      : dayjs().add(1, "hour").minute(0).second(0)
    : null;

  const startTimes = timeSlots;

  // ✅ Max duration (not past midnight)
  const maxDuration = (() => {
    const start = dayjs(`2023-01-01 ${startTime}`, "YYYY-MM-DD hh:mm A");
    const endOfDay = dayjs("2023-01-01 23:59", "YYYY-MM-DD HH:mm");
    const diffMinutes = endOfDay.diff(start, "minute") + 1;
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
              const slotTime = dayjs(`2023-01-01 ${t}`, "YYYY-MM-DD hh:mm A");

              let disabled = false;

              if (isToday) {
                // Get current time from user’s system (where browser runs)
                const now = dayjs();

                // Round up to next 30-min slot
                const minAllowedTime =
                  now.minute() < 30
                    ? now.minute(30).second(0)
                    : now.add(1, "hour").minute(0).second(0);

                // Convert both to same base date for comparison
                const cutoff = dayjs(
                  `2023-01-01 ${minAllowedTime.format("hh:mm A")}`,
                  "YYYY-MM-DD hh:mm A"
                );

                disabled = slotTime.isBefore(cutoff);
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
            {endTime24 ? endTimeFormate(endTime24) : ""}
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
