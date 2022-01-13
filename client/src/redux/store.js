import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import productReducer from "./slices/productSlice";

export default configureStore({
  reducer: {
    navMenu: navbarReducer,
    products: productReducer,
  },
});
