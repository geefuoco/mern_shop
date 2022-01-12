import React from "react";
import { useDispatch } from "react-redux";
import { toggle } from "../../redux/slices/navbarSlice";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <h1>MERN Shop</h1>
        </Link>
      </div>
      <div className="links">
        <ul>
          <li className="nav-link">
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-badge">0</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/">Shop</Link>
          </li>
        </ul>
        <div className="menu" onClick={() => dispatch(toggle())}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
