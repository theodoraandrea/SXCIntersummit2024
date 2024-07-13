const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

router.get("/google", authController.login);
router.get("/google/callback", authController.googleAuthCallback);
router.get("/logout", authController.logout);

module.exports = router;
