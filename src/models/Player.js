const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");

class Player extends Model {}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    long_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overall: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  },
  {
    sequelize,
    modelName: "Player",
    tableName: "players",
    timestamps: false,
  }
);

module.exports = Player;
