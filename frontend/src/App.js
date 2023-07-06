import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Productlist from "./features/productlist/Productlist";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Productview from "./features/productlist/Productview";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Productlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/view" element={<Productview />} />

          
          
          

          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
