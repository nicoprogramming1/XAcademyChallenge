const { User } = require("../models");

exports.createUser = async (userData) => {
  try {
    const newPlayer = await User.create(userData);
    return newPlayer;
  } catch (error) {
    console.error("Error en userService: ", error);
    throw error;
  }
};
