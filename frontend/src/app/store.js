import { configureStore } from '@reduxjs/toolkit';
import  productReducer  from '../features/productlist/Productlistslice';
import userReducer from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    product:productReducer,
    user:userReducer
  },
});
