import React, { useState } from "react";
import Slider from "../Slider/Slider";
import "./style.scss";
import { convertPercentToHours } from '../../utils/convert';
import dayjs from "dayjs";

const TimeRange = ({ hasScale }) => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  const [resultInHoursFrom, resultInMinutesFrom] = convertPercentToHours(fromValue);
  const [resultInHoursTo, resultInMinutesTo] = convertPercentToHours(toValue);

  let from = dayjs().hour(resultInHoursFrom).minute(resultInMinutesFrom).format("HH:mm");
  let to = dayjs().hour(resultInHoursTo).minute(resultInMinutesTo).format("HH:mm");
  
  return (
    <div className="flex mb-5">
      <Slider
        hasScale={hasScale}
        sendFromValue={setFromValue}
        fromValue={fromValue}
      />
      <div className="range px-4">
        <span>{from} </span>-
        <span> {to}</span>
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
