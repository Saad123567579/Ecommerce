const { User } = require("../model/User");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
      const user = new User(req.body);
      var token = jwt.sign({email:req.body.email},'shhh')
      user.token = token ;
      const response = await user.save();
      if (!response) {
        return res.status(404).send("Unable to create user");
      }
      return res.status(200).send("User Successfully Created");
    } catch (error) {
        console.log(error);
      return res.status(500).json(error);
    }
  };
  

exports.updateUserPassword = async (req, res) => {
  
};

  


