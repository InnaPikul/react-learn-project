import React, { useState } from "react";
import Slider from "../Slider/Slider";
import "./style.scss";
import { convertToHours } from '../../utils/convert';

const TimeRange = ({ hasScale }) => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  
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
