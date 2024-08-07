const {
  BMC,
  Chamber,
  CompanyVisit,
  Event,
  FCEOMember,
  FCEO,
  EventRegistration,
  Competition,
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

  // FCEO and FCEOMember associations
  FCEO.hasMany(FCEOMember, {
    foreignKey: "teamId",
    as: "members",
  });
  FCEOMember.belongsTo(FCEO, {
    foreignKey: "teamId",
  });

  // User and FCEO/FCEOMember associations
  User.hasOne(FCEO, {
    foreignKey: "leaderId",
    as: "teamLeader",
  });
  FCEO.belongsTo(User, {
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
