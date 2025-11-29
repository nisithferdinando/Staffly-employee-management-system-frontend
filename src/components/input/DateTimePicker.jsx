import React from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";

const DateTimePicker = ({
  label = "",
  name = "",
  value = "",
  onChange = () => {},
  disabled = false,
  required = false,
  size = "small",
  placeholder = "",
  showTime = false, // true = time, false = date
  errorMessage = {},
}) => {
 
  const finalError = errorMessage?.[name] || "";
  const isError = Boolean(finalError);

  const handleChange = (e) => {
    onChange(name, e.target.value, e);
  };

  // Only date OR time
  const inputType = showTime ? "time" : "date";

  return (
    <FormControl margin="dense" sx={{ width: "180px" }} error={isError}>
      {label && (
        <FormLabel
          component="legend"
          sx={{ fontSize: 14, color: "#333", marginBottom: "4px" }}
        
        >
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </FormLabel>
      )}

      <TextField
        type={inputType}
        name={name}
        value={value || ""}
        onChange={handleChange}
        disabled={disabled}
        size={size}
      />

      {isError && (
        <FormHelperText sx={{ color: "red" }}>{finalError}</FormHelperText>
      )}
    </FormControl>
  );
};

export default DateTimePicker;
