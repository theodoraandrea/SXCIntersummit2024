const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const profileControllers = require("../controllers/profileControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/", isAuthenticated, profileControllers.getProfile);

router.put(
  "/",
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
    body("institution")
      .optional()
      .notEmpty()
      .withMessage("Institution is required"),
    body("major")
      .optional()
      .isAlpha("en-US", {
        ignore: " ",
      })
      .withMessage("Major must be a strings"),
    body("batch")
      .optional()
      .isInt({
        min: 1,
      })
      .withMessage("Batch must be a valid number"),
    body("phoneNumber")
      .optional()
      .notEmpty()
      .withMessage("Phone number is required"),
  ],
  profileControllers.completeProfile
);

module.exports = router;
