const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const FCEOMember = sequelize.define(
  "FCEOMember",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    registrationId: {
      type: DataTypes.INTEGER,
      references: {
        model: "competitionregistrations",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    nationalStudentIdNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.INTEGER,
      references: {
        model: "fceoteams",
        key: "id",
      },
      allowNull: false,
    },
    isLeader: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    screenshotFCEO: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "fceomembers",
    timestamps: true,
  }
);

module.exports = FCEOMember;
