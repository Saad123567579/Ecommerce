const express = require("express");
const {createUser,updateUserPassword} = require("../controller/User");
const router = express.Router();



router.post('/createuser',createUser);
router.patch('/updatepassword',updateUserPassword);




// router.get('/getproduct',getProducts)
// router.get('/getproductbyid/:id',getProductsById)



exports.router = router;

