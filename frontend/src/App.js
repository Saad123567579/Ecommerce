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
import { updateUserAsync,logger,loginUser,logoutUser } from "./features/auth/authSlice";
import {useDispatch,useSelector} from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import SignatureRoute from "./SignatureRoute";
import About from "./About";
import Contact from "./Contact";
import Notfound from "./Notfound";
import Success from "./Success";
import Tracking from "./Tracking";
import Orders from "./admin/Orders";
import Admin from "./admin/Admin";
import Stock from "./admin/Stock";
import Newproduct from "./admin/Newproduct";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const dispatch = useDispatch();
  var refresh = useSelector(state=>state.user.refresh);
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (!cartItems) {
      localStorage.setItem("cartItems", JSON.stringify({ items: [] }));
    }
  }, []);
  var user = useSelector((state)=>state.user.user.user)
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch("http://localhost:3001/users/getuser", {
          credentials: 'include', // Include cookies in the request
        });
        const data = await response.json();
        if(data==="Token Not Found"){console.log('token not found');} else {
          dispatch(loginUser(data));}
        
      } catch (e) {
        console.log(e);
      }
    };
    
    checkToken();
    
  }, [ ])


  useEffect(()=>{
    if(localStorage.getItem("token"))
    dispatch(logger(1));
    else 
    dispatch(logger(0));
  },[refresh])
  useEffect(() => {
    dispatch(updateUserAsync());
  }, [refresh])

  



  const ProtectedRoute = ({ element: Element, ...rest }) => {
  const logger = useSelector((state) => state.user.logger);

  if (logger === 0) {
    return <Navigate to="/signup" replace />;
  }

  return <Route {...rest} element={<Element />} />;
};

  
  return (
  
      <BrowserRouter>
        <Navbar />
        < ToastContainer />
        <div className="container">
          <Routes>
            <Route exact  path="/" element={<Productlist />} />
            <Route exact  path="/about" element={<About />} />
            <Route exact  path="/contact" element={<Contact />} />
            <Route exact  path="/product/:id" element={<Productview />} />
            <Route exact  path="/profile/:username" element={<Profile />} />
            <Route exact   path="/checkout" element={<Checkout />}  />
            <Route exact  path="/login" element={<Login />} />
            <Route exact  path="/signup" element={<Signup />} />
            <Route  exact path="/success/:id" element={<Success />} />
            <Route exact  path="/tracking" element={<Tracking />} />
            <Route exact  path="/getmetoadmin" element={<Admin />} />
            <Route exact  path="/getmetoadmin/orders" element={<Orders />} />
            <Route exact  path="/getmetoadmin/stock" element={<Stock />} />
            <Route exact  path="/getmetoadmin/newproduct" element={<Newproduct />} />




            <Route path="*" element={<Notfound/>} />



        


          
          
          

          </Routes>
        </div>
      </BrowserRouter>
    
  );
}

export default App;
