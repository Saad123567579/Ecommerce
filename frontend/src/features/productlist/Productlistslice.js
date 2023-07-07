//productslice.js


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchallProducts } from './ProductlistAPI';

const initialState = {
  products: [],
  status: 'idle',
  flag:1
};


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await fetchallProducts();
    console.log(response);
    return response;
  }
);



export  const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      if(state.flag>=1000)
      state.flag=0;
      else
      state.flag += 1;
    },
    
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = state.products.concat(action.payload);

      });
      
      
  },
});

export const { increment} = productSlice.actions;
export default productSlice.reducer;

// export const selectCount = (state) => state.counter.value;

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

