const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const eventRoutes = require("./eventRoutes");
const competitionRoutes = require("./competitionRoutes");

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/events", eventRoutes);
router.use("/competitions", competitionRoutes);

module.exports = router;
