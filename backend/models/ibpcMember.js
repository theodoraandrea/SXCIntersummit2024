const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const IBPCMember = sequelize.define(
  "IBPCMember",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    teamId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ibpc",
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
  },
  {
    tableName: "ibpcmembers",
    timestamps: true,
  }
);

module.exports = IBPCMember;
