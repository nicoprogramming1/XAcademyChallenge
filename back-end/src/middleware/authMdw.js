const { passportConfig } = require("../util");

const authMiddleware = passportConfig.authenticate("jwt", { session: false });

module.exports = authMiddleware;
