import React from "react";
import { Form } from "react-bootstrap";

const Input = ({
  label = "",
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
  name = "",
  disabled = false,
  size = "md",
  required = false,
  className = "",
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
    <Form.Group className={`mb-3 ${className}`} controlId={name}>
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

      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        disabled={disabled}
        size={size}
        onChange={(e) => onChange(name, e.target.value, e)}
        style={{
          border: "2px solid grey",
          borderRadius: "4px",
          padding: "5px 8px",
          fontSize: "15px",
          outline: "none",
          width: "180px",
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Form.Group>
  );
};

export default Input;
