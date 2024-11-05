const { headerMdw, playerValidation } = require("./headerMdw");
const authMdw = require("./authMiddleware");

module.exports = { headerMdw, playerValidation, authMdw };