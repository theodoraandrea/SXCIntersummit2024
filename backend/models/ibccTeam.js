const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const IBCC_Team = sequelize.define(
  "IBCC_Team",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    leaderId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personalEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamCode: {
      type: DataTypes.STRING(6),
      unique: true,
    },
    eventSource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    twibbonLinks: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    screenshotIBCC: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    proofOfPayment: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    cv: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    paymentType: {
      type: DataTypes.ENUM,
      values: ["Referral", "Early", "Normal", "Late"],
      allowNull: false,
    },
    referralCode: {
      type: DataTypes.STRING,
      references : {
        model: "referralcodes",
        key: "code"
      },
      allowNull: true,
    },
    paymentChannel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentBank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payerBankAccName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transferDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: "ibccteam",
    timestamps: true,
  }
);

module.exports = IBCC_Team;
