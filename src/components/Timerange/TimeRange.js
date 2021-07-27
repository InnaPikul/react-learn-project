import React, { useState } from "react";
import Slider from "../Slider/Slider";
import "./style.scss";

const TimeRange = ({ hasScale }) => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  const convertToHours = (fieldValue) => {
    const hourInPercent = 100 / 24; //value in % of one hour
    return Math.round(fieldValue / hourInPercent);;
  };

  return (
    <div className="flex mb-5">
      <Slider hasScale={hasScale} sendFromValue={setFromValue}/>
      <div className="range px-4">
        <span className="label">{convertToHours(fromValue)} </span>- 
        <span className="label"> {convertToHours(toValue)}</span>
      </div>
      <Slider hasScale={hasScale} sendToValue={setToValue} />
    </div>
  );
};

export default TimeRange;
