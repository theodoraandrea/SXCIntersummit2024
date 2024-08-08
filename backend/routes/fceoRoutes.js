const express = require("express");
const multer = require("multer");
const router = express.Router();
const fceoControllers = require("../controllers/fceoControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = multer();

router.post(
  "/member",
  isAuthenticated,
  fceoControllers.createNewFCEOMember
);

router.post(
  "/team",
  upload.fields([
    { name: "proofPayment", minCount: 1, maxCount: 1 },
    { name: "studentIds", minCount: 1, maxCount: 1},
    { name: "proofFollow", minCount: 1, maxCount: 1},
    { name: "proofTwibbon", minCount: 1, maxCount: 1},
    { name: "proofStory", minCount: 1, maxCount: 1},
  ]),
  isAuthenticated,
  fceoControllers.createNewTeam
);
router.post("/team/check", isAuthenticated, fceoControllers.checkTeam);
router.get(
  "/summary",
  isAuthenticated,
  fceoControllers.getTeamDetailsByUserId
);

module.exports = router;
