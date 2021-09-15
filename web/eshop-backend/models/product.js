const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

let productSchema = mongoose.Schema(
    {
        name : {type:String , required:true},
        category : {type: ObjectId , ref: "Category" , required:true},
        description:{type:String , required:true},
        price : {type:Number , required:true},
        qte :{type:Number , required:true},
        sales:{type:Number },
        product_img:{type:String ,  required:true},
        date: { type: Date, default: Date.now }
    })

let Product = mongoose.model('product',productSchema);

module.exports = Product ; 