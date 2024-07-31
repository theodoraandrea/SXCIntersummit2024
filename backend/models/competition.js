const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const Competition = sequelize.define(
  "Competition",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    competitionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    competitionLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    competitionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "competitions",
  }
);

module.exports = Competition;
