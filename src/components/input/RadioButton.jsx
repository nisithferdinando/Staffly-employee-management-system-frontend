import React from "react";
import { Form } from "react-bootstrap";

const RadioButton = ({
  label,
  name,
  options = [],
  value = "",
  onChange = () => {},
  required = false,
  disabled = false,
  inline = true,
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.value, e);
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

      <div>
        {options.map((opt, idx) => (
          <Form.Check
            key={idx}
            inline={inline}
            type="radio"
            label={opt.label}
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={handleChange}
            disabled={disabled || opt.disabled}
          />
        ))}
      </div>
    </Form.Group>
  );
};

export default RadioButton;
