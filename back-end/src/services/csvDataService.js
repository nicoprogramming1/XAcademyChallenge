const path = require("path")
const csv = require("csv-parser");
const fs = require("fs");
const { parse } = require('json2csv');
const Player = require("../models/Player");

exports.importCSV = (filePath) => {
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

exports.exportCSV = async () => {
  try {
    const players = await Player.findAll(); // Obtiene todos los jugadores de la base de datos

    if (!players || players.length === 0) {
      throw new Error('No hay jugadores para exportar.');
    }

    // Convertimos los jugadores a formato CSV
    const csvData = parse(players.map(player => player.toJSON()));

    const filePath = path.join(__dirname, '../files/exports', `database_export_${Date.now()}.csv`);
    fs.writeFileSync(filePath, csvData); // Guardamos el archivo CSV en disco

    return filePath; // Retornamos la ruta del archivo
  } catch (error) {
    console.error("Error al generar el archivo CSV:", error);
    throw new Error('No se pudo generar el archivo CSV.');
  }
};
