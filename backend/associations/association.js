const User = require("../models/user");
const Event = require("../models/event");
const EventRegistration = require("../models/eventregistrations");
const BMC = require("../models/bmc");
const CompanyVisit = require("../models/companyvisit");
const Chamber = require("../models/chamber");
const Summit = require("../models/summit");

exports.entitiesAssociation = () => {
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

  // EventRegistration.belongsTo(Summit, { foreignKey: "registrationId" });
  // Registration.belongsTo(CompanyVisit, { foreignKey: "registrationId" });
  // Registration.belongsTo(Chamber, { foreignKey: "registrationId" });
  // Registration.belongsTo(BMC, { foreignKey: "registrationId" });
};
