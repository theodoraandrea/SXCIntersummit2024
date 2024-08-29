const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const ibpcControllers = require("../controllers/ibpcControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const errorHandling = require("../middlewares/errorHandling");

router.post(
  "/team",
  isAuthenticated,
  upload.fields([
    { name: "proofOfPayment", maxCount: 1 },
    { name: "studentIds", maxCount: 1 },
    { name: "proofOfFollow", maxCount: 1 },
    { name: "proofOfTwibbon", maxCount: 1 },
    { name: "proofOfStory", maxCount: 1 },
    { name: "originalityStatement", maxCount: 1 },
    { name: "proofOfComment", maxCount: 1 },
  ]),
  [
    body("teamName").notEmpty().withMessage("Team name is required"),
    body("question").notEmpty().withMessage("Question is required"),
  ],
  errorHandling,
  ibpcControllers.createNewTeam
);

router.post(
  "/member",
  isAuthenticated,
  [
    body("fullname")
      .notEmpty()
      .withMessage("Fullname is required")
      .isAlpha("en-US", {
        ignore: " ",
      })
      .withMessage("Fullname must be in strings"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),
    body("institution").notEmpty().withMessage("School/University is required"),
    body("batch")
      .isInt({
        min: 1,
      })
      .withMessage("Batch must be a valid number"),
    body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  ],
  ibpcControllers.createNewIBPCMember
);

module.exports = router;
