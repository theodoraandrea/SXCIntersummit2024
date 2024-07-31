// /models/index.js
const BMC = require("./bmc");
const Chamber = require("./chamber");
const CompanyVisit = require("./companyvisit");
const Event = require("./event");
const FCEOMember = require("./fceomember");
const FCEOTeam = require("./fceoteam");
const EventRegistration = require("./eventregistrations");
const Competition = require("./competition");
const CompetitionRegistration = require("./competitionregistrations");
const Summit = require("./summit");
const User = require("./user");

module.exports = {
  BMC,
  Chamber,
  CompanyVisit,
  Event,
  EventRegistration,
  Competition,
  CompetitionRegistration,
  FCEOMember,
  FCEOTeam,
  Summit,
  User,
};
