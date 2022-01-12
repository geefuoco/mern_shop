import React from "react";
import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItem = () => {
  return (
    <div className="cart-item-container">
      <img
        src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6c%2F15%2F6c150d060d3d1aa95459daf18fd28d23f183c429.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]"
        alt=""
      />
      <div className="info">
        <Link to={"/product/1234"}>
          <div className="cart-item-name">Black Hoodie</div>
        </Link>
        <div className="cart-item-quantity">
          Qty:
          <select name="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="cart-item-price">Price: 49.99</div>
        <button>
          <i className="fas fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};
export default CartItem;
