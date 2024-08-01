const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const User = require("../models/user");
const EventRegistration = require("../models/eventregistrations");

const Summit = sequelize.define(
  "Summit",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    registrationId: {
      type: DataTypes.INTEGER,
      references: {
        model: "eventregistrations",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        "High School Student",
        "University Student",
        "Fresh Graduate",
        "Employed",
        "Professional",
        "Entrepreneur",
      ],
      allowNull: false,
    },

    statusDetail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    screenshotSummit: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "summits",
    timestamps: true,
  }
);

module.exports = Summit;
