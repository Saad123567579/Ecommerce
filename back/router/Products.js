const express = require("express");
const {createProduct,getProducts,getProductsById,updateProductsById,deleteProduct} = require("../controller/Product");
const router = express.Router();



router.post('/createproduct',createProduct)
router.get('/getproduct',getProducts)
router.get('/getproductbyid/:id',getProductsById)
router.put('/updateproductbyid/:id',updateProductsById)
router.delete('/deletebyid/:id',deleteProduct);






exports.router = router;

