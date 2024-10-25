const sequelize = require("../config/database");
const { Player } = require("../models"); // Asumiendo que tienes un modelo Player

exports.getAllPlayers = async () => {
    return await Player.findAll(); // Devuelve todos los jugadores
};