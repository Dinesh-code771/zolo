import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isEditMode: false,
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setIsEditMode(state, action) {
      state.isEditMode = action.payload;
    },
  },
});

export const { setProducts, setIsEditMode } = productSlice.actions;
export default productSlice.reducer;
