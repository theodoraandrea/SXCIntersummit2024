const {
  BMC,
  Chamber,
  CompanyVisit,
  Event,
  FCEOMember,
  FCEOTeam,
  Registration,
  Summit,
  User,
} = require("../models");

exports.entitiesAssociation = () => {
  User.hasMany(Registration, {
    foreignKey: "userId",
  });

  Event.hasMany(Registration, {
    foreignKey: "eventId",
  });

  Registration.belongsTo(User, {
    foreignKey: "userId",
  });

  Registration.belongsTo(Event, {
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

  // FCEOTeam and FCEOMember associations
  FCEOTeam.hasMany(FCEOMember, {
    foreignKey: "teamId",
    as: "members",
  });
  FCEOMember.belongsTo(FCEOTeam, {
    foreignKey: "teamId",
  });

  // User and FCEOTeam/FCEOMember associations
  User.hasMany(FCEOMember, {
    foreignKey: "userId",
  });
  FCEOMember.belongsTo(User, {
    foreignKey: "userId",
  });

  User.hasOne(FCEOTeam, {
    foreignKey: "leaderId",
    as: "teamLeader",
  });
  FCEOTeam.belongsTo(User, {
    foreignKey: "leaderId",
  });
};
