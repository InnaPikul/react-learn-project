import React from "react";
import Slider from "../Slider/Slider";
import "./style.scss";

const RangeSlider = ({ hasScale, hasRange }) => {
    return(<div>
        <Slider hasScale={hasScale} hasRange={hasRange} />
    </div>);
}

export default RangeSlider;