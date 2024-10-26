const { Sequelize } = require("sequelize");
const config = require("./dbConfig");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  logging: config.logging,
  pool: config.pool,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida exitosamente desde sequelize instance");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
})();

module.exports = sequelize;
