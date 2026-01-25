import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MUIButton,
} from "@mui/material";

const Modal = ({
  title,
  show = false,
  onClose = () => {},
  onSave = null,
  content = null,
  children,
  size = "md",           
  closeText = "Cancel",
  saveText = "Save",
  showFooter = true,
  disableBackdropClick = true,
  disableEscapeKeyDown = true,
}) => {
 
  const maxWidthMap = {
    sm: "sm",
    md: "md",
    lg: "lg",
  };

  return (
    <Dialog
      open={show}
      onClose={onClose}
      maxWidth={maxWidthMap[size] || "md"}
      fullWidth
      disableEscapeKeyDown={disableEscapeKeyDown}
      onBackdropClick={disableBackdropClick ? () => {} : onClose}
    >
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent dividers>
        {content ? (typeof content === "string" ? <p>{content}</p> : content) : children}
      </DialogContent>

      {showFooter && (
        <DialogActions>
          <MUIButton variant="outlined" onClick={onClose}>
            {closeText}
          </MUIButton>
          {onSave && (
            <MUIButton variant="contained" onClick={onSave}>
              {saveText}
            </MUIButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;