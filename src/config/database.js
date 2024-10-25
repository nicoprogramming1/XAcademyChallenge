const { Sequelize } = require("sequelize");
const { config } = require("./dbConfig");

const sequelize = new Sequelize(config);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida exitosamente.");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
})();

module.exports = sequelize;
