import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Backdrop from "../components/Backdrop/Backdrop";
import Home from "../components/Home/Home";
import ProductItem from "../components/ProductItem/ProductItem";
import Cart from "../components/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartItems, quantity } from "../redux/slices/cartSlice";
import Success from "../components/Order/Success/Success";
import Cancel from "../components/Order/Cancel/Cancel";

function App() {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(quantity);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch, cartQuantity]);

  return (
    <Router>
      <main>
        <Navbar cartQuantity={cartQuantity} />
        <Sidebar cartQuantity={cartQuantity} />
        <Backdrop />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/:id" element={<ProductItem />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/cancel" element={<Cancel />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
