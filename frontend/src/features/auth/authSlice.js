//authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    users: [],
    status: 'idle',
    flag:1,
    refresh:1,
    currentUser:{},
    logger:0
  };

  export  const createUserAsync = createAsyncThunk(
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

  export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (_, thunkAPI) => {
      const state = thunkAPI.getState().user;
      if (state.logger === 1) {
        let x = JSON.parse(localStorage.getItem('token'));
        const response = await fetch(`http://localhost:8080/users?username=${x}`);
        const data = await response.json();
        return data[0];
      } else if (state.logger === 0) {
        return {};
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
      refresh: (state) => {
        if(state.refresh>=1000)
        state.refresh=0;
        else
        state.refresh += 1;
      },
      storeUser: (state,action) => {
        state.currentUser = action.payload[0];
      },
      logger: (state,action) => {
        state.logger = action.payload;
      },
      
    },
    
    extraReducers: (builder) => {
      builder
        .addCase(createUserAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createUserAsync.fulfilled, (state, action) => {
            state.status = 'fulfilled';
          if(action.payload==1){
            if(state.flag>=1000)
            state.flag=0;
            else 
            state.flag++;

          }
        })
        .addCase(updateUserAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateUserAsync.fulfilled, (state,action) => {
              state.status = 'fulfilled';
              state.currentUser = action.payload;
            
            
          });
        
        
    },
  });
  
  export const  { increment,refresh,storeUser,logger} = userSlice.actions;
  export default userSlice.reducer;