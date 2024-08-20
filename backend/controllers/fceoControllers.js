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
const checkRequiredFields = require("../utils/checkRequiredFields");
const { validationResult } = require("express-validator");
const sendAutomatedEmail = require("../services/automatedEmail");

// Create a new team
exports.createNewTeam = async (req, res) => {
  const fceoId = 1;
  try {
    // Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { files, body } = req;
    // Check if there any required image not uploaded.
    const requiredFields = [
      "proofPayment",
      "studentIds",
      "proofTwibbon",
      "proofFollow",
      "proofStory",
    ];
    if (!checkRequiredFields(req.files, requiredFields)) {
      return res.status(400).json({
        message:
          "Upload incomplete: Please ensure that all required images are uploaded before submitting the form.",
      });
    }

    const { teamName, region, referralCode } = body;
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    const teamCode = generateTeamCode(6);

    // Create and upload File/Image
    const fileNames = [
      `${teamName}_${user.fullname}_Proof of Follow`,
      `${teamName}_${user.fullname}_Proof of Twibbon`,
      `${teamName}_${user.fullname}_Proof of Instastory`,
      `${teamName}_${user.fullname}_Proof of Student Card`,
    ];
    const rootFolderId = process.env.FOLDER_FUTURECEO_ID;
    const folderId = await createFolder("Team " + teamName, rootFolderId);

    const proofPayment = await getImageURLsList(files.proofPayment, folderId);
    const proofFollow = await getImageURLsList(
      files.proofFollow,
      folderId,
      fileNames[0]
    );
    const proofTwibbon = await getImageURLsList(
      files.proofTwibbon,
      folderId,
      fileNames[1]
    );
    const proofStory = await getImageURLsList(
      files.proofStory,
      folderId,
      fileNames[2]
    );
    const studentIds = await getImageURLsList(
      files.studentIds,
      folderId,
      fileNames[3]
    );

    const screenshotFCEO = [proofFollow, proofTwibbon, proofStory, studentIds];

    const newTeam = await FCEO.create({
      teamName,
      region,
      leaderId: userId,
      teamCode,
      proofOfPayment: proofPayment,
      screenshotFCEO: screenshotFCEO,
      referralCode: referralCode,
    });

    await CompetitionRegistration.create({
      userId,
      competitionId: fceoId,
    });

    const emailDetails = {
      from: process.env.EMAIL_USER,
      fromName: "StudentsXCEOs International Summit 2024",
      mailgenOptions: {
        theme: "salted",
        product: {
          name: "StudentsxCEOs International Summit 2024",
          link: "#",
        },
      },
      emailContent: {
        intro:
          "You've just successfully registered to the FCEO competition. We're excited to have you on board!",
        action: {
          instructions: "Join the WA Group by clicking the button below",
          button: {
            color: "#003337",
            text: "Join WA Group",
            link: "https://chat.whatsapp.com/DAXnA0cXcYpFvwbVSH4SQr",
          },
        },
        outro:
          "We're glad to have you on board! Stay tuned in the group for further information!",
        signature: "Cheers, StudentsxCEOs International Summit 2024",
      },
    };

    const subject = `Welcome to SxC Intersummit - ${user.fullname}`;

    const emailResult = await sendAutomatedEmail(user, subject, emailDetails);

    if (!emailResult.success) {
      return res
        .status(500)
        .json({ message: emailResult.message, error: emailResult.error });
    }

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
    // Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

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
    // Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { body } = req;
    const { teamId, fullname, gender, school, phoneNumber, email } = body;
    const userId = req.user.id;

    // Create a new FCEOMember
    const newMember = await FCEOMember.create({
      teamId,
      fullname,
      gender,
      school,
      phoneNumber,
      email,
    });

    // Fetch the user details
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json({
      message: "Success registering FCEO as a new member!",
      member: newMember,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      where: { teamId },
    });

    res.status(200).json({
      teamName: team.teamName,
      teamCode: team.teamCode,
      region: team.region,
      proofPayment: team.proofOfPayment,
      screenshotFCEO: team.screenshotFCEO,
      referralCode: team.referralCode,
      members: teamMembers.map((member) => ({
        fullname: member.fullname,
        gender: member.gender,
        email: member.email,
        phoneNumber: member.phoneNumber,
        school: member.school,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
