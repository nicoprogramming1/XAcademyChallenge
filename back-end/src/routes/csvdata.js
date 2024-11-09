const express = require("express");
const router = express.Router();
const uploadCSVMdw = require("../middleware/multerMdw");
const csvDataController = require("../controllers/csvDataController");

router.post("/", uploadCSVMdw.single("csvFile"), csvDataController.uploadCSV);
router.get("/", csvDataController.downloadCSV);

module.exports = router;