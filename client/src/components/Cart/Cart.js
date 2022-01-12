import React from "react";
import "./Cart.css";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  return (
    <div className="cart-container">
      <div className="cart-items">
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>

      <div className="checkout">
        <div>
          <p>Total:</p>
          <p>49.99</p>
        </div>
        <div>
          <button>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
