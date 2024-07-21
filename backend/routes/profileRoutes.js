const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const profileControllers = require("../controllers/profileControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated, profileControllers.getProfile);

router.put(
  "/",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("fullname")
      .notEmpty()
      .withMessage("Fullname is required")
      .isAlpha("en-US", {
        ignore: " ",
      })
      .withMessage("Fullname must be in alphabets"),
    body("gender")
      .isIn(["Male", "Female"])
      .notEmpty()
      .withMessage("Gender is required and must be male or female"),
    body("institution").notEmpty().withMessage("Institution is required"),
    body("major").optional().isString().withMessage("Major must be a text"),
    body("batch")
      .optional()
      .isInt({
        min: 1,
      })
      .withMessage("Batch must be a valid number"),
    body("phoneNumber")
      .notEmpty()
      .withMessage("Phone number is required")
      .isMobilePhone("id-ID")
      .withMessage("Invalid phone number format for Indonesia"),
  ],
  profileControllers.completeProfile
);

module.exports = router;
