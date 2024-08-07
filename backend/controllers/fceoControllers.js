const express = require("express");
const {
  FCEOMember,
  FCEOTeam,
  User,
  Competition,
  CompetitionRegistration,
} = require("../models");
const { createFolder, getImageURLsList } = require("../utils/handleImage");
const { generateTeamCode } = require("../utils/generateTeamCode");

// Create a new team
exports.createNewTeam = async (req, res) => {
  const fceoId = 1;
  try {
    const { files, body } = req;
    const { teamName } = body;
    const userId = req.user.id;
    console.log(userId);

    const teamCode = generateTeamCode(6);

    const rootFolderId = process.env.FOLDER_FCEO_ID;
    const folderId = await createFolder(
      "Team " + teamName,
      rootFolderId
    );

    const proofPayment = await getImageURLsList(files.proofPayment, folderId);
    const proofFollow = await getImageURLsList(files.proofFollow, folderId);
    const proofTwibbon = await getImageURLsList(files.proofTwibbon, folderId);
    const proofStory = await getImageURLsList(files.proofStory, folderId);
    const studentIds = await getImageURLsList(files.studentIds, folderId);

    const screenshotFCEO = [ proofFollow, proofTwibbon, proofStory, studentIds ];

    const newTeam = await FCEOTeam.create({
      teamName,
      leaderId: userId,
      teamCode,
      proofOfPayment: proofPayment,
      screenshotFCEO: screenshotFCEO
    });

    await CompetitionRegistration.create({
      userId,
      competitionId: fceoId,
    });

    res.status(201).json({
      message: "Team created successfully",
      team: newTeam,
      teamCode: teamCode,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Check Team Existence
exports.checkTeam = async (req, res) => {
  try {
    const { body } = req;
    const { teamCode } = body;

    const team = await FCEOTeam.findOne({ where: { teamCode: teamCode } });
    if (!team) {
      return res
        .status(404)
        .json({ error: "Team not found. Please check your Code" });
    }

    const teamLeaderId = team.leaderId;
    const teamLeader = await User.findOne({
      where: {
        id: teamLeaderId,
      },
    });
    res.status(200).json({
      message: "Team found",
      teamName: team.teamName,
      teamCode: team.teamCode,
      leader: teamLeader.fullname,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Register a new member
exports.createNewFCEOMember = async (req, res) => {
  try {
    const { body } = req;
    const { teamId, fullname, gender, school, phoneNumber, email } = body;
    console.log(req.body);

    const newMember = await FCEOMember.create({
      teamId: teamId,
      fullname: fullname,
      gender: gender,
      school: school,
      phoneNumber: phoneNumber, 
      email: email
    });

    res.status(201).json({
      message: "Success registering FCEO as a new member!",
      member: newMember,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get team details and members by userId
exports.getTeamDetailsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find member corresponding to the userId
    const member = await FCEOMember.findOne({
      where: { userId },
    });

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    // Find team details using the teamId
    const teamId = member.teamId;
    const team = await FCEOTeam.findOne({
      where: { id: teamId },
    });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Find all members of the same team
    const teamMembers = await FCEOMember.findAll({
      where: { teamId },
      include: [
        {
          model: User,
          attributes: ["fullname", "email", "phoneNumber"],
        },
      ],
    });

    res.status(200).json({
      teamName: team.teamName,
      teamCode: team.teamCode,
      members: teamMembers.map((member) => ({
        userId: member.userId,
        isLeader: member.isLeader,
        fullname: member.User.fullname,
        email: member.User.email,
        phoneNumber: member.User.phoneNumber,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
