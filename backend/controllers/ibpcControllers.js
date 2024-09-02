const {
  IBPCMember,
  IBPC,
  User,
  Competition,
  CompetitionRegistration,
} = require("../models");
const { createFolder, getImageURLsList } = require("../utils/handleImage");
const { generateTeamCode } = require("../utils/generateTeamCode");
const checkRequiredFields = require("../utils/checkRequiredFields");
const { validationResult } = require("express-validator");
const sendAutomatedEmail = require("../services/automatedEmail");

const IBPC_WA_LINK = "https://chat.whatsapp.com/IL6ixCcOWVg8rTJbeGF47t";

exports.createNewTeam = async (req, res) => {
  try {
    const ibpcId = 3;
    // Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { files, body } = req;
    // Check if there any required image not uploaded.
    const requiredFields = [
      "proofOfPayment",
      "studentIds",
      "proofOfFollow",
      "originalityStatement",
      "proofOfStory",
      "proofOfComment",
    ];
    if (!checkRequiredFields(req.files, requiredFields)) {
      return res.status(400).json({
        message:
          "Upload incomplete: Please ensure that all required images are uploaded before submitting the form.",
      });
    }

    const { teamName, question, referralCode, proofOfTwibbon } = body;
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    const teamCode = generateTeamCode(6);

    const qnaList = { "How did you know this event?": question };

    const fileNames = [
      `${teamName}_${user.fullname}_Proof of Follow`,
      `${teamName}_${user.fullname}_Proof of Instastory`,
      `${teamName}_${user.fullname}_Proof of Student Card`,
      `${teamName}_${user.fullname}_Proof of Comment`,
    ];
    const rootFolderId = process.env.FOLDER_BUSINESS_PLAN_ID;
    const folderId = await createFolder("Team " + teamName, rootFolderId);

    const proofOfPayment = await getImageURLsList(
      files.proofOfPayment,
      folderId
    );
    const originalityStatement = await getImageURLsList(
      files.originalityStatement,
      folderId
    );
    const proofOfFollow = await getImageURLsList(
      files.proofOfFollow,
      folderId,
      fileNames[0]
    );
    const proofOfStory = await getImageURLsList(
      files.proofOfStory,
      folderId,
      fileNames[1]
    );
    const studentIds = await getImageURLsList(
      files.studentIds,
      folderId,
      fileNames[2]
    );
    const proofOfComment = await getImageURLsList(
      files.proofOfComment,
      folderId,
      fileNames[3]
    );

    const screenshotIBPC = [
      proofOfFollow,
      proofOfStory,
      studentIds,
      proofOfComment,
    ];

    const newTeam = await IBPC.create({
      leaderId: userId,
      teamName,
      teamCode,
      question: qnaList,
      proofOfPayment,
      proofOfTwibbon,
      originality: originalityStatement,
      screenshotIBPC,
      referralCode: referralCode
    });

    await CompetitionRegistration.create({
      userId,
      competitionId: ibpcId,
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
          "You've just successfully registered to the International Business Plan Competition. We're excited to have you on board!",
        action: {
          instructions: "Join the WA Group by clicking the button below",
          button: {
            color: "#003337",
            text: "Join WA Group",
            link: {IBPC_WA_LINK},
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

    return res.status(201).json({
      message: "Team created successfully",
      team: newTeam,
      teamCode: teamCode,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create a new team", error: error.message });
  }
};

exports.createNewIBPCMember = async (req, res) => {
  try {
    // Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { body } = req;
    const { teamId, fullname, email, institution, batch, phoneNumber } = body;

    // Create a new IBPCMember
    const newMember = await IBPCMember.create({
      teamId,
      fullname,
      email,
      institution,
      batch,
      phoneNumber,
    });

    return res.status(201).json({
      message: "Success registering IBPC as a new member!",
      member: newMember,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create a new member", error: error.message });
  }
};

exports.checkTeam = async (req, res) => {
  try {
    // Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { body } = req;
    const { teamCode } = body;

    const team = await IBPC.findOne({ where: { teamCode: teamCode } });
    if (!team) {
      return res
        .status(404)
        .json({ message: "Team not found. Please check your Code" });
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
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.getTeamDetailsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find team details using the teamId
    const team = await IBPC.findOne({
      where: { leaderId: userId },
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const teamId = team.id;

    // Find all members of the same team
    const teamMembers = await IBPCMember.findAll({
      where: { teamId },
    });

    res.status(200).json({
      teamName: team.teamName,
      teamCode: team.teamCode,
      proofPayment: team.proofOfPayment,
      proofOfTwibbon: team.proofOfTwibbon,
      screenshotIBPC: team.screenshotIBPC,
      referralCode: team.referralCode,
      members: teamMembers.map((member) => ({
        fullname: member.fullname,
        email: member.email,
        phoneNumber: member.phoneNumber,
        institution: member.institution,
        batch: member.batch,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
