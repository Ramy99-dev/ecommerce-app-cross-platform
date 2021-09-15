let express = require('express');
let router = express.Router();
let controller = require('../controller/productController')
let auth = require('../controller/authorisation')

router.use(express.json())

router.post('/add-prod',controller.addProd)
router.post('/upload-img', controller.upload.single('image'));
router.get('/all-prod',controller.getAllProd)
router.get('/all-prod-pagination/:opt',controller.getProductPagination)
router.get('/search-product/:opt',controller.searchProduct)
router.get('/best-prod',controller.getBestProd)
router.get('/price-interval',controller.getMinMaxPrice)
router.get('/prod-by-id/:id',controller.getProdById)
router.get('/prod-by-categ-id/:id',controller.getProdByCategId)
router.get('/get-product-by-categ/:opt',controller.getProductByCategoryId)
router.delete('/delete-prod',controller.deleteProd)
router.put('/product-sales',auth.authorization,controller.updateProdSales)
router.put('/product-qte',auth.authorization,controller.updateProdQte)
router.put('/edit-prod',controller.editProd)

module.exports = router;