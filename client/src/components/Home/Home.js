import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Product/Product";
import {
  getProducts,
  items,
  itemsStatus,
} from "../../redux/slices/productSlice";
import { useEffect } from "react";
import "./Home.css";

const Home = () => {
  const products = useSelector(items);
  const status = useSelector(itemsStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getProducts());
    }
  }, [status, dispatch, products]);

  const productsList = products.map((obj) => {
    return (
      <Product
        key={obj._id}
        id={obj._id}
        name={obj.name}
        desc={obj.description}
        price={obj.price}
        img={obj.imageUrl}
      />
    );
  });

  const loading = status === "loading" ? <div>Loading Content</div> : null;

  return (
    <div className="home-container">
      <h2 className="home-title">Latest Products</h2>
      <div className="product-display">
        {loading}
        {productsList}
      </div>
    </div>
  );
};

export default Home;
