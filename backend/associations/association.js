const {
  BMC,
  Chamber,
  CompanyVisit,
  Event,
  FCEOMember,
  FCEOTeam,
  EventRegistration,
  CompetitionRegistration,
  Summit,
  User,
} = require("../models");

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
