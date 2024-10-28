const {
  IBCC_Team,
  IBCC_Solo,
  IBCC_Member,
  User,
  Competition,
  CompetitionRegistration,
} = require("../models");
const { createFolder, getImageURLsList } = require("../utils/handleImage");
const { generateTeamCode } = require("../utils/generateTeamCode");
const checkRequiredFields = require("../utils/checkRequiredFields");
const { validationResult } = require("express-validator");
const sendAutomatedEmail = require("../services/automatedEmail");
const { file } = require("googleapis/build/src/apis/file");

const IBCC_WA_LINK = "https://chat.whatsapp.com/Gut5M6ilA9QCydC4vTPuD7";

exports.createNewTeam = async (req, res) => {
  try {
    const ibccId = 2;
    // Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { files, body } = req;
    const requiredFields = [
      "proofOfPayment",
      "studentId",
      "proofOfFollow",
      "proofOfStory",
      "proofOfComment",
      "proofOfBroadcast",
      "proof180dcui"
    ];
    if (!checkRequiredFields(req.files, requiredFields)) {
      return res.status(400).json({
        message:
          "Upload incomplete: Please ensure that all required images are uploaded before submitting the form.",
      });
    }

    const {
      teamName,
      email,
      twibbonLink1,
      twibbonLink2,
      twibbonLink3,
      eventSource,
      referralCode,
      paymentType,
      paymentChannel,
      paymentBank,
      payerBankAccName,
      transferDate,
    } = body;
    const leaderId = req.user.id;
    const leader = await User.findByPk(leaderId);
    const teamCode = generateTeamCode(6);

    const fileNames = [
      teamName + "_" + leader.fullname + "_Proof of Follow",
      teamName + "_" + leader.fullname + "_Proof of Instastory",
      teamName + "_" + leader.fullname + "_Proof of Comment",
      teamName + "_" + leader.fullname + "_Student IDs",
      teamName + "_" + leader.fullname + "_Proof of Payment",
      teamName + "_" + leader.fullname + "_Proof of Broadcast",
      teamName + "_" + leader.fullname + "_Proof 180DCUI",
    ];

    const rootFolderId = process.env.FOLDER_BUSINESS_CASE_ID;
    const folderId = await createFolder("Team " + teamName, rootFolderId);

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

    const proofOfComment = await getImageURLsList(
      files.proofOfComment,
      folderId,
      fileNames[2]
    );

    const studentIdLink = await getImageURLsList(
      files.studentId,
      folderId,
      fileNames[3]
    );

    const proofOfPayment = await getImageURLsList(
      files.proofOfPayment,
      folderId,
      fileNames[4]
    );

    const proofOfBroadcast = await getImageURLsList(
      files.proofOfBroadcast,
      folderId,
      fileNames[5]
    );

    const proof180dcui = await getImageURLsList(
      files.proof180dcui,
      folderId,
      fileNames[6]
    );

    const screenshotIBCC = [
      proofOfFollow,
      proofOfStory,
      proofOfComment,
      proofOfBroadcast,
      proof180dcui
    ];

    const twibbonLinks = [twibbonLink1, twibbonLink2, twibbonLink3];

    const newTeam = await IBCC_Team.create({
      leaderId,
      teamName,
      personalEmail: email,
      teamCode,
      eventSource,
      twibbonLinks,
      screenshotIBCC,
      proofOfPayment,
      studentId: studentIdLink,
      paymentType,
      referralCode,
      paymentChannel,
      paymentBank,
      payerBankAccName,
      transferDate,
    });

    await CompetitionRegistration.create({
      userId: req.user.id,
      competitionId: ibccId,
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
          "You've just successfully registered to the International Business Case Competition. We're excited to have you on board!",
        action: {
          instructions: "Join the WA Group by clicking the button below",
          button: {
            color: "#003337",
            text: "Join WA Group",
            link: "https://chat.whatsapp.com/Gut5M6ilA9QCydC4vTPuD7",
          },
        },
        outro:
          "We're glad to have you on board! Stay tuned in the group for further information!",
        signature: "Cheers, StudentsxCEOs International Summit 2024",
      },
    };

    const subject = `Welcome to SxC Intersummit - ${leader.fullname}`;

    const emailResult = await sendAutomatedEmail(leader, subject, emailDetails);

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

exports.createNewIBCCMember = async (req, res) => {
  try {
    const { body } = req;
    const {
      teamId,
      fullname,
      personalEmail,
      phoneNumber,
      university,
      batch,
      major,
    } = body;

    console.log(body);

    // Create a new IBCC member
    const newMember = await IBCC_Member.create({
      teamId: teamId,
      fullname: fullname,
      personalEmail: personalEmail,
      phoneNumber: phoneNumber,
      university: university,
      batch: batch,
      major: major,
    });

    return res.status(201).json({
      message: "Success registering IBCC as a new member!",
      member: newMember,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create a new member", error: error.message });
  }
};

exports.createNewSolo = async (req, res) => {
  try {
    const ibccId = 2;
    // Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { files, body } = req;
    const requiredFields = [
      "proofOfPayment",
      "studentId",
      "cv",
      "proofOfFollow",
      "proofOfStory",
      "proofOfComment",
      "proofOfBroadcast",
    ];
    if (!checkRequiredFields(req.files, requiredFields)) {
      return res.status(400).json({
        message:
          "Upload incomplete: Please ensure that all required images are uploaded before submitting the form.",
      });
    }

    const {
      email,
      twibbonLink1,
      eventSource,
      mbti,
      experience,
      goals,
      background,
      commitment1,
      commitment2,
      referralCode,
      paymentType,
      paymentChannel,
      paymentBank,
      payerBankAccName,
      transferDate,
    } = body;
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    const fileNames = [
      `${user.fullname}_Proof of Follow`,
      `${user.fullname}_Proof of Instastory`,
      `${user.fullname}_Proof of Comment`,
      `${user.fullname}_Proof of Payment`,
      `${user.fullname}_CV`,
      `${user.fullname}_Student ID`,
      `${user.fullname}_Proof of Broadcast`,
    ];

    const rootFolderId = process.env.FOLDER_BUSINESS_CASE_ID;
    const folderId = await createFolder(
      "Individual - " + user.fullname,
      rootFolderId
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

    const proofOfComment = await getImageURLsList(
      files.proofOfComment,
      folderId,
      fileNames[2]
    );

    const proofOfPayment = await getImageURLsList(
      files.proofOfPayment,
      folderId,
      fileNames[3]
    );

    const cvLink = await getImageURLsList(files.cv, folderId, fileNames[4]);

    const studentIdLink = await getImageURLsList(
      files.studentId,
      folderId,
      fileNames[5]
    );

    const proofOfBroadcast = await getImageURLsList(
      files.proofOfBroadcast,
      folderId,
      fileNames[6]
    );

    const screenshotIBCC = [
      proofOfFollow,
      proofOfStory,
      proofOfComment,
      proofOfBroadcast,
    ];

    const skillsQuestionnaire = [
      {
        "Have you participated in similar business case competitions before?":
          experience,
      },
      {
        "What are your main goals for participating in this business case competition?":
          goals,
      },
      {
        "Any other information about your background that would be helpful for matchmaking?":
          background,
      },
    ];

    const commitmentQuestionnaire = [
      {
        "Are you willing to collaborate effectively with assigned teammates?":
          commitment1,
      },
      {
        "Are you willing to commit and participate in all scheduled rounds and activities of the competition?":
          commitment2,
      },
    ];

    const newSolo = await IBCC_Solo.create({
      userId,
      personalEmail: email,
      eventSource,
      twibbonLink: twibbonLink1,
      mbti,
      skillsQuestionnaire,
      commitmentQuestionnaire,
      screenshotIBCC,
      proofOfPayment,
      cv: cvLink,
      studentId: studentIdLink,
      paymentType,
      referralCode,
      paymentChannel,
      paymentBank,
      payerBankAccName,
      transferDate,
    });

    await CompetitionRegistration.create({
      userId,
      competitionId: ibccId,
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
          "You've just successfully registered to the International Business Case Competition. We're excited to have you on board!",
        action: {
          instructions: "Join the WA Group by clicking the button below",
          button: {
            color: "#003337",
            text: "Join WA Group",
            link: "https://chat.whatsapp.com/Gut5M6ilA9QCydC4vTPuD7",
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
      message: "Registered successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create registration", error: error.message });
  }
};

exports.getSoloRegistrationDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await IBCC_Solo.findOne({
      where: { userId: userId },
    });

    if (!data) {
      return res.status(404).json({ message: "Registration data not found" });
    }

    res.status(200).json({
      personalEmail: data.personalEmail,
      eventSource: data.eventSource,
      referralCode: data.referralCode,
      mbti: data.mbti,
      skillsQuestionnaire: data.skillsQuestionnaire,
      commitmentQuestionnaire: data.commitmentQuestionnaire,
      twibbonLink: data.twibbonLink,
      screenshotIBCC: data.screenshotIBCC,
      proofOfPayment: data.proofOfPayment,
      cv: data.cv,
      studentId: data.studentId,
      paymentType: data.paymentType,
      paymentChannel: data.paymentChannel,
      paymentBank: data.paymentBank,
      transferDate: data.transferDate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//by leader id
exports.getTeamRegistrationDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find team details using the teamId
    const team = await IBCC_Team.findOne({
      where: { leaderId: userId },
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const teamId = team.id;

    // Find all members of the same team
    const teamMembers = await IBCC_Member.findAll({
      where: { teamId },
    });

    res.status(200).json({
      teamName: team.teamName,
      personalEmail: team.personalEmail,
      teamCode: team.teamCode,
      eventSource: team.eventSource,
      twibbonLinks: team.twibbonLinks,
      screenshotIBCC: team.screenshotIBCC,
      proofPayment: team.proofOfPayment,
      cv: team.cv,
      studentId: team.studentId,
      paymentType: team.paymentType,
      referralCode: team.referralCode,
      paymentChannel: team.paymentChannel,
      paymentBank: team.paymentBank,
      payerBankAccName: team.payerBankAccName,
      transferDate: team.transferDate,
      members: teamMembers.map((member) => ({
        fullname: member.fullname,
        personalEmail: member.personalEmail,
        phoneNumber: member.phoneNumber,
        university: member.university,
        batch: member.batch,
        major: member.major,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
