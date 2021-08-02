import React, { useState } from "react";
import Slider from "../Slider/Slider";
import "./style.scss";
import moment from 'moment';

const TimeRange = ({ hasScale }) => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  const convertToHours = (fieldValue) => {
    const hourInPercent = 100 / 24; //value in % of one hour
    let result = fieldValue / hourInPercent;
    let resultInHours = Math.floor(fieldValue / hourInPercent);
    let resultInMinutes =  Math.floor((result - resultInHours) * 60);
    let newRes = moment(`${resultInHours}:${resultInMinutes}`,"LT").format('HH:mm');
    return newRes.toString();
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
