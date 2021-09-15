let express = require('express');
let router = express.Router();
let controller = require('../controller/userController')
let auth =  require('../controller/authorisation')



router.use(express.json())

router.post('/add-user',controller.addUser)
router.get('/user-by-id',auth.authorization,controller.getUserById)
router.get('/all-users',controller.getAllUsers)
router.delete('/delete-user',controller.deleteUser)
router.post('/login',controller.login)
router.put('/add-money',auth.authorization,controller.addMoney)
router.put('/user-credit',auth.authorization,controller.updateUserCredit)
router.put('/edit-user',auth.authorization,controller.editUser)
module.exports = router;