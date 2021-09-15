require('dotenv').config()
let express = require('express')
let router = express.Router();
let controller = require('../controller/cartController')
let auth =  require('../controller/authorisation')


router.post('/add-cart-user',auth.authorization,controller.addCartUser)
router.get('/cart-user',auth.authorization,controller.getCartByUser)
router.get('/cart-length',auth.authorization,controller.getCartLength)
router.delete('/cart-item',auth.authorization,controller.deleteCartItem)
router.delete('/cart',auth.authorization,controller.deleteCart)
router.post('/buy',auth.authorization,controller.buy)

module.exports = router;