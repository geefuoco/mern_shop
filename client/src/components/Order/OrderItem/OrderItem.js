import React from "react";
import "./OrderItem.css";

const OrderItem = ({ item }) => {
  return (
    <div className="orderitem-container">
      <img className="orderitem-img" src={item.imageUrl} alt="could not load" />
      <div>
        <p className="orderitem-name">Name: {item.name}</p>
        <p className="orderitem-price">Price: {item.price}</p>
      </div>
    </div>
  );
};

export default OrderItem;
