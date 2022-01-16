import React from "react";
import "./CartItem.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../redux/slices/cartSlice";

const CartItem = ({ img, id, name, maxStock, price, amount }) => {
  const dispatch = useDispatch();

  const removeFromCart = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_HOSTNAME}:4000/api/cart/delete/${id}`,
        {
          credentials: "include",
        }
      );
      dispatch(getCartItems());
    } catch (error) {
      console.error(`Could not remove item from cart: ${error}`);
    }
  };

  const increment = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_HOSTNAME}:4000/api/cart/increment/${id}`,
        {
          credentials: "include",
        }
      );
      dispatch(getCartItems());
    } catch (error) {
      console.error(`Could not increment cart item. ${error}`);
    }
  };

  const decrement = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_HOSTNAME}:4000/api/cart/decrement/${id}`,
        {
          credentials: "include",
        }
      );
      dispatch(getCartItems());
    } catch (error) {
      console.error(`Could not decrement cart item ${error}`);
    }
  };

  return (
    <div className="cart-item-container">
      <img src={img} alt="could not load" />
      <div className="info">
        <Link to={`/products/${id}`}>
          <div className="cart-item-name">{name}</div>
        </Link>
        <div className="cart-item-quantity">
          <div>
            <label htmlFor="quantity">Qty:</label>
            <button onClick={decrement} disabled={amount === 1}>
              -
            </button>
            <input
              type="number"
              readOnly
              min="1"
              max={maxStock}
              value={amount}
            />
            <button onClick={increment} disabled={amount === maxStock}>
              +
            </button>
          </div>
          <button onClick={removeFromCart}>
            <i className="fas fa-trash-can"></i>
          </button>
        </div>
        <div className="cart-item-price">{price}</div>
      </div>
    </div>
  );
};
export default CartItem;
