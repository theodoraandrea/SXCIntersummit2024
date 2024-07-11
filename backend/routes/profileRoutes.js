const express = require("express");
const router = express.Router();

const { getProfile } = require("../controllers/authControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated, getProfile);

module.exports = router;
