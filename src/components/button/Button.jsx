import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";

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
    <BootstrapButton
      type={type}
      size={size}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      className={className}
      icon={icon}
    >
      {icon && <span className="me-2">{icon}</span>}
      {displayLabel}
    </BootstrapButton>
  );
};

export default Button;
