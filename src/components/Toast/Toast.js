import React from "react";
import Toast from "react-bootstrap/Toast";

const CustomToast = ({show, setShow}) => {

  return (
    <Toast show={show} onClose={() => setShow(false)} autohide delay={3000}>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
  );
};

export default CustomToast;
