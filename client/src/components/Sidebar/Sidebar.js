import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ show }) => {
  const classList = ["sidebar"];
  if (show) {
    classList.push("show");
  }
  return (
    <div className={classList.join(" ")}>
      <div className="sidebar-container">
        <div className="sidebar-link">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            Cart
            <span>0</span>
          </Link>
        </div>
        <div className="sidebar-link">
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
