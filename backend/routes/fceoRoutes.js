const express = require("express");

const router = express.Router();
const fceoControllers = require("../controllers/fceoControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/member", isAuthenticated, fceoControllers.createNewFCEOMember);
router.post("/team", isAuthenticated, fceoControllers.createNewTeam);
router.get(
  "/team/detail/user/:userId",
  isAuthenticated,
  fceoControllers.getTeamDetailsByUserId
);

module.exports = router;
