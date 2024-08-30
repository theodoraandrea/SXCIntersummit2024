const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const IBCC_Member = sequelize.define(
  "IBCC_Member",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teamId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ibcc",
        key: "id",
      },
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personalEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batch: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    major: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ibccMembers",
    timestamps: true,
  }
);

module.exports = IBCC_Member;
