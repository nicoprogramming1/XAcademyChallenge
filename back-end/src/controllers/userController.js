const userService = require("../services/userService")
const { validationResult } = require("express-validator");
const { playerValidationRules, validatePlayer } = require('../middleware/playerValidation');