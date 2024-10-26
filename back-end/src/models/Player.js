const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    player_positions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    club_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height_cm: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nationality_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferred_foot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight_kg: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fifa_version: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fifa_update: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    player_face_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    potential: {
      type: DataTypes.INTEGER,
      allowNull: true,
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