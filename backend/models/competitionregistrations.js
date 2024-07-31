const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const User = require("../models/user");
const Competition = require("../models/competition");

const CompetitionRegistration = sequelize.define(
  "CompetitionRegistration",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    competitionId: {
      type: DataTypes.INTEGER,
      references: {
        model: "competitions",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "competitionregistrations",
  }
);

module.exports = CompetitionRegistration;
