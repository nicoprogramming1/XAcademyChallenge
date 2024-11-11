const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const Roles = require("../models")
const roleMdw = require("../middleware/roleMdw")

router.post("/", roleMdw(Roles.ADMIN), userController.createUser);

module.exports = router;
