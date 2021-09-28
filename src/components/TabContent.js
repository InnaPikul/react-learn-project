import React, { useContext } from "react";
import { ToastContext } from "../NotificationProvider";
import ChangeColorBtn from "./ChangeColorBtn";

const TabContent = (props) => {
  const { actions } = useContext(ToastContext);

  const style = {
    background: props.backgroundColor,
  };
  return (
    <div className={`tab tab-content p-4`} style={style}>
      <p>Lorem ipsum {props.backgroundColor}</p>
      <div className="mb-4">
        <ChangeColorBtn
          handleColorSwitch={props.onChange}
          color={props.backgroundColor}
        />
        <button
          className="btn btn-secondary"
          onClick={() =>
            actions.onShowToast({
              messageType: "danger",
              messageBody: "Tabs message",
            })
          }
        >
          Show toast
        </button>
      </div>
    </div>
  );
};

export default TabContent;
