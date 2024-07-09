const express = require("express");
const router = express.Router();

const { getProfile } = require("../controllers/profileController");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated, getProfile);

module.exports = router;
