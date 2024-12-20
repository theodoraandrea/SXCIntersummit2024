const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const summitControllers = require("../controllers/summitControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const errorHandling = require("../middlewares/errorHandling");

router.post(
  "/",
  isAuthenticated,
  upload.fields([
    { name: "proofOfFollow", minCount: 1, maxCount: 1 },
    { name: "proofOfStory", minCount: 1, maxCount: 1 },
    { name: "proofOfLikeAndComment", minCount: 1, maxCount: 1 },
    // { name: "proofPayment", minCount: 1, maxCount: 1 },
  ]),
  [
    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isIn([
        "High School Student",
        "University Student",
        "Fresh Graduate",
        "Employed",
        "Professional",
        "Entrepreneur",
      ])
      .withMessage(
        "Status must be High School Student, University Student, Fresh Graduate, Employed, Professional, or Entrepreneur"
      ),
    body("eventSource").notEmpty().withMessage("Event source is required"),
    body("allergy")
      .notEmpty()
      .withMessage(
        "Information about allergies and dietary restriction is required"
      ),
    body("question").notEmpty().withMessage("Question is required"),
    body("expectation").notEmpty().withMessage("Event Expectation is required"),
  ],
  errorHandling,
  summitControllers.registerSummit
);

router.post(
  "/check-registration-code",
  isAuthenticated,
  [
    body("summitRegistrationCode")
      .notEmpty()
      .withMessage("Summit Registration Code is required"),
  ],
  summitControllers.checkRegistrationCode
);

router.get(
  "/summary",
  isAuthenticated,
  summitControllers.getSummitRegistration
);

router.post(
  "/send-email-to-all-participants",
  isAuthenticated,
  summitControllers.sendBulkEmail
);

module.exports = router;
