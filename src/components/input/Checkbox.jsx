import React from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox as MUICheckbox,
} from "@mui/material";

const Checkbox = ({
  label = "",
  name = "",
  options = [],
  values = [],
  onChange = () => {},
  required = false,
  disabled = false,
  inline = true,
  size = "medium", 
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
    <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
      {label && (
        <FormLabel component="legend" sx={{ fontSize: 14, color: "#333" }}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </FormLabel>
      )}

      <FormGroup row={inline} sx={{ gap: 2 }}> 
        {options.map((opt, idx) => (
          <FormControlLabel
            key={idx}
            control={
              <MUICheckbox
                name={name}
                value={opt.value}
                checked={values.includes(opt.value)}
                onChange={handleChange}
                disabled={disabled || opt.disabled}
                size={size} 
              />
            }
            label={opt.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default Checkbox;
