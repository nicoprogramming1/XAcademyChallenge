const passportConfig = require("../util/passportConfig");

const authMdw = passportConfig.authenticate("jwt", { session: false });

module.exports = authMdw;
