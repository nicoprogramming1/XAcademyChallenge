const express = require("express");
const router = express.Router();
const { playerController } = require("../controllers");

// llamada a getAllPlayers: GET /player?page=1&limit=10
router.get("/", playerController.getAllPlayers);

router.post("/", playerController.createPlayer);

/* 
router.get("/:id", playerController.getPlayerById);
router.put("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer); */

module.exports = router;