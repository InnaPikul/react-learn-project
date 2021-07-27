import React from "react";
import TabsContainer from "./components/TabsContainer";
import Slider from './components/Slider/Slider';
import TimeRange from "./Timerange/TimeRange";


function App() {
  return (
    <div className="container">
      <TabsContainer />
      <div className="mb-5">
        <h2 className="mb-3">Default slider</h2>
        <Slider />
      </div>
      <div className="mb-5">
        <h2 className="mb-3">Timerange</h2>
        <TimeRange hasScale={true} />
      </div>
    </div>
  );
}

export default App;
