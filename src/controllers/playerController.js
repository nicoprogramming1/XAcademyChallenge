const playerService = require("../services/playerService");

exports.getAllPlayers = async (req, res) => {
    try {
        const players = await playerService.getAllPlayers();
        res.json(players);
    } catch (error) {
        res.status(500).send("Error al obtener jugadores");
    }
};