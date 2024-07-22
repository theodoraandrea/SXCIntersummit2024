const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const eventRoutes = require("./eventRoutes");

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/events", eventRoutes);

module.exports = router;
