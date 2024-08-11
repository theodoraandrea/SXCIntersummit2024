const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const eventControllers = require("../controllers/eventControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const errorHandling = require("../middlewares/errorHandling");

router.get("/", isAuthenticated, eventControllers.getRegisteredEventsByUser);
router.get("/all", eventControllers.getAllEvents);

router.post(
  "/BMC",
  isAuthenticated,
  upload.fields([
    { name: "agreement", minCount: 1, maxCount: 1 },
    { name: "screenshot1", minCount: 1, maxCount: 1 },
    { name: "screenshot2", minCount: 1, maxCount: 1 },
    { name: "screenshot3", minCount:1, maxCount: 1 },
    { name: "proofPayment", minCount: 1, maxCount: 1}
  ]),
  [
    body("sessionType")
      .notEmpty()
      .withMessage("Session type is required")
      .isIn(["Business Plan Competition", "Business Case Competition"])
      .withMessage(
        "Session type must be Business Plan Competition or Business Case Competition"
      ),
  ],
  errorHandling,
  eventControllers.registerBMC
);

router.get(
  "/BMC/summary",
  isAuthenticated,
  eventControllers.getBMCRegistration
);

module.exports = router;
