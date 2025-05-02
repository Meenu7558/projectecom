import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import sellerReducer from "./features/sellerSlice";
export const store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer, 
    },
});