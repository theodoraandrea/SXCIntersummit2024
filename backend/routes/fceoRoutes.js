const express = require("express");

const router = express.Router();
const fceoControllers = require("../controllers/fceoControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/newMember", isAuthenticated, fceoControllers.createNewFCEOMember);
router.get("/newTeam", isAuthenticated, fceoControllers.createNewTeam);
module.exports = router;
