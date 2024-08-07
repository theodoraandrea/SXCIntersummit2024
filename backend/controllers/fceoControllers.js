const express = require("express");
const {
  FCEOMember,
  FCEO,
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

    const newTeam = await FCEO.create({
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

    const team = await FCEO.findOne({ where: { teamCode: teamCode } });
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

// Get team details and members by userId of leader
exports.getTeamDetailsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find team details using the teamId
    const team = await FCEO.findOne({
      where: { leaderId: userId },
    });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const teamId = team.id;

    // Find all members of the same team
    const teamMembers = await FCEOMember.findAll({
      where: { teamId }
    });

    res.status(200).json({
      teamName: team.teamName,
      teamCode: team.teamCode,
      proofPayment: team.proofOfPayment,
      screenshotFCEO: team.screenshotFCEO,
      members: teamMembers.map((member) => ({
        fullname: member.fullname,
        gender: member.gender,
        email: member.email,
        phoneNumber: member.phoneNumber,
        school: member.school
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
