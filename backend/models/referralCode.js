const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const ReferralCode = sequelize.define(
    "ReferralCode",
    {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    eventId: {
        type: DataTypes.INTEGER,
        references: {
            model: "events",
            key: "id",
        },
    },
    competitionId: {
        type: DataTypes.INTEGER,
        references: {
            model: "competitions",
            key: "id"
        }
    },
    code: {
        type: DataTypes.STRING,
        unique: true
    },
    discountPercentage: {
        type: DataTypes.INTEGER
    }
    },
    {
        tableName: "referralcodes",
        timestamps: false
    }
);

module.exports = ReferralCode;
