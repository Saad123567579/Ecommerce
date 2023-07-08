//authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    users: [],
    status: 'idle',
    flag:1
  };

  export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userObject) => {
        try {
            const response = await fetch("http://localhost:8080/users", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userObject)
            });
        
            const newPerson = await response.json();
            console.log("Your User Has Been Saved: ",newPerson);
            return 1;
          } catch (error) {
            console.error("error in saving the user");
            return 0;
          }
        
    }
  );
  
  
  
  export  const userSlice = createSlice({
    name: 'user',
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
        .addCase(createUserAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createUserAsync.fulfilled, (state, action) => {
          if(action.payload==1){
            if(state.flag>=1000)
            state.flag=0;
            else 
            state.flag++;

          }
        });
        
        
    },
  });
  
  export const  { increment} = userSlice.actions;
  export default userSlice.reducer;