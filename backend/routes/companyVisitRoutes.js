const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const companyVisitControllers = require("../controllers/companyVisitControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const errorHandling = require("../middlewares/errorHandling");

router.post(
  "/register",
  isAuthenticated,
  upload.fields([
    { name: "proofFollow", maxCount: 1 },
    { name: "proofStory", maxCount: 1 },
  ]),
  [
    body("company").notEmpty().withMessage("Company name is required"),
    body("attendanceType")
      .notEmpty()
      .withMessage("Attendance type (Offline / Online) is required."),
    body("gpa").notEmpty().withMessage("GPA is required"),
    body("semester")
      .notEmpty()
      .withMessage("Current registrant semester is required"),
    body("domicile")
      .notEmpty()
      .withMessage("Registrant's domicile is required"),
  ],
  errorHandling,
  companyVisitControllers.register
);

router.get("/summary", isAuthenticated, companyVisitControllers);

module.exports = router;
