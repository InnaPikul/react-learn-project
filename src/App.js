import React from "react";
import TabsContainer from "./components/TabsContainer";
import Slider from './components/Slider/Slider';
import TimeRange from "./components/Timerange/TimeRange";
import RangeSlider from "./components/RangeSlider/RangeSlider";


function App() {
  return (
    <div className="container">
      <TabsContainer />
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
  );
}

export default App;
