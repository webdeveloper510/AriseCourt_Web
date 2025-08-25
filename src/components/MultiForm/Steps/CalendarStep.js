import React, { useState } from "react";
import dayjs from "dayjs";

export default function CalendarStep({ formData, updateFormData, onNext }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(
    formData.booking_date || null
  );

  const daysInMonth = currentMonth.daysInMonth();
  const startDay = currentMonth.startOf("month").day();

  const daysArray = [];
  for (let i = 0; i < startDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  // ✅ Month change
  const handleMonthChange = (e) => {
    const newMonth = dayjs()
      .month(parseInt(e.target.value))
      .year(currentMonth.year());
    setCurrentMonth(newMonth);
  };

  // ✅ Select date
  const handleDateSelect = (day) => {
    const date = currentMonth.date(day).format("YYYY-MM-DD"); // store in yyyy-mm-dd
    setSelectedDate(date);
  };

  const handleNext = () => {
    if (selectedDate) {
      updateFormData({ booking_date: selectedDate });
      onNext();
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <select value={currentMonth.month()} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {dayjs().month(i).format("MMMM")}, {currentMonth.year()}
            </option>
          ))}
        </select>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div className="day-name" key={d}>
            {d}
          </div>
        ))}
        {daysArray?.map((day, idx) => {
          let fullDate = null;
          let displayDay = null;
          let isPrevMonth = false;

          if (day) {
            // Current month day
            fullDate = currentMonth.date(day).format("YYYY-MM-DD");
            displayDay = day;
          } else {
            // Fill with previous month's date
            const prevMonth = currentMonth.clone().subtract(1, "month");
            const prevMonthDays = prevMonth.daysInMonth();

            const firstDayIndex = currentMonth.startOf("month").day();
            const prevDay = prevMonthDays - (firstDayIndex - idx - 1);

            fullDate = prevMonth.date(prevDay).format("YYYY-MM-DD");
            displayDay = prevDay;
            isPrevMonth = true;
          }

          const isPastDate =
            fullDate && dayjs(fullDate).isBefore(dayjs().startOf("day"));
          const isFutureDate =
            fullDate && dayjs(fullDate).isAfter(dayjs().endOf("day"));

          return (
            <div
              key={idx}
              className={`day-cell 
        ${selectedDate === fullDate ? "selected" : ""} 
        ${isPastDate ? "disabled" : ""} 
        ${isPrevMonth ? "prev-month" : ""} 
        ${isFutureDate ? "future" : ""}`}
              onClick={() => day && !isPastDate && handleDateSelect(day)}
              style={{
                pointerEvents: isPastDate ? "none" : "auto",
              }}
            >
              {displayDay}
            </div>
          );
        })}
      </div>

      <div className="calendar-footer">
        <button
          className="next-btn"
          disabled={!selectedDate}
          onClick={handleNext}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
