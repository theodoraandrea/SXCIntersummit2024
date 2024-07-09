const { Sequelize } = require("sequelize");

const database = new Sequelize("sxcdatabase", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = database;
