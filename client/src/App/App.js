import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Backdrop from "../components/Backdrop/Backdrop";
import Home from "../components/Home/Home";
import ProductItem from "../components/ProductItem/ProductItem";
import Cart from "../components/Cart/Cart";
import { Provider } from "react-redux";
import store from "../redux/store";

function App() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <main>
          <Navbar click={() => setSidebar(!sidebar)} />
          <Sidebar show={sidebar} />
          <Backdrop show={sidebar} click={() => setSidebar(!sidebar)} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/product/:id" element={<ProductItem />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}

export default App;
