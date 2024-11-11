const express = require("express");
const router = express.Router();
const uploadCSVMdw = require("../middleware/multerMdw");
const csvDataController = require("../controllers/csvDataController");
const Roles = require("../models")
const roleMdw = require("../middleware")

router.post("/", roleMdw(Roles.ADMIN), uploadCSVMdw.single("csvFile"), csvDataController.uploadCSV);
router.get("/", csvDataController.downloadCSV);

module.exports = router;