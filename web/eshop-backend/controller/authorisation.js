require('dotenv').config();
const jwt = require('jsonwebtoken');
let ObjectId = require('mongodb').ObjectID

const generateToken = (req,res,userId)=>{
    let access_token = jwt.sign({userId},process.env.SECRET_KEY)
    res.token = access_token;
}

const authorization = (req, res,next )=>
{
   
    let token = req.headers.authorization.split(' ')[1]
    if(token !='null')
    {
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(!err)
            {
               
                res.userId = user.userId;
            }
            else
            {
               
                res.send(404)
            }
           
        })
    }
    else{
        res.send(404)
    }
    
    next()
}



module.exports = {
    generateToken,
    authorization
}

