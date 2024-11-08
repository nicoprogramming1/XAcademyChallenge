// services/csvDataService.js
const fs = require("fs");
const csv = require("csv-parser");
const Player = require("../models/Player");

exports.processCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const players = [];

    // Leer y procesar el archivo CSV
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // formatea filas para adaptarlas a la clase Player
        players.push({
          longName: row.longName,
          overall: parseInt(row.overall),
          age: parseInt(row.age),
          playerPositions: row.playerPositions,
          bodyType: row.bodyType || null,
          clubName: row.clubName || null,
          heightCm: row.heightCm ? parseInt(row.heightCm) : null,
          nationalityName: row.nationalityName || null,
          preferredFoot: row.preferredFoot || null,
          weightKg: row.weightKg ? parseInt(row.weightKg) : null,
          fifaVersion: parseInt(row.fifaVersion),
          fifaUpdate: parseInt(row.fifaUpdate),
          playerFaceUrl: row.playerFaceUrl || null,
          potential: parseInt(row.potential),
          passing: parseInt(row.passing),
          dribbling: parseInt(row.dribbling),
          shooting: parseInt(row.shooting),
        });
      })
      .on("end", async () => {
        try {
          // Insertar los datos en la base de datos
          await Player.bulkCreate(players);
          resolve();
        } catch (error) {
          reject(new Error("Error al cargar los datos del CSV en la base de datos"));
        }
      })
      .on("error", (error) => {
        reject(new Error("Error al leer el archivo CSV"));
      });
  });
};
