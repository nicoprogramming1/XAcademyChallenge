const playerService = require("../services/playerService");

exports.getAllPlayers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const result = await playerService.getAllPlayers(page, limit);
        res.status(200).json({
            success: true,
            message: "Jugadores obtenidos exitosamente",
            data: result
        });
    } catch (error) {
        console.error("Error al obtener jugadores:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener jugadores",
            data: null
        });
    }
};

exports.createPlayer = async (req, res) => {
    try {
        const playerData = req.body;
        const newPlayer = await playerService.createPlayer(playerData);
        
        res.status(201).json({
            success: true,
            message: "Jugador creado exitosamente",
            data: newPlayer
        });
    } catch (error) {
        console.error("Error al crear jugador:", error);
        res.status(500).json({
            success: false,
            message: "Error al crear jugador",
            data: null
        });
    }
};