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
    shortDesc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    competitionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    openRegistration: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    showDetail: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },
  {
    tableName: "competitions",
  }
);

module.exports = Competition;
