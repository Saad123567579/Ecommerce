
//app.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Productlist from "./features/productlist/Productlist";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Productview from "./features/productlist/Productview";
import Checkout from "./features/cart/Checkout";
import Profile from "./Profile";
import { updateUserAsync,logger } from "./features/auth/authSlice";
import {useDispatch,useSelector} from "react-redux";

function App() {
  const dispatch = useDispatch();
  var refresh = useSelector(state=>state.user.refresh);
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (!cartItems) {
      localStorage.setItem("cartItems", JSON.stringify({ items: [] }));
    }
  }, []);


  useEffect(()=>{
    if(localStorage.getItem("token"))
    dispatch(logger(1));
    else 
    dispatch(logger(0));
  },[refresh])
  useEffect(() => {
    dispatch(updateUserAsync());
  }, [refresh])
  useEffect(() => {
    console.log("Hello World");
    dispatch(updateUserAsync());
  }, [])

  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Productlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:id" element={<Productview />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile/:username" element={<Profile />} />


        


          
          
          

          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
