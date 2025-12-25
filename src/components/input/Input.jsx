import React from "react";
import { FormControl, FormLabel, OutlinedInput } from "@mui/material";

const Input = ({
  label = "",
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
  name = "",
  disabled = false,
  required = false,
  className = "",
  size = "",
  width = "100%",
  errorMessage = {},
}) => {
  if (width === "sm") {
    width = "200px";
  } else if (width === "md") {
    width = "280px";
  } else if (width === "lg") {
    width = "350px";
  } else {
    width = "100%";
  }
  const finalError = errorMessage?.[name] || "";
  const isError = !!finalError;

  return (
    <FormControl
      error={isError}
      fullWidth={false}
      margin="dense"
      className={className}
    >
      {label && (
        <FormLabel
          sx={{ marginBottom: "4px", fontSize: "14px", color: "#333" }}
        >
          {label}
          {required && <span style={{ color: "red", marginLeft: 3 }}>*</span>}
        </FormLabel>
      )}

      <OutlinedInput
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        disabled={disabled}
        className={className}
        size={size}
        error={isError}
        onChange={(e) => onChange(name, e.target.value)}
        sx={{
          height: "37px",
          width: width,
          fontSize: "14px",
        }}
      />
      {isError && <FormHelperText>{finalError}</FormHelperText>}
    </FormControl>
  );
};

export default Input;
