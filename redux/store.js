import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});

export default store;
