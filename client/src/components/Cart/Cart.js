import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import { items, price } from "../../redux/slices/cartSlice";
import { getCartItems } from "../../redux/slices/cartSlice";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  const cartItems = useSelector(items);
  const totalPrice = useSelector(price);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch, totalPrice]);

  const displayElements =
    cartItems.length !== 0 ? (
      cartItems.map((obj) => {
        return (
          <CartItem
            img={obj.imageUrl}
            key={`${obj._id}_${Date.now()}`}
            id={obj._id}
            amount={obj.amount}
            name={obj.name}
            maxStock={obj.countInStock}
            price={obj.price}
          />
        );
      })
    ) : (
      <h1>Your cart is empty</h1>
    );

  const handleSubmit = async (ev) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOSTNAME}:4000/create-checkout-session`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(cartItems),
        }
      );
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {}
  };

  return (
    <div className="cart-container">
      <div className="cart-items">{displayElements}</div>

      <div className="checkout">
        <form>
          <div>
            <p>Total:</p>
            <input
              type="number"
              value={totalPrice.toFixed(2)}
              name="price"
              readOnly
            />
          </div>
          <div>
            <button type="button" onClick={handleSubmit}>
              Proceed to checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
