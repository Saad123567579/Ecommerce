//authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    users: [],
    status: 'idle',
    flag:1,
    refresh:1,
    currentUser:{},
    logger:0,
    order:{},
    user:{}
  };

  export  const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userObject) => {
        try {
            const response = await fetch("http://localhost:3001/users/createuser", {
              method: 'POST',
              credentials:'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userObject)
            });
          
        
            var newPerson = await response.json();
            return newPerson;
          } catch (error) {
            return newPerson;
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
      order: (state,action) => {
        state.order = action.payload;
      },
      loginUser:(state,action)=>{
        state.user = {...action.payload};
      },
      logoutUser:(state,action)=>{
        state.user = {};
      }
      
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
  
  export const  { increment,refresh,storeUser,logger,order,loginUser,logoutUser} = userSlice.actions;
  export default userSlice.reducer;