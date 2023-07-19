const User = require("../model/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const JWT_SECRET_KEY = "1234";
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  
  // try {
    let email = req.body.email;
    let x = await User.find({ "email": email });
    
    
    if (x.length!==0) {
      return res.json("Sorry a user already exists with this email");
    }

    let pass = await bcrypt.hash(req.body.password, salt);
    let user = new User({ ...req.body, password: pass });

    let r = await user.save();
    if (!r) {
      return res.status(404).json("unable to save user");
    }
    const getuser = await User.findOne({email:req.body.email});
    

    const token = jwt.sign({ id: getuser._id }, JWT_SECRET_KEY, {
      expiresIn: "24hr",
    });
    res.cookie(String("token"),token,{
        httpOnly:true,
        path:'/',
        expires:new Date(Date.now() + 1000 * 86400),
      
      
    })
  
    console.log(res.cookies);

    return res
      .status(200)
      .json({ message: "successfully logged in", token: token, user: getuser });

  // } catch (e) {
  //   return res.status(500).json({ error: e });
  // }
};

exports.loginUser = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  const { email, password } = req.body; // Destructure email and password from req.body
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("Invalid Email Or Password");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json("Invalid Email Or Password");
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
      expiresIn: "24hr",
    });
    res.cookie("token",token,{
      httpOnly:true,

        path:'/',
        expires:new Date(Date.now() + 1000 * 86400)
    })
    return res
      .status(200)
      .json({message: "successfully logged in", token: token, user: user, });
  } catch (e) {
    return res.status(50).json({"error":e});
  }
};

exports.verifyToken = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  try {

    console.log(req.cookies);
    const token = req.cookies.token;
    console.log("Token is",req.cookies.token);
    if (!token) {
      return res.status(200).json("Token Not Found");
    }
    jwt.verify(String(token), JWT_SECRET_KEY, (error, info) => {
      if (error) {
        return res.status(404).json({error});
      }
      req.id = info.id;
      next();
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};


exports.getUser = async (req,res,next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');

    let id = req.id
    let user = await User.findById(id,"-password");
    if(!user) {return res.status(404).send("Not Found");}
    return res.status(200).json({user});


}

exports.getUserById = async (req,res,) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  let id = req.params.id
  let user = await User.findById(id,"-password");
  if(!user) {return res.status(404).json("Not Found");}
  return res.status(200).json({user});
}

exports.updateUserById = async (req,res,) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');

try{
  let id = req.params.id;
  let r = await User.findByIdAndUpdate(id,{"image":req.body.image})
  if(!r) return res.status(400).json("something went wrong");
  return res.status(200).json("successfully updated profile picture");
} catch(e){ return res.status(500).json(e);}

}

exports.refreshToken = async(req,res,next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');

    const cookies = req.header.cookie;
    const prevToken = cookies.split("=")[1];
    if(!prevToken){
        return res.status(404).json({"message":"could not find token"}); 
    }
    jwt.verify(String(prevToken),JWT_SECRET_KEY,(err,user)=>{
        if(err) {
            console.log(err);
            return res.status(403).json({"message":"auth failed"});}
        res.clearCookie(`${user.id}`);
        req.cookies([`${user.id}`]) = "";
        const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
            expiresIn: "1hr",
          });
          res.cookie(String(user.id),token,{
              path:'/',
              expires:new Date(Date.now() + 1000 * 30),
              httpOnly:true,
              sameSite:"lax"
          })
          req.id = user.id;
          next();
    })

}

exports.logoutUser = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  try {
   
    
    // Clear the token cookie by setting it to an empty string and expiring it
    res.clearCookie("token");

    return res.status(200).json('Successfully logged out');
  } catch (error) {
    return res.status(500).json('Internal Server Error');
  }
};






//boiling plate for password hashing
//use async counter parts of these 3 fuctions while in production environment

// const bcrypt = require('bcrypt');

// const plaintextPassword = 'myPassword';

// // Generate a salt
// const saltRounds = 10;
// const salt = bcrypt.genSaltSync(saltRounds);

// // Hash the password
// const hashedPassword = bcrypt.hashSync(plaintextPassword, salt);

// // Compare a plaintext password with the hashed password
// const isPasswordMatch = bcrypt.compareSync(plaintextPassword, hashedPassword);

// console.log('Hashed Password:', hashedPassword);
// console.log('Is Password Match:', isPasswordMatch);
