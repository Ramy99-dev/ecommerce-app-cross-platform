let User = require('../models/user')
let bcrypt = require('bcrypt')
let auth = require('./authorisation')
const addUser = (req, res) => {
  console.log(req.body.firstName);
   User.findOne({email:req.body.email})
   .then((result)=>{
       if(result==null)
       {
        bcrypt.genSalt().then((val) => {
            bcrypt.hash(req.body.password, val).then((password) => {
                let user = new User(
                    {
                        firstName: req.body.firstname,
                        lastName: req.body.lastname,
                        email: req.body.email,
                        password: password,
                        place: req.body.place,
                        birthday: req.body.birthday,
                        gender: req.body.gender,
                        credit: 0
                    })
                user.save().then((result) => {
                    res.json({registred:true});
                })
                    .catch((err) => {
                        console.log(err);
                    });
            })
        });
       }
       else{
           res.json({registred:false})
       }
   })
    


}

const getUserById = (req ,res) =>{
   if(res.userId != undefined)
   {
    User.findOne({_id:res.userId})
    .then((result)=>{
        if(result!= null)
        {
            let user = {
                firstName : result.firstName,
                lastName  : result.lastName,
                email : result.email,
                place:result.place,
                birthday : result.birthday ,
                gender : result.gender,
                credit : result.credit
            }
            res.json({user:user,connected:true})
        }
        else{
            res.sendStatus(404)
        }
        
    })
    .catch((err)=>{
        res.json({'err':"Error"})
    })
   }
    
}


const getAllUsers = (req, res) => {
    User.find()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
}

const deleteUser = (req , res)=>{
    User.remove({_id:req.body.id})
    .then((result)=>{
        res.json("Deleted")
    })
    .catch((err)=>{
        console.log(err)
    })
}

const updateUserCredit = (req ,res)=>{
   
    User.findOne({_id:res.userId})
    .then((result)=>{
     
        User.updateOne({_id:result._id},{$set:{credit:result.credit - req.body.total}})
        .then((result)=>{
            res.json({msg:'updated succesfully'})
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
    
}

const login = (req,res)=>{
 
    User.findOne({email:req.body.email})
    .then((result)=>{
        if(result==null)
        {
            res.json({"connected":false,"msg":"Compte Introuvable"})
        }
        else
        {
            let id =result._id;
             bcrypt.compare(req.body.password , result.password).then((result)=>{
                 if(result)
                 {
                    auth.generateToken(req,res,id)
                    res.json({"connected":true,"token":res.token})
                 }
                 else
                 {
                    res.json({"connected":false,"msg":"Mot de passe Incorrect"})
                 }
             })
               
        }
    })
}

const addMoney = (req ,res)=>{
    
    User.updateOne({_id:res.userId},{$set:{credit:req.body.newCredit}})
    .then((result) => {
        res.send({ message: 'updated Succesflly' })
      })
      .catch((err) => {
        console.log(err)
      })
}

const editUser = (req ,res)=>{
    console.log(req.body)
    User.updateOne({_id:res.userId},{$set:{
        firstName : req.body.user.firstName,
        lastName : req.body.user.lastName,
        email : req.body.user.email,
        place : req.body.user.place,
        birthday : req.body.user.birthday,
        gender : req.body.user.gender
    }})
    .then((result) => {
        res.send({ message: 'updated Succesflly' })
      })
      .catch((err) => {
        console.log(err)
      })
}

module.exports = {
    addUser,
    getUserById,
    getAllUsers,
    login,
    deleteUser,
    addMoney,
    updateUserCredit,
    editUser
   
}