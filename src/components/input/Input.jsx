import React from "react";
import { Form } from "react-bootstrap";

const Input = ({
  label,
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
  name,
  disabled = false,
  size,
  required = false,
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
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        size={size}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value, e)}
      />
    </Form.Group>
  );
};

export default Input;
