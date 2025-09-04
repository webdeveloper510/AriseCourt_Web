import React, { useEffect, useRef } from "react";

const steps = ["Choose Date", "Time Slot", "Select Court", "Checkout", "Payment"];

export default function Stepper({ step }) {
  const stepRefs = useRef([]); // store refs for each step

  useEffect(() => {
    if (stepRefs.current[step - 1]) {
      stepRefs.current[step - 1].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [step]);

  return (
    <div className="stepper">
      <ul>
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < step;
          const isActive = stepNumber === step;

          return (
            <li
              key={index}
              ref={(el) => (stepRefs.current[index] = el)} // assign ref
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
