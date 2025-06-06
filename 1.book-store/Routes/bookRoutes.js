// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../Controller/bookController.js');
const validateUpdateBook = require('../validators/bookValidator.js');

router.get('/', bookController.getAllBook);
router.get('/:id', bookController.getBooksById);
router.post('/create', validateUpdateBook,bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;

