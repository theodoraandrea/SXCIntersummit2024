const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
  console.log("in isAuthenticated");

  // Check for a custom header to bypass redirect in Postman
  if (req.headers["x-postman-test"]) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  res.redirect("/");
};
