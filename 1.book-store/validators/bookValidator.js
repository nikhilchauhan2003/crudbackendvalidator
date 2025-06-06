const { body, validationResult } = require('express-validator');

function results(req,res,next) {
const errors = validationResult(req);

if(!errors.isEmpty()){
    return res.status(400).json({errors})
}
next()
}

const validateUpdateBook = [
  body('name').notEmpty().withMessage('Name is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('pages').isInt({ min: 1 }).withMessage('Pages must be a positive integer'),
  results
];

module.exports = validateUpdateBook;
