import React from "react";
import "./CartItem.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../redux/slices/cartSlice";

const CartItem = ({ img, id, name, quantity, price }) => {
  const quantityElements = [];
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

  for (let i = 1; i < quantity; i++) {
    quantityElements.push(<option value={i}>{i}</option>);
  }

  return (
    <div className="cart-item-container">
      <img src={img} alt="could not load" />
      <div className="info">
        <Link to={`/products/${id}`}>
          <div className="cart-item-name">{name}</div>
        </Link>
        <div className="cart-item-quantity">
          <div>
            Qty:
            <select name="quantity">{quantityElements}</select>
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
