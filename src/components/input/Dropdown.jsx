import React from "react";
import { Form } from "react-bootstrap";

const Dropdown = ({
  label = "",
  options = [],
  value,
  onChange = () => {},
  name = "",
  disabled = false,
  size,
  required = false,
  placeholder = "Select",
}) => {
  const handleFocus = (e) => {
    e.target.style.borderColor = "#555";
    e.target.style.boxShadow = "0 0 2px rgba(0,0,0,0.1)";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "#999";
    e.target.style.boxShadow = "none";
  };

  return (
    <Form.Group className="mb-3">
      {label && (
        <Form.Label
          style={{
            display: "block",
            marginBottom: "4px",
            fontSize: "16px",
            color: "#333",
          }}
        >
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
        onChange={(e) => onChange(name, e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          border: "2px solid grey",
          borderRadius: "4px",
          padding: "5px 8px",
          fontSize: "15px",
          outline: "none",
          width: "180px",
        }}
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
