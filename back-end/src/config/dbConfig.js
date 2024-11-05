require("dotenv").config();

const config = { 
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.NODE_ENV === "development", // `true` en dev, `false` en otros entornos.
  pool: { // pool de conexiones
    max: 10,    // cantidad máxima de conexiones simultáneas
    min: 0,     // mínima
    acquire: 30000, // tiempo de adquisición máximo de conexión
    idle: 10000,    // tiempo para liberar una conexión inactiva
  },
};

module.exports = config;
