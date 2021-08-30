import { useState } from "react";
import "./style.scss";

const CustomCheckbox = ({ setSelected, selected, }) => {
  const [checkedInitial, setCheckedInitial] = useState(false);

  const handleClick = (e) => {
    if (setSelected) {
      setSelected(prevState => !prevState);
    } else {
        setCheckedInitial(prevState => !prevState);
    }
  }
  const checked = selected ? selected : checkedInitial;

  return (
    <div
      className={`checkbox ${checked ? "checked" : ""}`}
      onClick={(e) => handleClick(e)}
    ></div>
  );
};
export default CustomCheckbox;
