import React, { useContext } from "react";
import CustomToast from "../Toast/Toast";
import { ToastContext } from "../../NotificationProvider";

const NotificationFactory = () => {
  const {state, actions} = useContext(ToastContext);
  const { messageType, messageBody, delay, showMessage } = state;

  return (
    <>
      <div className="container">
        <CustomToast
          show={showMessage}
          closeToast={() => actions.onHideToast()}
          type={messageType}
          message={messageBody || "Empty"}
          delay={delay}
        />
      </div>
    </>
  );
};

export default NotificationFactory;
