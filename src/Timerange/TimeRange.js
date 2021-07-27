import React, { useState } from "react";
import Slider from "../components/Slider/Slider";
import "./style.scss";

const TimeRange = ({ hasScale }) => {
  const [fromValue, setRangeLeft] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const takeFrom = (value) => {
    return setRangeLeft(value);
  };

  const takeTo = (value) => {
    return setToValue(value);
  };

  const takeWidth = (width) => {
    return setSliderWidth(width);
  };

  const convertToHours = (fieldValue) => {
    const oneUnit = sliderWidth / 24; //value of one unit
    const res = Math.round(fieldValue / oneUnit);
    return res;
  };

  return (
    <div className="flex mb-5">
      <Slider hasScale={hasScale} sendFrom={takeFrom} sendWidth={takeWidth} />
      <div className="diapason px-4">
        <div className="diapason__line">
          <div
            className="diapason__thumb"
            style={{
              left: `10%`,
            }}
          >
            <span className="label">{sliderWidth && convertToHours(fromValue)}</span>
          </div>
          <div
            className="diapason__thumb"
            style={{
              left: `80%`,
            }}
          >
            <span className="label">{sliderWidth && convertToHours(toValue)}</span>
          </div>
        </div>
      </div>
      <Slider hasScale={hasScale} sendTo={takeTo} sendWidth={takeWidth} />
    </div>
  );
};

export default TimeRange;
