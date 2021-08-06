import { useState } from "react";
import "./style.scss";

const CustomCheckbox = ({onChange}) => {
  const [checked, setChecked] = useState(false);

  onChange = () => {
    setChecked(!checked);
  }

  return (
    <div
      className={`checkbox ${checked ? "checked" : ""}`}
      onClick={() => setChecked(!checked)}
    ></div>
  );
};
export default CustomCheckbox;
