import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = () => {
  return (
    <div className="product-container">
      <img
        src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6c%2F15%2F6c150d060d3d1aa95459daf18fd28d23f183c429.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]"
        alt=""
      />
      <div className="product-info">
        <p className="product-name">Black Hoodie</p>
        <p className="product-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum esse
          minus vel dolor cum sequi laudantium incidunt! Amet, voluptates
          fugiat.
        </p>
        <p className="product-price">$99.99</p>
      </div>
      <Link className="product-button" to={`/product/${12345}`}>
        View
      </Link>
    </div>
  );
};
export default Product;
