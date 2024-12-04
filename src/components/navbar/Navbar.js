import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ language, items }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">SquadFlow</div>
      <ul className="navbar-links">
        {items.map((item, index) => (
          <li key={index}>
            {/* Removed `exact` prop */}
            <NavLink to={["/", "/dashboard", "/teams", "/settings"][index]} end>
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
