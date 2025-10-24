import React from "react";
import { Modal as ModalLayout, Button } from "react-bootstrap";

const Modal = ({
  title,
  show,
  onClose,
  onSave,
  content,
  children,
  size = "md",
  closeText = "Cancel",
  saveText = "Save",
  showFooter = true,
  backdrop = "static",
  keyboard = false,
}) => {
  return (
    <ModalLayout
      show={show}
      onHide={onClose}
      size={size}
      backdrop={backdrop}
      keyboard={keyboard}
      centered
    >
      {title && (
        <ModalLayout.Header closeButton>
          <ModalLayout.Title>{title}</ModalLayout.Title>
        </ModalLayout.Header>
      )}

      <ModalLayout.Body>
        {content ? (
          typeof content === "string" ? (
            <p>{content}</p>
          ) : (
            content
          )
        ) : (
          children
        )}
      </ModalLayout.Body>

      {showFooter && (
        <ModalLayout.Footer>
          <Button variant="secondary" onClick={onClose}>
            {closeText}
          </Button>
          {onSave && (
            <Button variant="primary" onClick={onSave}>
              {saveText}
            </Button>
          )}
        </ModalLayout.Footer>
      )}
    </ModalLayout>
  );
};

export default Modal;
