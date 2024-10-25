const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config(); // aun no se si va a aqui, debe estar donde conectamos con sequalize

const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// SETTINGS
app.set("appName", "ownFIFA");
app.set("port", 3000);
app.set("case sensitive routing", true);

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Server static files
app.use("/static", express.static(path.join(__dirname, "static")));

// SERVER
app.listen(3000, () => {
  console.log(`Server ${app.get("appName")} on port: ${3000}`);
});
