const crypto = require('crypto');
const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");
const Registration = require("../models/registration");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["Male", "Female"],
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    institution: {
      type: DataTypes.STRING,
    },
    major: {
      type: DataTypes.STRING,
    },
    batch: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },

    studentIdCard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    screenshotSxC: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        user.salt = crypto.randomBytes(16).toString('hex');
        user.password = hashPassword(user.password, user.salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.salt = crypto.randomBytes(16).toString('hex');
          user.password = hashPassword(user.password, user.salt);
        }
      }
    }
});

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha256').toString('hex');
}

User.prototype.validatePassword = function(password) {
  const hashedPassword = hashPassword(password, this.salt);
  return this.password === hashedPassword;
}

module.exports = User;
