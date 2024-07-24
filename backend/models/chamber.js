const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const User = require("../models/user");
const Registration = require("../models/registration");

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
        model: "registrations",
        key: "id",
      },
    },
    industryType: {
      type: DataTypes.ENUM,
      values: ["Start Up", "BUMN", "FMCG", "Consulting"],
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
