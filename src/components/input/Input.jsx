import React from "react";
import {
  FormControl,
  FormLabel,
  OutlinedInput,
} from "@mui/material";

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
  size=""
}) => {
  return (
    <FormControl fullWidth={false} margin="dense" className={className}>
      {label && (
        <FormLabel
          sx={{ marginBottom: "4px", fontSize: "14px", color: "#333" }}
        >
          {label}
          {required && (
            <span style={{ color: "red", marginLeft: 3 }}>*</span>
          )}
        </FormLabel>
      )}

      <OutlinedInput
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        disabled={disabled}
        size={size}
        onChange={(e) => onChange(name, e.target.value, e)}
        sx={{
          height: "36px",     
          fontSize: "14px",
        }}
      />
    </FormControl>
  );
};

export default Input;
