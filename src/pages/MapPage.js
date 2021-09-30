import React from "react";
import Navigation from "../components/Navigation/Navigation";
import Map from "../components/Map/Map";
import MapProvider from "../MapProvider";

const MapPage = () => {
  return (
    <div className="container">
      <Navigation />
      <h1>Map</h1>
      <div id="map-container">
        {console.log(1)}
        <MapProvider>
          <Map />
        </MapProvider>
      </div>
    </div>
  );
};

export default MapPage;
