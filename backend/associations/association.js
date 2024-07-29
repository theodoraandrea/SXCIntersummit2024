const User = require("../models/user");
const Event = require("../models/event");
const Competition = require("../models/competition");
const EventRegistration = require("../models/eventregistrations");
const CompetitionRegistration = require("../models/competitionregistrations");
const BMC = require("../models/bmc");
const CompanyVisit = require("../models/companyvisit");
const Chamber = require("../models/chamber");
const Summit = require("../models/summit");

exports.eventAssociations = () => {
  User.hasMany(EventRegistration, {
    foreignKey: "userId",
  });

  Event.hasMany(EventRegistration, {
    foreignKey: "eventId",
  });

  EventRegistration.belongsTo(User, {
    foreignKey: "userId",
  });

  EventRegistration.belongsTo(Event, {
    foreignKey: "eventId",
  });

  Summit.belongsTo(EventRegistration, {
    foreignKey: "registrationId",
  });
  CompanyVisit.belongsTo(EventRegistration, {
    foreignKey: "registrationId",
  });
  Chamber.belongsTo(EventRegistration, {
    foreignKey: "registrationId",
  });
  BMC.belongsTo(EventRegistration, {
    foreignKey: "registrationId",
  });

  EventRegistration.hasOne(Summit, { foreignKey: "registrationId" });
  EventRegistration.hasOne(CompanyVisit, { foreignKey: "registrationId" });
  EventRegistration.hasOne(Chamber, { foreignKey: "registrationId" });
  EventRegistration.hasOne(BMC, { foreignKey: "registrationId" });
};

exports.competitionAssociations = () => {
  User.hasMany(CompetitionRegistration, {
    foreignKey: "userId",
  });

  Competition.hasMany(CompetitionRegistration, {
    foreignKey: "competitionId",
  });

  CompetitionRegistration.belongsTo(User, {
    foreignKey: "userId",
  });

  CompetitionRegistration.belongsTo(Competition, {
    foreignKey: "competitionId",
  });
};
