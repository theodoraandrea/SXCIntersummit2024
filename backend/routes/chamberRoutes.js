const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const chamberControllers = require("../controllers/chamberControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const errorHandling = require("../middlewares/errorHandling");

router.post(
  "/",
  isAuthenticated,
  upload.fields([
    { name: "cv", minCount: 1, maxCount: 1 },
    { name: "proofOfFollow", minCount: 1, maxCount: 1 },
    { name: "proofOfStory", minCount: 1, maxCount: 1 },
    { name: "proofOfBroadcast", minCount: 1, maxCount: 1 },
  ]),
  [
    body("registerReason")
      .notEmpty()
      .withMessage("Answer for reason of registration is required"),
    body("attendingExpectation")
      .notEmpty()
      .withMessage("Answer for attending expectation is required"),
    body("industryType")
      .isArray({ min: 2, max: 4 })
      .withMessage(
        "Industry Type must include a minimum of 2 choices and a maximum of 4 choices"
      ),
    body("industryType.*")
      .isIn(["StartUp", "FMCG", "BUMN", "Consulting"])
      .withMessage("Industry Type must be StartUp, FMCG, BUMN, or Consulting"),
  ],
  errorHandling,
  chamberControllers.registerChamber
);

router.get(
  "/summary",
  isAuthenticated,
  chamberControllers.getChamberRegistration
);

module.exports = router;
