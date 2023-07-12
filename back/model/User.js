const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    token:{type:String}


})

exports.User = mongoose.model('User',userSchema);


