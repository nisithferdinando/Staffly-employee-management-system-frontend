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
}) => {
  if (width === "sm") {
    width = "150px";
  } else if (width === "md") {
    width = "280px";
  } else if (width === "lg") {
    width === "350px";
  } else {
    width === "100%";
  }

  return (
    <FormControl fullWidth={false} margin="dense" className={className}>
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
        onChange={onChange}
        sx={{
          height: "36px",
          width: width,
          fontSize: "14px",
        }}
      />
    </FormControl>
  );
};

export default Input;
