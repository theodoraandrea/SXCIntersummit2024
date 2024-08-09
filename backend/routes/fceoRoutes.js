const express = require("express");
const multer = require("multer");
const router = express.Router();
const { body } = require("express-validator");
const fceoControllers = require("../controllers/fceoControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const errorHandling = require("../middlewares/errorHandling");

router.post(
  "/member",
  isAuthenticated,
  [
    body("fullname")
      .optional()
      .notEmpty()
      .withMessage("Fullname is required")
      .isAlpha("en-US", {
        ignore: " ",
      })
      .withMessage("Fullname must be in strings"),
    body("gender")
      .optional()
      .isIn(["Male", "Female"])
      .withMessage("Gender must be male or female"),
    body("school").optional().notEmpty().withMessage("School is required"),
    body("phoneNumber")
      .optional()
      .notEmpty()
      .withMessage("Phone number is required"),
    body("email")
      .optional()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),
  ],
  fceoControllers.createNewFCEOMember
);

router.post(
  "/team",
  isAuthenticated,
  upload.fields([
    { name: "proofPayment", maxCount: 1 },
    { name: "studentIds", maxCount: 1 },
    { name: "proofFollow", maxCount: 1 },
    { name: "proofTwibbon", maxCount: 1 },
    { name: "proofStory", maxCount: 1 },
  ]),
  [body("teamName").notEmpty().withMessage("Team name is required")],
  errorHandling,
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

router.get("/summary", isAuthenticated, fceoControllers.getTeamDetailsByUserId);

module.exports = router;
