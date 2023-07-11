
const express = require("express");   //importing express
const server = express();   //initiating server
server.use(express.json()); //Built in middle ware which parses body in JSON
const mongoose = require("mongoose");
// const router = express.Router();
const productRouter = require("./router/Products");

// Enable CORS middleware
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specified HTTP methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow the specified headers
    next();
  });

main()
.then(()=>console.log("Successfully Connected To Database"))
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")
}

server.use("/products",productRouter.router)

server.listen(3001,()=>console.log("Server Successfully Started"));  //starting server
