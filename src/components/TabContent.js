import React, { useState } from "react";
import ChangeColorBtn from "./ChangeColorBtn";
import CustomToast from "../components/Toast/Toast";

const TabContent = (props) => {
  const [show, setShow] = useState(false);

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
        <button className="btn btn-secondary" onClick={() => setShow(true)}>
          Show message
        </button>
      </div>
      <CustomToast show={show} setShow={setShow} />
    </div>
  );
};

export default TabContent;
