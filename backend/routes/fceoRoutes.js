const express = require("express");
const multer = require("multer");
const router = express.Router();
const fceoControllers = require("../controllers/fceoControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = multer();

router.post(
  "/member",
  upload.fields([{ name: "screenshotFCEO", minCount: 5 }]),
  isAuthenticated,
  fceoControllers.createNewFCEOMember
);
router.post(
  "/team",
  upload.fields([{ name: "proofOfPayment", maxCount: 1 }]),
  isAuthenticated,
  fceoControllers.createNewTeam
);
router.post("/team/check", isAuthenticated, fceoControllers.checkTeam);
router.get(
  "/team/detail/user/:userId",
  isAuthenticated,
  fceoControllers.getTeamDetailsByUserId
);

module.exports = router;
