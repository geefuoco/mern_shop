import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { item, getProduct } from "../../redux/slices/productSlice";
import "./ProductItem.css";

const ProductItem = () => {
  const itemState = useSelector(item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [itemState, dispatch]);

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
        <button className="product-item-button">
          Add to Cart <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  );

  return <>{product}</>;
};

export default ProductItem;
