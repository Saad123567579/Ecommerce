
const express = require("express");   //importing express
const server = express();   //initiating server
server.use(express.json()); //Built in middle ware which parses body in JSON
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const router = express.Router();
const productRouter = require("./router/Products");
const orderRouter = require("./router/Orders");
const userRouter = require("./router/Users");
const cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local');

// Enable CORS middleware
server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

main()
.then(()=>console.log("Successfully Connected To Database"))
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")
}



server.use(cookieParser());
server.use("/products",productRouter.router)
server.use("/orders",orderRouter.router)
server.use("/users",userRouter.router)



server.listen(3001,()=>console.log("Server Successfully Started"));  //starting server
