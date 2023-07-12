
const express = require("express");   //importing express
const server = express();   //initiating server
server.use(express.json()); //Built in middle ware which parses body in JSON
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// const router = express.Router();
const productRouter = require("./router/Products");
const orderRouter = require("./router/Orders");
const userRouter = require("./router/Users");

// Enable CORS middleware
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH'); // Allow the specified HTTP methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow the specified headers
    next();
  });

main()
.then(()=>console.log("Successfully Connected To Database"))
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce")
}
const auth = ((req,res,next)=>{
  try{
    const header = req.get("Authorization");
  console.log(header);
  var decoded = jwt.verify(header,'shhh');
  if(decoded.email){
    next();
  }
  else {
    res.sendStatus(401);
  }
  console.log(decoded);
  }
  catch(error){
    res.sendStatus(401);
  }

})
server.use("/products",productRouter.router)
server.use("/orders",orderRouter.router)
server.use("/users",userRouter.router)

server.listen(3001,()=>console.log("Server Successfully Started"));  //starting server
