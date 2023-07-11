const express = require("express");
const {createProduct,getProducts,getProductsById} = require("../controller/Product");
const router = express.Router();



router.post('/createproduct',createProduct)
router.get('/getproduct',getProducts)
router.get('/getproductbyid/:id',getProductsById)



exports.router = router;

