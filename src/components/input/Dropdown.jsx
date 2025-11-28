import React from "react";
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
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
  errorMessage = {},
}) => {
  const finalError = errorMessage?.[name] || "";
  const isError = Boolean(finalError);

  const mappedOptions = options.map((opt) => ({
    value: opt.value ?? opt.id ?? opt.key,
    label: opt.valueName ?? opt.name ?? opt.label ?? opt.value,
  }));
  return (
    <FormControl
      fullWidth={false}
      margin="dense"
      className={className}
      sx={{ width: "200px" }}
      size="small"
      error={isError}
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
          {required && <span style={{ color: "red", marginLeft: 3 }}>*</span>}
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
          height: "37px",
          fontSize: "14px",
        }}
      >
        <MenuItem value="" sx={{ color: "#777", fontStyle: "normal" }}>
          {placeholder}
        </MenuItem>

        {mappedOptions.map((opt, idx) => (
          <MenuItem key={idx} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {isError && <FormHelperText>{finalError}</FormHelperText>}
    </FormControl>
  );
};

export default Dropdown;
