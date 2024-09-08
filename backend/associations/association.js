const {
  BMC,
  Chamber,
  CompanyVisit,
  Event,
  FCEOMember,
  FCEO,
  IBPCMember,
  IBPC,
  IBCC_Team,
  IBCC_Solo,
  IBCC_Member,
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

  // IBPC and IBPCMember associations
  IBPC.hasMany(IBPCMember, {
    foreignKey: "teamId",
    as: "ibpcmembers",
  });
  IBPCMember.belongsTo(IBPC, {
    foreignKey: "teamId",
  });

  // User and IBPC/IBPCMember associations
  User.hasOne(IBPC, {
    foreignKey: "leaderId",
    as: "ibpcteamLeader",
  });
  IBPC.belongsTo(User, {
    foreignKey: "leaderId",
  });

  // IBCC and IBCCMember associations
  IBCC_Team.hasMany(IBCC_Member, {
    foreignKey: "teamId",
    as: "ibccMembers",
  });
  IBCC_Member.belongsTo(IBCC_Team, {
    foreignKey: "teamId",
  });

  // User and IBCC/IBCCMember associations
  User.hasOne(IBCC_Team, {
    foreignKey: "leaderId",
    as: "ibccTeamLeader",
  });
  IBCC_Team.belongsTo(User, {
    foreignKey: "leaderId",
  });
  User.hasOne(IBCC_Solo, {
    foreignKey: "userId"
  });
  IBCC_Solo.belongsTo(User, {
    foreignKey: "userId"
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
