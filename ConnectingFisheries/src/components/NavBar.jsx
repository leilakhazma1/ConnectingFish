import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/about" className="nav-link" activeClassName="active-link">
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/map" className="nav-link" activeClassName="active-link">
            Map of Fisheries
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/yourfish" className="nav-link" activeClassName="active-link">
            Your Fish
          </NavLink>
        </li>
      </ul>
      {location.pathname !== "/" && (
        <div className="back-button-container">
          <NavLink to="/" className="back-button" activeClassName="active-back-button">
            Home
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
