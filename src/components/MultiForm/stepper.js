import React from "react";

const steps = ["Choose Date", "Time Slot", "Select Court", "Checkout", "Payment"];

export default function Stepper({ step }) {
  return (
    <div className="stepper">
      <ul>
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < step; // past steps
          const isActive = stepNumber === step; // current step

          return (
            <li
              key={index}
              className={isActive ? "active" : isCompleted ? "completed" : ""}
            >
              <div className={`circle ${isCompleted ? "completed-circle" : ""}`}>
                {isCompleted ? "✓" : stepNumber}
              </div>
              <span className="step_form_name">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
