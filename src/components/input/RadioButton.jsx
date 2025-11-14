import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio as MUIRadio,
} from "@mui/material";

const RadioButton = ({
  label = "",
  name = "",
  options = [],
  value = "",
  onChange = () => {},
  required = false,
  disabled = false,
  inline = true, 
  size = "medium",
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.value, e);
  };

  return (
    <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
      {label && (
        <FormLabel component="legend" sx={{ fontSize: 14, color: "#333" }}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </FormLabel>
      )}

      <RadioGroup
        row={inline}
        name={name}
        value={value}
        onChange={handleChange}
        sx={{ gap: 2 }}
      >
        {options.map((opt, idx) => (
          <FormControlLabel
            key={idx}
            value={opt.value}
            control={<MUIRadio size={size} disabled={disabled || opt.disabled} />}
            label={opt.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButton;
