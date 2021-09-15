import React from "react";
import Toast from "react-bootstrap/Toast";

const CustomToast = ({show, setShow, message}) => {

  return (
    <Toast show={show} onClose={() => setShow(false)} autohide delay={3000}>
      <Toast.Body>Message {message}</Toast.Body>
    </Toast>
  );
};

export default CustomToast;
