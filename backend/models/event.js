const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const EventRegistration = require("../models/eventregistrations");

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDesc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    openRegistration: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },
  {
    tableName: "events",
  }
);

module.exports = Event;
