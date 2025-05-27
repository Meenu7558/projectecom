import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import adminReducer from "./features/adminslice"
import sellerReducer from "./features/sellerSlice";
export const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        seller: sellerReducer, 
    },
});