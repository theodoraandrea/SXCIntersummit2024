const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const User = require("../models/user");
const EventRegistration = require("../models/eventregistrations");

const Chamber = sequelize.define(
  "Chamber",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    registrationId: {
      type: DataTypes.INTEGER,
      references: {
        model: "eventregistrations",
        key: "id",
      },
    },
    industryType: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    cv: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    question: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    screenshotChambers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "chambers",
    timestamps: true,
  }
);

module.exports = Chamber;
