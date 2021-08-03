import React, { useState, useRef } from "react";
import Slider from "../Slider/Slider";
import "./style.scss";

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
      />
    </div>
  );
};

export default RangeSlider;
