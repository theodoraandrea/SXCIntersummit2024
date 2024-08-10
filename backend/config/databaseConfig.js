const { Sequelize } = require("sequelize");

const database = new Sequelize("sxcsummitdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = database;
