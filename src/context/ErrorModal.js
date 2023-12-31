import React from "react";
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({ message, onClose }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ошибка!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      
    </Modal>
  );
};

export default ErrorModal;