const express = require("express");

const router = express.Router();
const competitionControllers = require("../controllers/competitionControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get(
  "/",
  isAuthenticated,
  competitionControllers.getRegisteredCompetitionsByUser
);
router.get("/all", competitionControllers.getAllCompetitions);
router.get("/twoComps", competitionControllers.getTwoLatestCompetitions);

module.exports = router;
