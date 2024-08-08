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
    teamId: {
      type: DataTypes.INTEGER,
      references: {
        model: "fceo",
        key: "id",
      },
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["Male", "Female"],
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    school: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "fceomembers",
    timestamps: true,
  }
);

module.exports = FCEOMember;
