import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../redux/slices/orderSlice";
import OrderItem from "../OrderItem/OrderItem";
import "./UserOrder.css";

const UserOrder = () => {
  const order = useSelector((state) => state.order.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const orderDisplay = order.map((obj) => {
    return (
      <div className="order" key={obj._id}>
        <h6>Order Date: {obj.date.toLocaleString()}</h6>
        <h6>Total: {obj.total}</h6>
        {obj.products.map((item) => {
          return <OrderItem item={item} key={item._id} />;
        })}
      </div>
    );
  });

  return (
    <div className="order-container">
      <h2 className="order-title">Orders</h2>
      <div className="orders">{orderDisplay}</div>
    </div>
  );
};

export default UserOrder;
