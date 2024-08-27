const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const IBPC = sequelize.define(
  "IBPC",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    leaderId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamCode: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true,
    },
    question: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    screenshotIBPC: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    proofOfPayment: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    originality: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "ibpc",
    timestamps: true,
  }
);

module.exports = IBPC;