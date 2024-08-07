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
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

// Create a new team
exports.createNewTeam = async (req, res) => {
  try {
    const { files, body } = req;
    const { teamName, leaderId } = body;

    const teamCode = generateTeamCode(6);

    const rootFolderId = process.env.FOLDER_FUTURECEO_ID;
    const folderId = await createFolder("Team " + teamName, rootFolderId);

    const proofPayment = await getImageURLsList(files.proofPayment, folderId);
    const proofFollow = await getImageURLsList(files.proofFollow, folderId);
    const proofTwibbon = await getImageURLsList(files.proofTwibbon, folderId);
    const proofStory = await getImageURLsList(files.proofStory, folderId);
    const studentIds = await getImageURLsList(files.studentIds, folderId);

    const screenshotFCEO = [proofFollow, proofTwibbon, proofStory, studentIds];

    const newTeam = await FCEO.create({
      teamName,
      leaderId,
      teamCode,
      proofOfPayment: proofPayment,
      screenshotFCEO: screenshotFCEO,
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
    const userId = req.user.id;

    const newMember = await FCEOMember.create({
      teamId: teamId,
      fullname: fullname,
      gender: gender,
      school: school,
      phoneNumber: phoneNumber,
      email: email,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailGenerator = new Mailgen({
      theme: "salted",
      product: {
        name: "StudentsxCEOs International Summit 2024",
        link: "#",
      },
    });

    const user = await User.findByPk(userId);

    var welcomeEmail = {
      body: {
        name: user.fullname,
        intro:
          "You've just successfully registered to the FCEO competition. We're excited to have you on board!",

        action: {
          instructions: "Join the WA Group by clicking the button below",
          button: {
            color: "#003337",
            text: "Join WA Group",
            link: "#",
          },
        },

        outro:
          "We're glad to have you on board! stay stuned in the group for further information!",

        signature: "Cheers, StudentsxCEOs International Summit 2024",
      },
    };

    const welcomeEmailHtml = mailGenerator.generate(welcomeEmail);

    let mailOptions = {
      from: `"StudentsXCEOs International Summit 2024" <info.sxcintersummit@gmail.com>`,
      to: user.email,
      subject: `Welcome to SxC Intersummit - ${user.fullname}`,
      text: `Hi, ${user.fullname}.\nYou've just successfully registered to the FCEO competition. Please join the WA group by clicking the link below!`,
      html: welcomeEmailHtml,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        return res.status(500).json({ message: "Error sending email", err });
      } else {
        return res.status(201).json({
          message: `Email sent: ${email}`,
        });
      }
    });

    res.status(201).json({
      message: "Success registering FCEO as a new member!",
      member: newMember,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
