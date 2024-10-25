require("dotenv").config({ path: "./environments/environment.env" });

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { headerMdw } = require("./middleware");
const { playerRouter } = require("./routes");
const sequelize = require("./config/database");

const app = express();

// SETTINGS
app.set("appName", "ownFIFA");
app.set("port", process.env.PORT || 3000);
app.set("case sensitive routing", true);

// MIDDLEWARES
app.use(headerMdw);
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ROUTES
app.use("/player", playerRouter);

// Static files
app.use("/static", express.static(path.join(__dirname, "static")));

// SERVER
app.listen(app.get("port"), async () => {
  console.log(`Server ${app.get("appName")} running on port: ${app.get("port")}`);
  
  try {
    // Primero trata de autenticarse y sincronizarse a la db
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida exitosamente desde app.listen");

    // si necesitara que la estructura de la db cambie desde los modelos:
    // await sequelize.sync({ alter: true }); force: true elimina y recrea tablas

    console.log("Sincronización con la base de datos completada.");
  } catch (error) {
    console.error("Error en la conexión o sincronización con la base de datos:", error);
  }
});
