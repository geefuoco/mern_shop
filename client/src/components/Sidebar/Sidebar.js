import React from "react";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ cartQuantity, loggedIn }) => {
  const show = useSelector((state) => state.navMenu.value);
  const token = useSelector((state) => state.csrf.value);

  const classList = ["sidebar"];
  if (show) {
    classList.push("show");
  }

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
      <div className="sidebar-link">
        <a href={`${process.env.REACT_APP_HOSTNAME}:3000/user/orders`}>
          Orders
        </a>
      </div>
      <div className="sidebar-link">
        <button onClick={signOut}>Log out</button>
      </div>
    </>
  ) : (
    <>
      <div className="sidebar-link">
        <a href={`${process.env.REACT_APP_HOSTNAME}:3000/user/signin`}>Login</a>
      </div>
      <div className="sidebar-link">
        <a href={`${process.env.REACT_APP_HOSTNAME}:3000/user/signup`}>
          Sign Up
        </a>
      </div>
    </>
  );

  return (
    <div className={classList.join(" ")}>
      <div className="sidebar-container">
        <div className="sidebar-link">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            Cart
            <span>{cartQuantity}</span>
          </Link>
        </div>
        <div className="sidebar-link">
          <Link to="/">Home</Link>
        </div>
        {button}
      </div>
    </div>
  );
};

export default Sidebar;
