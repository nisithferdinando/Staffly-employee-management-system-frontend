import React from "react";
import { Button } from "react-bootstrap";

const Button = ({
  isEdit = false,
  label = "Submit",
  onClick = () => {},
  disabled = false,
  size = "md",
  variant = "primary",
  className = "",
  icon = null,
  type = "button",
}) => {
  const displayLabel = isEdit ? "Update" : label;
  return (
    <Button
      type={type}
      size={size}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {icon && <span className="me-2">{icon}</span>}
      {displayLabel}
    </Button>
  );
};

export default Button;
