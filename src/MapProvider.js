import React, { useRef } from "react";
import L from "leaflet";

export const MapContext = React.createContext();

const MapProvider = ({children}) => {
    console.log(2)
    const map = useRef(L.map('map-container').setView([51.505, -0.09], 13));
    return(<MapContext.Provider value={{map: map.current}}>
        {children}
    </MapContext.Provider>)
}

export default MapProvider;