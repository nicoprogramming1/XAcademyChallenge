const playerService = require("../services/playerService");
const { validationResult } = require("express-validator");
const { playerValidationRules, validatePlayer } = require('../middleware/playerValidation');

exports.getAllPlayers = [
  playerValidationRules(), // Aplicar las reglas de validación
  validatePlayer,          // Validar los parámetros

  async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const club = req.query.club;
    const nationality = req.query.nationality;
    const age = req.query.age ? parseInt(req.query.age) : undefined;
    const longName = req.query.longName;

    try {
      const result = await playerService.getAllPlayers(page, limit, {
        club,
        nationality,
        age,
        longName,
      });
      if (result.players.length === 0) { // verifica si hay jugadores
        return res.status(404).json({
          success: false,
          message: "No existen jugadores",
          data: null,
        });
      }
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
  }
];

exports.filterPlayersExport = [
  playerValidationRules(),   // Reglas de validación
  validatePlayer,             // Validación de los parámetros
  async (req, res) => {
    const { club, nationality, age, longName } = req.query;

    try {
      // Llamamos al servicio para obtener los jugadores filtrados
      const players = await playerService.getFilteredPlayersForExport({
        club,
        nationality,
        age: age ? parseInt(age) : undefined,
        longName,
      });

      // Verificamos si hay jugadores
      if (!players || players.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontraron jugadores para exportar.",
          data: null,
        });
      }

      res.status(200).json({
        success: true,
        message: "Jugadores filtrados obtenidos exitosamente para exportación.",
        data: { players },
      });
    } catch (error) {
      console.error("Error al obtener jugadores para exportación:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener jugadores para exportación.",
        data: null,
      });
    }
  },
];


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

exports.updatePlayer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Datos inválidos",
      errors: errors.array(),
    });
  }

  const { id } = req.params;
  const playerData = req.body;

  try {
    const updatedPlayer = await playerService.updatePlayer(id, playerData);

    if (!updatedPlayer) {
      return res.status(404).json({
        success: false,
        message: "El jugador no se pudo actualizar",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "La actualización se ha realizado con éxito",
      data: updatedPlayer,
    });
  } catch (error) {
    console.error("Error en updatePlayer controller:", error);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error durante la actualización",
      data: null,
    });
  }
};
