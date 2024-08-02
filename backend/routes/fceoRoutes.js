const express = require("express");
const multer = require("multer");
const router = express.Router();
const fceoControllers = require("../controllers/fceoControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = multer();

router.post("/member", isAuthenticated, fceoControllers.createNewFCEOMember);
router.post(
  "/team",
  upload.fields([{ name: "proofOfPayment", maxCount: 1 }]),
  isAuthenticated,
  fceoControllers.createNewTeam
);
router.get(
  "/team/detail/user/:userId",
  isAuthenticated,
  fceoControllers.getTeamDetailsByUserId
);

module.exports = router;
