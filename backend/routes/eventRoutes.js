const express = require("express");

const router = express.Router();
const eventControllers = require("../controllers/eventControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated, eventControllers.getAllEventsById);
router.get("/all", isAuthenticated, eventControllers.getAllEvents);
module.exports = router;
