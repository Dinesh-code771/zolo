import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  allProducts: [],
  isEditMode: false,
  selectedProduct: "",
  cartItems: [],
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
    setAllProducts(state, action) {
      state.allProducts = action.payload;
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const {
  setSelectedProductData,
  setProducts,
  setIsEditMode,
  setSelectedProduct,
  setAllProducts,
  setCartItems,
} = productSlice.actions;
export default productSlice.reducer;
