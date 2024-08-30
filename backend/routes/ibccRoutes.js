const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const ibccControllers = require("../controllers/ibccControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const errorHandling = require("../middlewares/errorHandling");

router.post(
  "/newTeam",
  isAuthenticated,
  upload.fields([
    { name: "proofOfPayment", maxCount: 1 },
    { name: "studentId", maxCount: 1 },
    { name: "cv", maxCount: 1 },
    { name: "proofOfFollow", maxCount: 1 },
    { name: "proofOfStory", maxCount: 1 },
    { name: "proofOfComment", maxCount: 1 },
  ]),
  errorHandling,
  ibccControllers.createNewTeam
);

router.post(
  "/newMember",
  isAuthenticated,
  [
    body("fullname")
      .notEmpty()
      .withMessage("Fullname is required")
      .isAlpha("en-US", {
        ignore: " ",
      })
      .withMessage("Fullname must be in strings"),
    body("personalEmail")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),
    body("university").notEmpty().withMessage("University is required"),
    body("batch")
      .isInt({
        min: 1,
      })
      .withMessage("Batch must be a valid number"),
    body("phoneNumber").notEmpty().withMessage("Phone number is required"),
    body("major").notEmpty().withMessage("Major is required"),
  ],
  ibccControllers.createNewIBCCMember
);

router.post(
    "/newSolo",
    isAuthenticated,
    upload.fields([
        { name: "proofOfPayment", maxCount: 1 },
        { name: "studentId", maxCount: 1 },
        { name: "cv", maxCount: 1 },
        { name: "proofOfFollow", maxCount: 1 },
        { name: "proofOfStory", maxCount: 1 },
        { name: "proofOfComment", maxCount: 1 },
      ]),
      errorHandling,
      ibccControllers.createNewSolo
);

router.get(
    "/team",
    isAuthenticated,
    ibccControllers.getTeamRegistrationDetails
)

router.get(
    "/individual",
    isAuthenticated,
    ibccControllers.getSoloRegistrationDetails
)

module.exports = router;
