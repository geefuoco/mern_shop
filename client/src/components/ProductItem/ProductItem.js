import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../../redux/slices/cartSlice";
import { item, getProduct } from "../../redux/slices/productSlice";
import "./ProductItem.css";

const ProductItem = () => {
  const itemState = useSelector(item);
  const token = useSelector((state) => state.csrf.value);
  const dispatch = useDispatch();
  const button = useRef();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const addToCart = async () => {
    toggleButton();
    try {
      const options = {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.REACT_APP_HOSTNAME}`,
        },
        body: JSON.stringify({ _csrf: token }),
        credentials: "include",
      };
      await fetch(
        `${process.env.REACT_APP_HOSTNAME}:4000/api/cart/add/${itemState._id}`,
        options
      );
      dispatch(getCartItems());
    } catch (error) {
      console.error(`Could not add item to cart: ${error}`);
    }
  };

  const toggleButton = () => {
    button.current.disabled = !button.current.disabled;
    button.current.innerText = "Item Added";
  };

  const product = (
    <div className="product-item-container">
      <img src={itemState.imageUrl} alt="could not load" />
      <div className="product-item-info">
        <div className="product-item-name">{itemState.name}</div>
        <div className="product-item-desc">{itemState.description}</div>
        <div className="product-item-stock">
          Stock: {itemState.countInStock}
        </div>
        <div className="product-item-price">{itemState.price}</div>
        <button
          ref={button}
          className="product-item-button"
          onClick={addToCart}
        >
          Add to Cart <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  );

  return <>{product}</>;
};

export default ProductItem;
