import React from "react";
import { Form } from "react-bootstrap";

const Dropdown = ({
  label,
  options = [],
  value = "",
  onChange = () => {},
  name,
  disabled = false,
  size,
  required = false,
  placeholder = "-- Select --",
}) => {
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

      <Form.Select
        size={size}
        value={value}
        name={name}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value, e)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default Dropdown;
