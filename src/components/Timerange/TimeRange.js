import React, { useState } from "react";
import Slider from "../Slider/Slider";
import "./style.scss";

const TimeRange = ({ hasScale }) => {
  const [initialFrom, setInitialFrom] = useState(25);
  const [initialTo, setInitialTo] = useState(50);

  const [fromValue, setFromValue] = useState(initialFrom);
  const [toValue, setToValue] = useState(initialTo);

  const convertToHours = (fieldValue) => {
    const hourInPercent = 100 / 24; //value in % of one hour
    return Math.round(fieldValue / hourInPercent);
  };

  return (
    <div className="flex mb-5">
      <Slider hasScale={hasScale} sendFromValue={setFromValue} setInitialFrom={setInitialFrom} initialFrom={initialFrom}/>
      <div className="range px-4">
        <span className="label">{convertToHours(fromValue)} </span>- 
        <span className="label"> {convertToHours(toValue)}</span>
      </div>
      <Slider hasScale={hasScale} sendToValue={setToValue} setInitialTo={setInitialTo} initialTo={initialTo} />
    </div>
  );
};

export default TimeRange;
