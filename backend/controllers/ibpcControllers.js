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
      "proofOfTwibbon",
      "proofOfStory",
      "proofOfComment",
    ];
    if (!checkRequiredFields(req.files, requiredFields)) {
      return res.status(400).json({
        message:
          "Upload incomplete: Please ensure that all required images are uploaded before submitting the form.",
      });
    }

    const { teamName, question } = body;
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    const teamCode = generateTeamCode(6);

    const qnaList = { "How did you know this event?": question };

    const fileNames = [
      `${teamName}_${user.fullname}_Proof of Follow`,
      `${teamName}_${user.fullname}_Proof of Twibbon`,
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
    const proofOfTwibbon = await getImageURLsList(
      files.proofOfTwibbon,
      folderId,
      fileNames[1]
    );
    const proofOfStory = await getImageURLsList(
      files.proofOfStory,
      folderId,
      fileNames[2]
    );
    const studentIds = await getImageURLsList(
      files.studentIds,
      folderId,
      fileNames[3]
    );
    const proofOfComment = await getImageURLsList(
      files.proofOfComment,
      folderId,
      fileNames[4]
    );

    const screenshotIBPC = [
      proofOfFollow,
      proofOfTwibbon,
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
      originality: originalityStatement,
      screenshotIBPC,
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

    return res.status(201).json({
      message: "Team created successfully",
      team: newTeam,
      teamCode: teamCode,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};