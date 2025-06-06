const express = require('express');
const router = express.Router();
const controller = require('../controler/usercontroller');

router.post('/addBooks', controller.createBook);
router.get('/', controller.fetchbook); 
router.put('/updatebook/:id',controller.updatebook)
router.delete('/deletebook/:id',controller.deletebook)
module.exports = router;
