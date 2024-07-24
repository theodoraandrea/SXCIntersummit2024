const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const User = require("../models/user");
const Registration = require("../models/registration");

const BusinessMasterClass = sequelize.define(
  "BusinessMasterClass",
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
    agreement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    sessionType: {
      type: DataTypes.ENUM,
      values: ["Business Case Competition", "Business Plan Competition"],
      allowNull: false,
    },
    question: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    screenshotBMC: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "businessMasterClasses",
    timestamps: true,
  }
);

module.exports = BusinessMasterClass;
