import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import { items, price } from "../../redux/slices/cartSlice";
import { getCartItems } from "../../redux/slices/cartSlice";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  const cartItems = useSelector(items);
  const totalPrice = useSelector(price);
  const token = useSelector((state) => state.csrf.value);
  const dispatch = useDispatch();
  const button = useRef();

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
    disableButton();
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
          body: JSON.stringify({
            cartItems: cartItems,
            _csrf: token,
            total: totalPrice.toFixed(2),
          }),
        }
      );
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {}
  };

  const disableButton = () => {
    button.current.disabled = !button.current.disabled;
    button.current.innerText = "Processing...";
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
            <button type="button" onClick={handleSubmit} ref={button}>
              Proceed to checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
