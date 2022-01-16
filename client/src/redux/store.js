import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

export default configureStore({
  reducer: {
    navMenu: navbarReducer,
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
