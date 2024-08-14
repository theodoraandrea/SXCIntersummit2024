const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { User } = require("../models/index");
const authController = require("../controllers/authControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const otplocalVariable = require("../middlewares/otpLocalVariable");

router.post(
  "/verify-email",
  otplocalVariable,
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid")
      .custom(async (value) => {
        const isEmailExist = await User.findOne({ where: { email: value } });
        if (isEmailExist) throw new Error("Email already in use");
      }),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  authController.verifyEmail
);

router.post(
  "/signup",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid")
      .custom(async (value) => {
        const isEmailExist = await User.findOne({ where: { email: value } });
        if (isEmailExist) throw new Error("Email already in use");
      }),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
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

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
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

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  authController.resetPassword
);

module.exports = router;
