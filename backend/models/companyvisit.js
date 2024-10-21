const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const User = require("../models/user");
const EventRegistration = require("../models/eventregistrations");

const CompanyVisit = sequelize.define(
  "CompanyVisit",
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
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attendanceType: {
      type: DataTypes.ENUM,
      values: ["online", "offline"],
      allowNull: false,
    },
    GPA: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    domicile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    screenshotCompanyVisit: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "companyvisit",
    timestamps: true,
  }
);

module.exports = CompanyVisit;
