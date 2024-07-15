const { Sequelize } = require("sequelize");

const database = new Sequelize("sxcdatabase", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = database;
