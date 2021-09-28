import React from "react";
import Toast from "react-bootstrap/Toast";

const CustomToast = ({ show, closeToast, message, type, delay }) => {
  return (
    <Toast
      bg={type}
      show={show}
      onClose={closeToast}
      autohide
      delay={delay || 6000}
    >
      <Toast.Body className={type}>{message}</Toast.Body>
    </Toast>
  );
};

export default CustomToast;
