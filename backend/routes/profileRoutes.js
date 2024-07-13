const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const checkCompletedProfile = require("../middlewares/checkCompletedProfile");

router.get("/", isAuthenticated, authControllers.getProfile);

/**
 * If login -> to /
 * If signup -> to /completeProfile page to fill the extra detail form then submit with PUT /completeProfile.
 */
router.get(
  "/completeProfile",
  isAuthenticated,
  checkCompletedProfile,
  authControllers.getCompleteProfile
);

router.put(
  "/completeProfile",
  isAuthenticated,
  checkCompletedProfile,
  authControllers.completeProfile
);

module.exports = router;
