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
    console.error("Error en playerService: ", error);
    throw error;
  }
};

exports.deletePlayer = async (id) => {
  try {
    if (!id || isNaN(id)) {
      throw new Error("ID no válido");
    }

    const playersDestroyed = await Player.destroy({ where: { id } });

    // devuelve true si al menos un jugador fue actualizado
    return playersDestroyed > 0;
  } catch (error) {
    console.error("Error en playerService:", error);
    throw error;
  }
};

exports.updatePlayer = async (id, playerData) => {
  try {
    const [affectedRows] = await Player.update(playerData, {
      where: { id },  // returning: true parece no funcionar en mySql?
    });
    console.log("Las filas afectadas son: ", affectedRows)
    // Si no se ha afectado ninguna fila, lanzamos un error
    if (affectedRows === 0) {
      throw new Error(`El jugador con ID ${id} no pudo ser actualizado`);
    }

    // Recuperamos el jugador actualizado con una consulta adicional
    const updatedPlayer = await Player.findByPk(id);
    console.log("Desde el service, el updatedPlayer: ", updatedPlayer)

    return updatedPlayer;
  } catch (error) {
    console.error("Error en el servicio updatePlayer:", error);
    throw error;
  }
};


