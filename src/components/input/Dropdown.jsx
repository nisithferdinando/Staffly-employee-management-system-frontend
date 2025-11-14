import React from "react";
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";

const Dropdown = ({
  label = "",
  options = [],
  value = "",
  onChange = () => {},
  name = "",
  disabled = false,
  required = false,
  placeholder = "Select",
  className = "",
}) => {
  return (
    <FormControl
      fullWidth={false}
      margin="dense"
      className={className}
      sx={{ width: "180px" }}  
      size="small"            
    >
      {label && (
        <FormLabel
          sx={{
            marginBottom: "4px",
            fontSize: "14px",
            color: "#333",
            display: "block",
            fontStyle: "normal", 
          }}
        >
          {label}
          {required && (
            <span style={{ color: "red", marginLeft: 3 }}>*</span>
          )}
        </FormLabel>
      )}

      <Select
        value={value}
        name={name}
        disabled={disabled}
        onChange={(e) => onChange(name, e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": label }}
        sx={{
          height: "36px",     
          fontSize: "14px",
        }}
      >
      
        <MenuItem value="" sx={{ color: "#777", fontStyle: "normal" }}>
          {placeholder}
        </MenuItem>

        {options.map((opt, idx) => (
          <MenuItem key={idx} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
