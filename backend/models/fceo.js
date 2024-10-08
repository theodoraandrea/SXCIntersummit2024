const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const FCEO = sequelize.define(
  "FCEO",
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
    region: {
      type: DataTypes.STRING,
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
      allowNull: false,
    },
    screenshotFCEO: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    referralCode: {
      type: DataTypes.STRING,
      references : {
        model: "referralcodes",
        key: "code"
      }
    }
  },
  {
    tableName: "fceo",
    timestamps: true,
  }
);

module.exports = FCEO;
