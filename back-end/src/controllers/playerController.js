const playerService = require("../services/playerService");

exports.getAllPlayers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;

  try {
    const result = await playerService.getAllPlayers(page, limit);
    res.status(200).json({
      success: true,
      message: "Jugadores obtenidos exitosamente",
      data: result,
    });
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener jugadores",
      data: null,
    });
  }
};

exports.getPlayerById = async (req, res) => {
  const id = req.params.id;
  console.log("El id en el controller es: ", id);
  try {
    const result = await playerService.getPlayerById(id);
    res.status(200).json({
      success: true,
      message: "Jugador recuperado con éxito",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Jugador no encontrado",
      data: null,
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
      data: newPlayer,
    });
  } catch (error) {
    console.error("Error al crear jugador:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear jugador",
      data: null,
    });
  }
};

exports.deletePlayer = async (req, res) => {
  const { id } = req.params;

  try {
    const playerDeleted = await playerService.deletePlayer(id);

    if (playerDeleted) {
      return res.status(200).json({
        success: true,
        message: "Jugador eliminado con éxito",
        data: null,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Jugador no encontrado",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error en deletePlayer (controller):", error);
    return res.status(500).json({
      success: false,
      message: "Error al intentar eliminar el jugador",
      data: null,
    });
  }
};
