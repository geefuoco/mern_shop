import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";

export default configureStore({
  reducer: {
    navMenu: navbarReducer,
  },
});
