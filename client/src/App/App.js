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
import Registration from "../components/Registration/Registration";
import Login from "../components/Login/Login";
import { getUser } from "../redux/slices/authSlice";
import { setToken } from "../redux/slices/csrfSlice";
import { getToken } from "../Util/getToken";

function App() {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(quantity);
  const user = useSelector((state) => state.auth.value);

  useEffect(() => {
    dispatch(getCartItems());
    dispatch(getUser());
    const data = getToken(`${process.env.REACT_APP_HOSTNAME}:4000/api/token`);
    data.then((value) => dispatch(setToken(value.csrfToken)));
  }, [dispatch, cartQuantity, user]);

  return (
    <Router>
      <main>
        <Navbar cartQuantity={cartQuantity} loggedIn={user} />
        <Sidebar cartQuantity={cartQuantity} loggedIn={user} />
        <Backdrop />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/:id" element={<ProductItem />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/cancel" element={<Cancel />}></Route>
          <Route path="/user/signin" element={<Login />}></Route>
          <Route path="/user/signup" element={<Registration />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
