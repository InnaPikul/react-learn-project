import React, { useState } from "react";
import Slider from "../Slider/Slider";
import "./style.scss";

const TimeRange = ({ hasScale }) => {
  const [fromValue, setFromValue] = useState(25);
  const [toValue, setToValue] = useState(70);

  const convertToHours = (fieldValue) => {
    const hourInPercent = 100 / 24; //value in % of one hour
    return Math.round(fieldValue / hourInPercent);
  };

  return (
    <div className="flex mb-5">
      <Slider
        hasScale={hasScale}
        sendFromValue={setFromValue}
        fromValue={fromValue}
      />
      <div className="range px-4">
        <span>{convertToHours(fromValue)} </span>-
        <span> {convertToHours(toValue)}</span>
      </div>
      <Slider
        hasScale={hasScale}
        sendToValue={setToValue}
        toValue={toValue}
      />
    </div>
  );
};

export default TimeRange;
