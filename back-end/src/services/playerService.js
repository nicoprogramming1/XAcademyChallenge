const { Player } = require("../models");

exports.getAllPlayers = async (page = 1, limit = 10) => {
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
    throw error; // Relanzar el error para que el controlador pueda manejarlo
  }
};

exports.createPlayer = async (playerData) => {
    try {
      const newPlayer = await Player.create(playerData)
      return newPlayer
    } catch (error) {
      console.error("Error en playerService:", error);
      throw error;
    }
  };