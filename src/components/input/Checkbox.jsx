import React from "react";
import { Form } from "react-bootstrap";

const Checkbox = ({
  label,
  name,
  options = [],
  values = [],
  onChange = () => {},
  required = false,
  disabled = false,
  inline = true,
}) => {
  const handleChange = (e) => {
    const { value, checked } = e.target;

    let updatedValues = [...values];
    if (checked) {
      updatedValues.push(value);
    } else {
      updatedValues = updatedValues.filter((v) => v !== value);
    }

    onChange(name, updatedValues, e);
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
            type="checkbox"
            label={opt.label}
            name={name}
            value={opt.value}
            checked={values.includes(opt.value)}
            onChange={handleChange}
            disabled={disabled || opt.disabled}
          />
        ))}
      </div>
    </Form.Group>
  );
};

export default Checkbox;
