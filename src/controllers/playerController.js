const playerService = require("../services/playerService");

exports.getAllPlayers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const result = await playerService.getAllPlayers(page, limit);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al obtener jugadores:", error); // Log más detallado
        res.status(500).send("Error al obtener jugadores");
    }
};
