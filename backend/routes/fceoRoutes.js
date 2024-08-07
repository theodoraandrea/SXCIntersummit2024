const express = require("express");
const multer = require("multer");
const router = express.Router();
const { body } = require("express-validator");
const fceoControllers = require("../controllers/fceoControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = multer();

router.post(
  "/member",
  isAuthenticated,
  [
    body("teamCode")
      .notEmpty()
      .withMessage("Team code is required")
      .isLength({ min: 6, max: 6 })
      .withMessage("Team codes consists of 6 characters"),

    body("nationalStudentIdNumber")
      .notEmpty()
      .withMessage("National Student ID Number is required")
      .isNumeric()
      .withMessage("National Student ID Number must be numeric"),

    body("isLeader")
      .notEmpty()
      .withMessage("isLeader is required")
      .isBoolean()
      .withMessage("isLeader must be boolean"),
  ],
  upload.fields([{ name: "screenshotFCEO", minCount: 5 }]),
  fceoControllers.createNewFCEOMember
);
router.post(
  "/team",
  isAuthenticated,
  [body("teamName").notEmpty().withMessage("Team name is required")],
  upload.fields([{ name: "proofOfPayment", maxCount: 1 }]),
  fceoControllers.createNewTeam
);
router.post(
  "/team/check",
  isAuthenticated,
  [
    body("teamCode")
      .notEmpty()
      .withMessage("Team code is required")
      .isLength({ min: 6, max: 6 })
      .withMessage("Team codes consists of 6 characters"),
  ],
  fceoControllers.checkTeam
);
router.get(
  "/team/detail/user/:userId",
  isAuthenticated,
  fceoControllers.getTeamDetailsByUserId
);

module.exports = router;
