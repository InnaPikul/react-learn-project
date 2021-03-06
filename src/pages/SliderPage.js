import React from "react";
import Slider from "../components/Slider/Slider";
import TimeRange from "../components/Timerange/TimeRange";
import RangeSlider from "../components/RangeSlider/RangeSlider";
import Navigation from "../components/Navigation/Navigation";

const SliderPage = () => {
  return (
    <div className="container">
      <Navigation />
      <div className="container">
        <section className="mb-5">
          <h2 className="mb-3">Default slider</h2>
          <Slider />
        </section>
        <section className="mb-5">
          <h2 className="mb-3">Timerange</h2>
          <TimeRange hasScale={true} />
        </section>
        <section className="mb-5">
          <h2 className="mb-3">Range slider</h2>
          <RangeSlider hasScale={true} hasRange={true} />
        </section>
      </div>
    </div>
  );
};
export default SliderPage;
