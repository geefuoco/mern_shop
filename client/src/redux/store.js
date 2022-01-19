import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import csrfReducer from "./slices/csrfSlice";
import authSlice from "./slices/authSlice";
import sessionSlice from "./slices/sessionSlice";

export default configureStore({
  reducer: {
    navMenu: navbarReducer,
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
    session: sessionSlice,
    csrf: csrfReducer,
    auth: authSlice,
  },
});
