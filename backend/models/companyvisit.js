const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const User = require("../models/user");

const CompanyVisit = sequelize.define(
  "CompanyVisit",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
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
    tableName: "companyvisits",
    timestamps: true,
  }
);

// CompanyVisit.belongsTo(User, {
//   onDelete: "CASCADE",
// });

module.exports = CompanyVisit;
