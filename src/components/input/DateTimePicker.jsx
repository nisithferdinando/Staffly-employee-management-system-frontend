import React from "react";
import { Form } from "react-bootstrap";

const DateTimePicker = ({
  label,
  name,
  value = "",
  onChange = () => {},
  disabled = false,
  required = false,
  size,
  placeholder = "-- Select Date & Time --",
  showTime = true,
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(name, newValue, e);
  };

  return (
    <Form.Group className="mb-3">
      {label && (
        <Form.Label>
          {label}{" "}
          {required && (
            <span style={{ color: "red", fontWeight: "bold" }}>*</span>
          )}
        </Form.Label>
      )}

      <Form.Control
        type={showTime ? "datetime-local" : "date"}
        name={name}
        value={value || ""}
        size={size}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
    </Form.Group>
  );
};

export default DateTimePicker;
