import { configureStore } from '@reduxjs/toolkit';
import  productReducer  from '../features/productlist/Productlistslice';

export const store = configureStore({
  reducer: {
    product:productReducer
  },
});
