import React from "react";
import { Modal, Button } from "react-bootstrap";

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
    <Modal
      show={show}
      onHide={onClose}
      size={size}
      backdrop={backdrop}
      keyboard={keyboard}
      centered
    >
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body>
        {content ? (
          typeof content === "string" ? (
            <p>{content}</p>
          ) : (
            content
          )
        ) : (
          children
        )}
      </Modal.Body>

      {showFooter && (
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            {closeText}
          </Button>
          {onSave && (
            <Button variant="primary" onClick={onSave}>
              {saveText}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default Modal;
