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
  try {
    const { files, body } = req;
    const { teamName, leaderId } = body;

    const teamCode = generateTeamCode(6);

    const rootFolderId = process.env.FOLDER_FCEO_ID;
    const folderId = await createFolder(
      "Payment Proof - Team " + teamName,
      rootFolderId
    );
    const proofUrl = await getImageURLsList(files.proofOfPayment, folderId);

    const newTeam = await FCEOTeam.create({
      teamName,
      leaderId,
      teamCode,
      proofOfPayment: proofUrl,
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

// Register a new member
exports.createNewFCEOMember = async (req, res) => {
  try {
    const fceoId = 1;
    const { files, body } = req;
    const { userId, teamCode, nationalStudentIdNumber, isLeader } = body;

    const team = await FCEOTeam.findOne({ where: { teamCode: teamCode } });
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!team) {
      return res
        .status(404)
        .json({ error: "Team not found. Please check your Code" });
    }

    const rootFolderId = process.env.FOLDER_FCEO_ID;
    const folderId = await createFolder(user.fullname, rootFolderId);

    const screenshotFCEO_URL = await getImageURLsList(
      files.screenshotFCEO,
      folderId
    );

    const fceoRegistration = await CompetitionRegistration.create({
      userId,
      competitionId: fceoId,
    });

    const newMember = await FCEOMember.create({
      userId,
      registrationId: fceoRegistration.id,
      teamId: team.id,
      isLeader,
      nationalStudentIdNumber,
      screenshotFCEO: screenshotFCEO_URL,
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
