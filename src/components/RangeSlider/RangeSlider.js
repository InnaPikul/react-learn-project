import React, { useState, useRef } from "react";
import Slider from "../Slider/Slider";
import "./style.scss";
import { convertPercentToHours, getHoursDiff } from '../../utils/convert';
import dayjs from "dayjs";

const RangeSlider = ({ hasScale, hasRange }) => {
  const firstThumbRef = useRef(null);
  const secondThumbRef = useRef(null);
  const rangeRef = useRef(null);

  const [firstThumbLeft, setFirstThumbLeft] = useState(() => 0);
  const [secondThumbLeft, setSecondThumbLeft] = useState(() => 20);
  const [rangeLeft, setRangeLeft] = useState(firstThumbLeft);
  const [rangeWidth, setRangeWidth] = useState(null);

  const handleFirstThumbLeft = (value) => {
    if (value >= secondThumbLeft || value < 0 ) {
        return
    }
    setFirstThumbLeft(value);
    setRangeLeft(value);
  }

  const handleSecondThumbLeft = (value) => {
    if (value <= firstThumbLeft || value > 100 ) {
        return
    }
    setSecondThumbLeft(value);
  }

  const handleRangeLeft = (value) => {
    if (value < 0 || (value + rangeWidth) > 100 ) {
      return
    }
    setFirstThumbLeft(value);
    setSecondThumbLeft(value + rangeWidth);
    setRangeLeft(value);
  }

  const [resultInHoursFrom, resultInMinutesFrom] = convertPercentToHours(firstThumbLeft);
  const [resultInHoursTo, resultInMinutesTo] = convertPercentToHours(secondThumbLeft);

  let from = dayjs().hour(resultInHoursFrom).minute(resultInMinutesFrom).format("HH:mm");
  let to = dayjs().hour(resultInHoursTo).minute(resultInMinutesTo).format("HH:mm");

  return (
    <div>
      <Slider
        hasScale={hasScale}
        hasRange={hasRange}
        firstThumbRef={firstThumbRef}
        firstThumbLeft={firstThumbLeft}
        setFirstThumbLeft={handleFirstThumbLeft}
        secondThumbRef={secondThumbRef}
        secondThumbLeft={secondThumbLeft}
        setSecondThumbLeft={handleSecondThumbLeft}
        rangeRef={rangeRef}
        rangeLeft={rangeLeft}
        setRangeLeft={handleRangeLeft}
        rangeWidth={rangeWidth}
        getRangeWidth={setRangeWidth}
        tooltipFrom={from}
        tooltipTo={to}
      />
      <div className="mt-5">
        <span>{from}</span> - <span>{to}</span>
      </div>
      <div className="mt-2">
        <span>{getHoursDiff(secondThumbLeft, firstThumbLeft)}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
