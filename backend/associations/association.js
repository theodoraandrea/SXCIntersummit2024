const User = require("../models/user");
const Event = require("../models/event");
const Registration = require("../models/registration");
const BMC = require("../models/bmc");
const CompanyVisit = require("../models/companyvisit");
const Chamber = require("../models/chamber");
const Summit = require("../models/summit");

exports.entitiesAssociation = () => {
  User.hasMany(Registration, {
    foreignKey: "userId",
  });

  Event.hasMany(Registration, {
    foreignKey: "eventId",
  });

  Summit.belongsTo(Registration, {
    foreignKey: "registrationId",
  });
  CompanyVisit.belongsTo(Registration, {
    foreignKey: "registrationId",
  });
  Chamber.belongsTo(Registration, {
    foreignKey: "registrationId",
  });
  BMC.belongsTo(Registration, {
    foreignKey: "registrationId",
  });

  Registration.hasOne(Summit, { foreignKey: "registrationId" });
  Registration.hasOne(CompanyVisit, { foreignKey: "registrationId" });
  Registration.hasOne(Chamber, { foreignKey: "registrationId" });
  Registration.hasOne(BMC, { foreignKey: "registrationId" });

  // Registration.belongsTo(Summit, { foreignKey: "registrationId" });
  // Registration.belongsTo(CompanyVisit, { foreignKey: "registrationId" });
  // Registration.belongsTo(Chamber, { foreignKey: "registrationId" });
  // Registration.belongsTo(BMC, { foreignKey: "registrationId" });
};
