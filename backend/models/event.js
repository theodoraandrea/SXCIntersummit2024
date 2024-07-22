const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

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
    eventLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "events",
  }
);

module.exports = Event;
