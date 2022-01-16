import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSession } from "../../../redux/slices/orderSlice";
import { getCartItems } from "../../../redux/slices/cartSlice";
import "./Success.css";

const Success = () => {
  const location = useLocation();
  const sessionId = location.search.replace("?sessionId=", "");
  const dispatch = useDispatch();
  // const session = useSelector((state) => state.order.value);
  // if you decide to use the session object later on

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
