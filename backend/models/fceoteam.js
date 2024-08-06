const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const FCEOTeam = sequelize.define(
  "FCEOTeam",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leaderId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    teamCode: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true,
    },
    proofOfPayment: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "fceoteams",
    timestamps: true,
  }
);

module.exports = FCEOTeam;
