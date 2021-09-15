
const mongoose = require('mongoose');
const Produit = require('../models/product')


let categorySchema = mongoose.Schema(
    {
        name:{type:String}
    })
    
categorySchema.pre('deleteOne', function(next,req) {
        console.log()
        Produit.deleteMany({category:this._conditions._id}).exec();
        next();
});

let Category = mongoose.model('category',categorySchema);



module.exports = Category ; 
