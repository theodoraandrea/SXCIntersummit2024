const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const User = require("../models/user");
const Event = require("../models/event");
const Chamber = require("../models/chamber");

const Registration = sequelize.define(
  "Registration",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: "events",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "registrations",
  }
);

module.exports = Registration;
