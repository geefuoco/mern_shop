import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../redux/slices/navbarSlice";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ cartQuantity, loggedIn }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.csrf.value);

  const signOut = () => {
    const url = `${process.env.REACT_APP_HOSTNAME}:4000/api/user/logout`;
    const options = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${process.env.REACT_APP_HOSTNAME}`,
      },
      credentials: "include",
      body: JSON.stringify({ _csrf: token }),
    };
    fetch(url, options)
      .then(() => {
        window.location.replace(`${process.env.REACT_APP_HOSTNAME}:3000`);
      })
      .catch((err) => console.log(err));
  };

  const button = loggedIn ? (
    <>
      <a
        href={`${process.env.REACT_APP_HOSTNAME}:3000/user/orders`}
        className="nav-link"
      >
        Orders
      </a>
      <button className="nav-link" onClick={signOut}>
        Log out
      </button>
    </>
  ) : (
    <>
      <a
        className="nav-link"
        href={`${process.env.REACT_APP_HOSTNAME}:3000/user/signin`}
      >
        Login
      </a>
      <a
        className="nav-link"
        href={`${process.env.REACT_APP_HOSTNAME}:3000/user/signup`}
      >
        Sign Up
      </a>
    </>
  );

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
              <span className="cart-badge">{cartQuantity}</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/">Shop</Link>
          </li>
          {button}
        </ul>
        <div className="menu" onClick={() => dispatch(toggle())}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
