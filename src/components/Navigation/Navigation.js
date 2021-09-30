import React from "react";
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
      <nav className="main-nav">
        <ul className="list">
          <li className="list__item">
            <NavLink exact to="/" activeClassName="selected">Home</NavLink>
          </li>
          <li className="list__item">
            <NavLink to="/tabs" activeClassName="selected">Tabs</NavLink>
          </li>
          <li className="list__item">
            <NavLink to="/slider" activeClassName="selected">Slider</NavLink>
          </li>
          <li className="list__item">
            <NavLink to="/list-api-modified" activeClassName="selected">List Modified</NavLink>
          </li>
          <li className="list__item">
            <NavLink to="/list-api" activeClassName="selected">List with API</NavLink>
          </li>
          <li className="list__item">
            <NavLink to="/map" activeClassName="selected">Map</NavLink>
          </li>
        </ul>
      </nav>
  );
};

export default Navigation;
