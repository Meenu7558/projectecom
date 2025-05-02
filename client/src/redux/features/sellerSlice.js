import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSellerAuth: false, // Initially, seller is not authenticated
  sellerData: {}, // You can store seller-specific data here
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    saveSeller: (state, action) => {
      state.isSellerAuth = true; // Set seller as authenticated
      state.sellerData = action.payload; // Store seller data
    },
    clearSeller: (state) => {
      state.isSellerAuth = false; // Set seller as unauthenticated
      state.sellerData = {}; // Clear seller data
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveSeller, clearSeller } = sellerSlice.actions;

export default sellerSlice.reducer;
