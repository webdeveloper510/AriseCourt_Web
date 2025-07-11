import React from "react";
import { CCol, CFormSelect } from "@coreui/react";

const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);

const minutes = ["00", "30"];

export default function TimePickerSelect({
  label,
  name,
  value,
  onChange,
  error,
}) {
  const [hour, minute] = value ? value.split(":") : ["", ""];

  const handleHourChange = (e) => {
    onChange({
      target: {
        name,
        value: `${e.target.value}:${minute || "00"}`,
      },
    });
  };

  const handleMinuteChange = (e) => {
    onChange({
      target: {
        name,
        value: `${hour || "00"}:${e.target.value}`,
      },
    });
  };

  return (
    <CCol sm={12} md={6} lg={6} className="my-1">
      <label className="add_court_label">{label}</label>
      <div className="d-flex gap-2">
        <CFormSelect
          className="register_input"
          value={hour}
          onChange={handleHourChange}
        >
          <option value="" disabled>HH</option>
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </CFormSelect>

        <CFormSelect
          className="register_input"
          value={minute}
          onChange={handleMinuteChange}
        >
          <option value="" disabled>MM</option>
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </CFormSelect>
      </div>
      {error && <div className="text-danger">{error}</div>}
    </CCol>
  );
}
