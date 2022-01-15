import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { getCartItems, quantity } from "../../redux/slices/cartSlice";

const Sidebar = () => {
  const show = useSelector((state) => state.navMenu.value);
  const dispatch = useDispatch();
  const cartQuantity = useSelector(quantity);
  const classList = ["sidebar"];
  if (show) {
    classList.push("show");
  }

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch, cartQuantity]);

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
      </div>
    </div>
  );
};

export default Sidebar;
