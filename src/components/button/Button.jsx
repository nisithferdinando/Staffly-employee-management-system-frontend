import React from "react";
import { Button as MUIButton } from "@mui/material";

const Button = ({
  isEdit = false,
  label = "Submit",
  onClick = () => {},
  disabled = false,
  size = "medium",        
  variant = "contained",   
  className = "",
  icon = null,
  type = "button",
  color = "primary",       
}) => {
  const displayLabel = isEdit ? "Update" : label;

  return (
    <MUIButton
      type={type}
      size={size}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      className={className}
      color={color}
      startIcon={icon || null} 
    >
      {displayLabel}
    </MUIButton>
  );
};

export default Button;
