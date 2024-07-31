import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productsSlice";
import postsReducer from "./postsSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    posts : postsReducer
  },
});

export default store;
