const Cart = require("../models/cart");
const User = require("../models/user");
const Product = require("../models/product")



const addCartUser = (req ,res  )=>{
    Cart.findOne({user:res.userId})
    .then((result)=>{
       
        if(result != null)
        {
            let contains = false;
            for (const prod in result.products) {
                if(req.body.product == result.products[prod].product)
                {
                    contains=true;
                }
            }
            if(contains == false)
            {
                Cart.updateOne({user:result.user},{$push :{products:req.body}})
            .then((result) => {
                res.json({ message: 'OK' })
              })
              .catch((err) => {
                console.log(err)
              })
            
            }
            else{
                res.json({message:'NOK'})
            }
            
        }
        else{
            req.body.user = res.userId;
            let cart = new Cart(req.body)
            cart.products.push(req.body)
            cart.save()
            .then((result)=>{
                res.send({message:'OK'})
            })
            .catch((err)=>{
           
            })
        }
    })
    .catch((err)=>{
        console.log(err)
    })
    
    
}


const getCartLength = (req ,res )=>{
    
    Cart.findOne({user:res.userId})
    .then((result)=>{
        if(result !=null)
        {
            res.json({length:result.products.length})
        }
        else{
            res.json({length:0})
        }
        
    })
    .catch((err)=>{
        console.log(err)
    })

}

const getCartByUser = (req , res)=>{
    Cart.find({user:res.userId})
    .then((result)=>{
        res.json({result})
    })
    .catch((err)=>{
        console.log(err)
    })
}

const deleteCartItem = (req,res)=>
{
  
    
  Cart.updateOne({_id:req.body.cartId},{$pull:{products:{id:req.body.prodId}}})
  .then((result)=>{
      res.send("Removed Successfully")
  })
  .catch((err)=>{
      console.log(err)
  })
}

const deleteCart = (req , res)=>{
    Cart.remove({user:res.userId})
      .then((result)=>{
          res.json({msg:"Deleted"})
      })
      .catch((err)=>{
          console.log(err)
      })
}

const buy = (req ,res)=>{
  User.findOne({_id:res.userId})
  .then((result)=>{
    if((result.credit - req.body.total)>=0)
    {
      res.json({buy:'OK'})
    }
    else{
        res.json({buy:'NOK'})
    }
  })
  .catch((err)=>{
      console.log(err)
  })
}

module.exports = {
    getCartByUser,
    addCartUser,
    getCartLength,
    deleteCart,
    deleteCartItem,
    buy
}