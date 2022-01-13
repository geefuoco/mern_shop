import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ name, desc, price, id, img }) => {
  return (
    <div className="product-container">
      <img src={img} alt="could not be loaded" />
      <div className="product-info">
        <p className="product-name">{name}</p>
        <p className="product-description">{desc}</p>
        <p className="product-price">{price}</p>
      </div>
      <Link className="product-button" to={`/product/${id}`}>
        View
      </Link>
    </div>
  );
};
export default Product;
