require("dotenv").config({ path: "./environments/environment.env" });

// Importa el modelo User para que Sequelize lo sincronice
const User = require("./models/User");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { headerMdw, authMdw } = require("./middleware");
const { playerRouter, loginRouter, userRouter } = require("./routes");
const sequelize = require("./config/database");
const passport = require("./util/passportConfig")


const app = express();
app.use(passport.initialize());

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
app.use("/player", authMdw ,playerRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);

// Static files
app.use("/static", express.static(path.join(__dirname, "static")));

// SERVER
app.listen(app.get("port"), async () => {
  console.log(`Server ${app.get("appName")} running on port: ${app.get("port")}`);
  
  try {
    // Primero trata de autenticarse y sincronizarse a la db
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida exitosamente desde app.listen");

    // Esto sincroniza el modelo User con la base de datos para crear la tabla users
    // await User.sync({ force: true });

    console.log("Sincronización con la base de datos completada.");
  } catch (error) {
    console.error("Error en la conexión o sincronización con la base de datos:", error);
  }
});
