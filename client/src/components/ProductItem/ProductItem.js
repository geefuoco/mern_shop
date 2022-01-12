import React from "react";
import "./ProductItem.css";

const ProductItem = () => {
  return (
    <div className="product-item-container">
      <img
        src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6c%2F15%2F6c150d060d3d1aa95459daf18fd28d23f183c429.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]"
        alt=""
      />
      <div className="product-item-info">
        <div className="product-item-name">Black Hoodie</div>
        <div className="product-item-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum atque
          ducimus natus eos, ullam officia debitis sint ab sed. Ipsam!
        </div>
        <div className="product-item-stock">Stock: 0</div>
        <div className="product-item-price">49.99</div>
        <button className="product-item-button">
          Add to Cart <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
