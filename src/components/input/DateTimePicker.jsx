import React from "react";
import { TextField, FormControl, FormLabel } from "@mui/material";

const DateTimePicker = ({
  label = "",
  name = "",
  value = "",
  onChange = () => {},
  disabled = false,
  required = false,
  size = "small", 
  placeholder = "-- Select Date & Time --",
  showTime = true,
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.value, e);
  };

  return (
    <FormControl sx={{ marginBottom: 2, width: "180px" }}>
      {label && (
        <FormLabel
          component="legend"
          sx={{ fontSize: 14, color: "#333", marginBottom: 0.5 }}
        >
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </FormLabel>
      )}

      <TextField
        type={showTime ? "datetime-local" : "date"}
        name={name}
        value={value || ""}
        onChange={handleChange}
        disabled={disabled}
        size={size}
        placeholder={placeholder}
        InputLabelProps={{
          shrink: false, 
        }}
      />
    </FormControl>
  );
};

export default DateTimePicker;
