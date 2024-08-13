const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const ReferralCode = sequelize.define(
    "ReferralCode",
    {
    code: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    discount: {
        type: DataTypes.INTEGER
    },
    fceo: {
        type: DataTypes.TINYINT
    },
    bmc: {
        type: DataTypes.TINYINT
    },
    comvis: {
        type: DataTypes.TINYINT
    },
    chambers: {
        type: DataTypes.TINYINT
    },
    summit: {
        type: DataTypes.TINYINT
    },
    ibc_bcc: {
        type: DataTypes.TINYINT
    },
    ibc_bpc: {
        type: DataTypes.TINYINT
    },
    },
    {
        tableName: "referralcodes",
        timestamps: false
    }
);

module.exports = ReferralCode;
