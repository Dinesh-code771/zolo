import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isEditMode: false,
  selectedProduct: "",
  selectedProductData: "",
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
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    setSelectedProductData(state, action) {
      state.selectedProductData = action.payload;
    },
  },
});

export const {
  setSelectedProductData,
  setProducts,
  setIsEditMode,
  setSelectedProduct,
} = productSlice.actions;
export default productSlice.reducer;
