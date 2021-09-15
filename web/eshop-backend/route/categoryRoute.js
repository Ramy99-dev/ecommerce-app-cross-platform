let express = require('express');
let router = express.Router();
let controller = require('../controller/categoryController')


router.use(express.json())

router.post('/add-categ',controller.addCateg)
router.get('/all-categ',controller.getAllCateg)
router.get('/categ/:id',controller.getCategById)
router.delete('/delete-categ',controller.deleteCateg)
router.put('/edit-categ',controller.editCateg)
module.exports = router;