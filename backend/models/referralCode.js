const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const ReferralCode = sequelize.define(
    "ReferralCode",
    {
    code: {
        type: DataTypes.STRING,
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
