import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCartItems } from "../../../redux/slices/cartSlice";
import { getSession } from "../../../redux/slices/sessionSlice";
import "./Success.css";

const Success = () => {
  const location = useLocation();
  const sessionId = location.search.replace("?sessionId=", "");
  const dispatch = useDispatch();

  useEffect(() => {
    async function emptyCart() {
      await fetch(`${process.env.REACT_APP_HOSTNAME}:4000/api/cart/deleteAll`, {
        credentials: "include",
      });
    }
    emptyCart();
    dispatch(getSession(sessionId));
    dispatch(getCartItems());
  }, [dispatch, sessionId]);

  return (
    <div className="success-container">
      <h1>Thank you for your purchase!</h1>
    </div>
  );
};

export default Success;
