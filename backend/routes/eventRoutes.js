const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const eventControllers = require("../controllers/eventControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");

// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Error: Images only! (jpeg, jpg, png)"));
//   }
// }

// const upload = multer({
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

const upload = multer();

router.get("/", isAuthenticated, eventControllers.getRegisteredEventsByUser);
router.get("/all", eventControllers.getAllEvents);

router.post(
  "/BMC", isAuthenticated,
  upload.fields([
    { name: "agreement", maxCount: 1 },
    { name: "screenshot1", maxCount: 1 },
    { name: "screenshot2", maxCount: 1 },
    { name: "screenshot3", maxCount: 1 },
    //{ name: "screenshotBMC", minCount: 3 },
  ]),
  eventControllers.registerBMC
);
module.exports = router;
