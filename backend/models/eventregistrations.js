const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const User = require("./user");
const Event = require("./event");

const EventRegistration = sequelize.define(
  "EventRegistration",
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
    tableName: "eventregistrations",
  }
);

module.exports = EventRegistration;
