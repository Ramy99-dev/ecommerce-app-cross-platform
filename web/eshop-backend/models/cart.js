const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

let cartSchema = mongoose.Schema(
    {
        user:{type:ObjectId , required:true , ref:'User'},
        products:{type:Array, required:true },
        
    })

let Cart = mongoose.model('cart',cartSchema);

module.exports = Cart ; 
