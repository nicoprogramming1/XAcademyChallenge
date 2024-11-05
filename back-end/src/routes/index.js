const express = require("express");
const router = express.Router();
const playerRouter = require("./player");
const loginRouter = require("./login");

module.exports = { playerRouter, loginRouter };
