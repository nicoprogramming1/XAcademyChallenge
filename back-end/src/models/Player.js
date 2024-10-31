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
    longName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'long_name'
    },
    overall: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'overall'
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'age'
    },
    playerPositions: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'player_positions'
    },
    bodyType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'body_type'
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'club_name'
    },
    heightCm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'height_cm'
    },
    nationalityName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'nationality_name'
    },
    preferredFoot: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'preferred_foot'
    },
    weightKg: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'weight_kg'
    },
    fifaVersion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'fifa_version'
    },
    fifaUpdate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'fifa_update'
    },
    playerFaceUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'player_face_url'
    },
    potential: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'potential'
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
