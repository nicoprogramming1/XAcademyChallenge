const { Player } = require("../models");

exports.getAllPlayers = async (page = 1, limit = 9) => {
  if (page < 1 || limit < 1) {
    throw new Error("La página y el límite deben ser positivos");
  }

  const offset = (page - 1) * limit;
  try {
    const players = await Player.findAll({
      limit: limit,
      offset: offset,
    });
    const totalCount = await Player.count();
    return {
      players,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error en playerService:", error);
    throw new Error(`Error al recuperar los jugadores: ${error.message}`);
  }
};

exports.getPlayerById = async (id) => {
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      throw new Error(`El jugador con el id: ${id} no existe`);
    }
    return player;
  } catch (error) {
    console.error("Error en playerService: ", error);
    throw new Error(`Error al recuperar el jugador: ${error.message}`);
  }
};


exports.createPlayer = async (playerData) => {
  try {
    const newPlayer = await Player.create(playerData);
    return newPlayer;
  } catch (error) {
    console.error("Error en playerService:", error);
    throw error;
  }
};
