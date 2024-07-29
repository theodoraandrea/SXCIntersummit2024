const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const eventRoutes = require("./eventRoutes");
const fceoRoutes = require("./fceoRoutes");

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/events", eventRoutes);
router.use("/fceo");

module.exports = router;
