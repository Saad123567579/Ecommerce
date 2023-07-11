const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true,min:[0,'wrong min price'],max:[10000,'wrong max price']},
    discountPercentage:{type:Number,required:true,min:[0,'wrong percentage'],max:[99,'wrong percentage']},
    rating:{type:Number,required:true,default:0},
    stock:{type:Number,required:true,min:[0,'wrong stock enterd']},
    brand:{type:String,required:true},
    category:{type:String,required:true},
    thumbnail:{type:String,required:true},
    images:{type:[String],required:true},





})
const virtual = productSchema.virtual('id');
virtual.get(function(){
    return this._id;

})
productSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})

exports.Product = mongoose.model('Product',productSchema);


