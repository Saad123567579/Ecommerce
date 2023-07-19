const express = require("express");
const router = express.Router();
const {createUser,loginUser,verifyToken,getUser,getUserById,refreshToken,logoutUser,updateUserById} = require("../controller/User");

router.post('/createuser',createUser);
router.post('/login',loginUser);
router.get('/getuser',verifyToken,getUser);
router.get('/refresh',refreshToken,verifyToken,getUser);
router.get('/logout',verifyToken,logoutUser);
router.get('/getuserbyid/:id',getUserById);
router.patch('/updateuserbyid/:id',updateUserById);


// router.get('/logout',verifyToken,logoutUser);


exports.router = router;

