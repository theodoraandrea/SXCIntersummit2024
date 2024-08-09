const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { User } = require("../models/index");
const authController = require("../controllers/authControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const otplocalVariable = require("../middlewares/otpLocalVariable");

router.post(
  "/signup",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.signup
);
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),

    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login
);

router.post(
  "/forgot-password",
  otplocalVariable,
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),
  ],
  authController.forgotPassword
);

router.post(
  "/verify-otp",
  [
    body("otpCode")
      .notEmpty()
      .withMessage("OTP Code is required")
      .isLength({ min: 6, max: 6 })
      .withMessage("OTP has 6 digits of code"),
  ],
  authController.verifyOTP
);

router.put(
  "/reset-password",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),

    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.resetPassword
);

module.exports = router;
