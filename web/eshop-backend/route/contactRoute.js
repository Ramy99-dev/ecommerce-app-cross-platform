let express = require('express');
let router = express.Router();
let controller = require('../controller/contactController')


router.use(express.json())

router.post('/add-contact',controller.addContact);
router.get('/all-contact',controller.getAllContact);
router.get('/contact/:id',controller.getContact);
router.delete('/delete-contact',controller.deleteContact)
module.exports = router;