//productslice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchallProducts } from "./ProductlistAPI";

const initialState = {
  products: [],
  status: "idle",
  flag: 1,
};

export const fetchAllProductsAsync = createAsyncThunk(

  "product/fetchProducts",
  async (query) => {
    const { categories, brands, sort } = query;

    let queryString = "";

    if (categories.length > 0) {
      const categoriesQuery = categories.join("&category=");
      queryString += `category=${categoriesQuery}`;
    }

    if (brands.length > 0) {
      const brandsQuery = brands.join("&brand=");
      queryString += `${
        queryString.length > 0 ? "&" : ""
      }brand=${brandsQuery}`;
    }

    if (sort.length > 0) {
      const sortQuery = sort.join("&sort=");
      queryString += `${queryString.length > 0 ? "&" : ""}sort=${sortQuery}`;
    }
  
    console.log(`http://localhost:3001/products/getproduct?${queryString}`);
    const response = await fetch(`http://localhost:3001/products/getproduct?${queryString}`);
    const data = await response.json();
    console.log(data);

    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      if (state.flag >= 1000) state.flag = 0;
      else state.flag += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;

      });
  },
});

export const { increment } = productSlice.actions;
export default productSlice.reducer;

// export const selectCount = (state) => state.counter.value;

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };
