const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const eventRoutes = require("./eventRoutes");
const fceoRoutes = require("./fceoRoutes");
const chamberRoutes = require("./chamberRoutes");
const ibccRoutes = require("./ibccRoutes");
const ibpcRoutes = require("./ibpcRoutes");
const competitionRoutes = require("./competitionRoutes");
const utilRoutes = require("./utilRoutes");
const companyVisitRoutes = require("./companyVisitRoutes");
const summitRoutes = require("./summitRoutes");

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/events", eventRoutes);
router.use("/chamber", chamberRoutes);
router.use("/summit", summitRoutes);
router.use("/fceo", fceoRoutes);
router.use("/ibcc", ibccRoutes);
router.use("/ibpc", ibpcRoutes);
router.use("/competitions", competitionRoutes);
router.use("/company-visit", companyVisitRoutes);
router.use("/", utilRoutes);

module.exports = router;
