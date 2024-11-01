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
    cityOfResidence: {
      type: DataTypes.STRING,
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
    proofOfPayment: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    proofOfFollow: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    proofOfStory: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    proofOfLikeAndComment: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    eTicket: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "summits",
    timestamps: true,
  }
);

module.exports = Summit;
