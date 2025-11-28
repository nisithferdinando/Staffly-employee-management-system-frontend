import React from "react";
import { TextField, FormControl, FormLabel, FormHelperText } from "@mui/material";

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
  errorMessage = {},
}) => {
  const finalError = errorMessage?.[name] || "";
  const isError = Boolean(finalError);

  const handleChange = (e) => {
    onChange(name, e.target.value, e);
  };

  return (
    <FormControl margin="dense" sx={{ width: "180px" }}>
      {label && (
        <FormLabel
          component="legend"
          sx={{ fontSize: 14, color: "#333", marginBottom: "4px" }}
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
        error={isError}
        InputLabelProps={{
          shrink: false,
        }}
      />
      {isError && <FormHelperText>{finalError}</FormHelperText>}
    </FormControl>
  );
};

export default DateTimePicker;
