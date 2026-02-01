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
  showTime = false, 
  errorMessage = {},
  min = "",
  max = "",
}) => {
  const finalError = errorMessage?.[name] || "";
  const isError = Boolean(finalError);

  const formatDate = (val) => {
    if (!val) return "";
    const date = new Date(val);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    onChange(name, e.target.value, e);
  };

  const inputType = showTime ? "time" : "date";

  return (
    <FormControl margin="dense" sx={{ width: "200px" }} error={isError}>
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
        value={formatDate(value)}
        onChange={handleChange}
        disabled={disabled}
        size={size}
        inputProps={{
          min: min,
          max: max,
        }}
      />

      {isError && (
        <FormHelperText sx={{ color: "red" }}>{finalError}</FormHelperText>
      )}
    </FormControl>
  );
};

export default DateTimePicker;
