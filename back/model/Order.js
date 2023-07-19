const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    userid:{type:String,required:true},
    city:{type:String,required:true},
    address:{type:String,required:true},
    
    payment:{type:String,required:true},
    total:{type:Number,required:true},
    status:{type:String,required:true},
    items:{type:[Object],required:true},





})


exports.Order = mongoose.model('Order',orderSchema);


