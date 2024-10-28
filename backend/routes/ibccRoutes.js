const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const ibccControllers = require("../controllers/ibccControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const errorHandling = require("../middlewares/errorHandling");

router.post(
  "/newTeam",
  isAuthenticated,
  upload.fields([
    { name: "proofOfPayment", maxCount: 1 },
    { name: "studentId", maxCount: 1 },
    { name: "proofOfFollow", maxCount: 1 },
    { name: "proofOfStory", maxCount: 1 },
    { name: "proofOfComment", maxCount: 1 },
    { name: "proofOfBroadcast", maxCount: 1},
    { name: "proof180dcui", maxCount: 1},
  ]),
  errorHandling,
  ibccControllers.createNewTeam
);

router.post(
  "/newMember",
  isAuthenticated,
  ibccControllers.createNewIBCCMember
);

router.post(
    "/newSolo",
    isAuthenticated,
    upload.fields([
        { name: "proofOfPayment", maxCount: 1 },
        { name: "studentId", maxCount: 1 },
        { name: "cv", maxCount: 1 },
        { name: "proofOfFollow", maxCount: 1 },
        { name: "proofOfStory", maxCount: 1 },
        { name: "proofOfComment", maxCount: 1 },
        { name: "proofOfBroadcast", maxCount: 1},
      ]),
      errorHandling,
      ibccControllers.createNewSolo
);

router.get(
    "/team",
    isAuthenticated,
    ibccControllers.getTeamRegistrationDetails
)

router.get(
    "/individual",
    isAuthenticated,
    ibccControllers.getSoloRegistrationDetails
)

module.exports = router;
