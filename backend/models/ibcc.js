const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const IBCC = sequelize.define(
  "IBCC",
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
    ibccType: {
      type: DataTypes.ENUM,
      values: ["Team", "Individual"],
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
    screenshotIBCC: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    proofOfPayment: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    cv: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "ibcc",
    timestamps: true,
  }
);

module.exports = IBCC;
