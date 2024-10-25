require("dotenv").config({ path: './environments/environment.env' })

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { headerMdw } = require("./middleware");

const path = require("path");
const app = express();

// SETTINGS
app.set("appName", "ownFIFA");
app.set("port", process.env.PORT);
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

// Server static files
app.use("/static", express.static(path.join(__dirname, "static")));

// SERVER
app.listen(app.get("port"), () => {
  console.log(`Server ${app.get("appName")} on port: ${app.get("port")}`);
});
