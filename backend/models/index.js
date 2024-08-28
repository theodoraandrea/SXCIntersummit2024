// /models/index.js
const BMC = require("./bmc");
const Chamber = require("./chamber");
const CompanyVisit = require("./companyvisit");
const Event = require("./event");
const FCEOMember = require("./fceomember");
const FCEO = require("./fceo");
const EventRegistration = require("./eventregistrations");
const Competition = require("./competition");
const CompetitionRegistration = require("./competitionregistrations");
const Summit = require("./summit");
const User = require("./user");
const ReferralCode = require("./referralcode");
const IBPC = require("./ibpc");
const IBPCMember = require("./ibpcMember");
const IBCC = require("./ibcc");
const IBCCMember = require("./ibccMember");

module.exports = {
  BMC,
  Chamber,
  CompanyVisit,
  Event,
  EventRegistration,
  Competition,
  CompetitionRegistration,
  FCEOMember,
  FCEO,
  Summit,
  User,
  ReferralCode,
  IBPC,
  IBPCMember,
  IBCC,
  IBCCMember,
};
