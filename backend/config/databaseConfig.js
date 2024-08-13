const { Sequelize } = require("sequelize");

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "153.92.15.23",
  dialect: "mysql",
  port:3306
});

module.exports = database;
