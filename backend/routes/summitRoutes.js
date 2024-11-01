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
    { name: "proofOfPayment", maxCount: 1 },
    { name: "proofOfLikeAndComment", minCount: 1, maxCount: 1 },
  ]),
  [
    body("cityOfResidence")
      .notEmpty()
      .withMessage("City of residence is required"),
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
        "Status msut be High School Student, University Student, Fresh Graduate, Employed, Professional, or Entrepreneur"
      ),
    body("findAboutEvent")
      .notEmpty()
      .withMessage("Find out about event is required"),
    body("statusDetail").notEmpty().withMessage("Status detail is required"),
    body("question").notEmpty().withMessage("Question is required"),
    body("eventExpectation")
      .notEmpty()
      .withMessage("Event Expectation is required"),
  ],
  errorHandling,
  summitControllers.registerSummit
);

router.get(
  "/summary",
  isAuthenticated,
  summitControllers.getSummitRegistration
);

module.exports = router;
