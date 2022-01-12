import React from "react";
import Product from "../Product/Product";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-title">Shop new products</h2>
      <div className="product-display">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default Home;
