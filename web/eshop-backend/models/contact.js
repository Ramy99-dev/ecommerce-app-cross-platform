const mongoose = require('mongoose');


let contactSchema = mongoose.Schema(
    {
        subject:{type:String },
        email:{type:String , required:true },
        msg:{type:String, required:true },
        
    })

let Contact = mongoose.model('contact',contactSchema);

module.exports = Contact ; 
