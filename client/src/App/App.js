import "./App.css";
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
  return (
    <Provider store={store}>
      <Router>
        <main>
          <Navbar />
          <Sidebar />
          <Backdrop />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products/:id" element={<ProductItem />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}

export default App;
