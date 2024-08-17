const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

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
        model: "eventregistrations",
        key: "id",
      },
    },
    agreement: {
      type: DataTypes.JSON,
      allowNull: true,
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
    referralCode: {
      type: DataTypes.STRING,
      references: {
        model: "referralcodes",
        key: "code"
      }
    }
  },
  {
    tableName: "businessmasterclasses",
    timestamps: true,
  }
);

module.exports = BusinessMasterClass;
