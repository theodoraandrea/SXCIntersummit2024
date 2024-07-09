const express = require("express");
const authRouter = express.Router();

// Import Passport configuration
const passportConfig = require("../config/passport");

// Import controllers
const {
  login,
  logout,
  googleAuthCallback,
} = require("../controllers/authController");

// Google authentication route
authRouter.get(
  "/google",
  passportConfig.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
authRouter.get(
  "/google/callback",
  passportConfig.authenticate("google", { failureRedirect: "/" }),
  googleAuthCallback
);

// Logout route
authRouter.get("/logout", logout);

module.exports = authRouter;
