import React, { useState, useRef } from "react";
import Slider from "../Slider/Slider";
import "./style.scss";

const RangeSlider = ({ hasScale, hasRange }) => {
  const firstThumbRef = useRef(null);
  const secondThumbRef = useRef(null);

  const [firstThumbLeft, setFirstThumbLeft] = useState(20);
  const [secondThumbLeft, setSecondThumbLeft] = useState(80);

  //const [sliderWidth, setSliderWidth] = useState(null);

  const handleSecondThumbLeft = (value) => {
    if (value <= firstThumbLeft || value > 100 ) {
        return
    }
    setSecondThumbLeft(value);
  }
  const handleFirstThumbLeft = (value) => {
    if (value >= secondThumbLeft || value > 100 ) {
        return
    }
    setFirstThumbLeft(value);
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
        //getSliderWidth={setSliderWidth}
      />
    </div>
  );
};

export default RangeSlider;
