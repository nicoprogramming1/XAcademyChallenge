const { query, validationResult } = require('express-validator');

const playerValidationRules = () => {
  return [
    query('page').optional().isInt({ min: 1 }).withMessage('La página debe ser un número entero positivo.'),
    query('limit').optional().isInt({ min: 1 }).withMessage('El límite debe ser un número entero positivo.'),
    query('club').optional().isString().withMessage('El club debe ser una cadena de texto.'),
    query('nationality').optional().isString().withMessage('La nacionalidad debe ser una cadena de texto.'),
    query('age').optional().isInt({ min: 0 }).withMessage('La edad debe ser un número entero no negativo.'),
    query('longName').optional().isString().withMessage('El nombre debe ser una cadena de texto.'),
  ];
};

const validatePlayer = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: "Errores de validación", 
      errors: errors.array() 
    });
  }
  next();
};

module.exports = {
  playerValidationRules,
  validatePlayer,
};
