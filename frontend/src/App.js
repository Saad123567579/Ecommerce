
//app.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Productlist from "./features/productlist/Productlist";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter, Route, Routes,useLocation,Navigate } from "react-router-dom";
import { useEffect } from "react";
import Productview from "./features/productlist/Productview";
import Checkout from "./features/cart/Checkout";
import Profile from "./Profile";
import { updateUserAsync,logger } from "./features/auth/authSlice";
import {useDispatch,useSelector} from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import SignatureRoute from "./SignatureRoute";

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

  const ProtectedRoute = ({ element: Element, ...rest }) => {
  const logger = useSelector((state) => state.user.logger);

  if (logger === 0) {
    return <Navigate to="/signup" replace />;
  }

  return <Route {...rest} element={<Element />} />;
};

  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Productlist />} />
            
            <Route path="/product/:id" element={<Productview />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route element={<ProtectedRoute />}>
            <Route  path="/checkout" element={<Checkout />}  />
            </Route>
            <Route element={<SignatureRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            </Route>


        


          
          
          

          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
