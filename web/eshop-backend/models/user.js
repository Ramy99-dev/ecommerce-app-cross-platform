const mongoose = require('mongoose');

let userSchema = mongoose.Schema(
    {
        firstName : {type:String , required:true},
        lastName : {type:String , required:true},
        email : {type:String , required:true},
        password :{type:String , required:true},
        place : {type:String , required:true},
        birthday : {type:Date , required:true},
        gender: {type:String , required:true},
        credit:{type:Number , required:true},
        profile_img:{type:String}
    })

let User = mongoose.model('users',userSchema);

module.exports = User ; 
