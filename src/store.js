import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Feature/cart/cartSlice'
import modaReducer from "./Feature/Modal/modalSlice";

export const store= configureStore({
  reducer:{
    cart:cartReducer,
    modal:modaReducer,
  }
}) ;