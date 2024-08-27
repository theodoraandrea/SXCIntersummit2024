const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const IBCCMember = sequelize.define(
  "IBCCMember",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    institution: {
      type: DataTypes.STRING,
    },
    batch: {
      type: DataTypes.INTEGER,
    },
    major: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "ibccmembers",
    timestamps: true,
  }
);

module.exports = IBCCMember;
