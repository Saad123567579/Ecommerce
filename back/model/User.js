const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    image:{type:String}


})

module.exports = mongoose.model('User',userSchema);
















