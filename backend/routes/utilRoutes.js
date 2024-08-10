const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const utilControllers = require("../controllers/utilControllers");

const router = express.Router();

router.post(
    "/referral",
    isAuthenticated,
    utilControllers.checkReferralCode
  );

module.exports = router;


