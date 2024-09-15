const { User, Chamber, Event, EventRegistration } = require("../models/index");
const { createFolder, getImageURLsList } = require("../utils/handleImage");
const { validationResult } = require("express-validator");
const checkRequiredFields = require("../utils/checkRequiredFields");
const sendAutomatedEmail = require("../services/automatedEmail");

const chamberWhatsappGroup = "#";

exports.registerChamber = async (req, res) => {
  try {
    //Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    // Check if there any required image not uploaded.
    const requiredFields = [
      "cv",
      "proofOfFollow",
      "proofOfStory",
      "proofOfBroadcast",
    ];
    if (!checkRequiredFields(req.files, requiredFields)) {
      return res.status(400).json({
        message:
          "Upload incomplete: Please ensure that all required images are uploaded before submitting the form.",
      });
    }

    const chamberId = 5;
    const userId = req.user.id;
    const body = req.body;
    const files = req.files;

    const user = await User.findByPk(userId);
    const event = await Event.findByPk(chamberId);

    if (!user && !event)
      return res.status(400).json({ message: "User or Event not found" });

    const isRegistered = await EventRegistration.findOne({
      where: {
        userId: userId,
        eventId: chamberId,
      },
    });
    if (isRegistered)
      return res.status(500).json({ message: "Already Registered Chambers" });

    const qnaList = [
      { "Why do you want to register for this webinar?": body.registerReason },
      {
        "What do you expect by attending this webinar?":
          body.attendingExpectation,
      },
    ];

    const fileNames = [
      `${user.fullname}_Proof of Follow`,
      `${user.fullname}_Proof of Instastory`,
      `${user.fullname}_Proof of Broadcast`,
    ];
    const rootFolderId = process.env.FOLDER_CHAMBER_ID;
    const folderId = await createFolder(user.fullname, rootFolderId);

    const cv = await getImageURLsList(files.cv, folderId);
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
    const proofOfBroadcast = await getImageURLsList(
      files.proofOfBroadcast,
      folderId,
      fileNames[2]
    );

    const screenshotChambers = [proofOfFollow, proofOfStory, proofOfBroadcast];

    const eventRegistration = await EventRegistration.create({
      userId: userId,
      eventId: chamberId,
    });

    let chamber;
    try {
      chamber = await Chamber.create({
        registrationId: eventRegistration.id,
        industryType: body.industryType,
        cv,
        question: qnaList,
        screenshotChambers,
      });
    } catch (error) {
      await EventRegistration.destroy({
        where: {
          userId: userId,
          eventId: chamberId,
        },
      });
      return res
        .status(500)
        .json({ message: "Failed to register Chamber", error: error.message });
    }

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
          "You've just successfully registered to the Chambers! We're excited to have you on board! Your task is now to join the Whatsapp group for further info and instructions",
        action: {
          instructions: "Join the WA Group by clicking the button below",
          button: {
            color: "#003337",
            text: "Join WA Group",
            link: chamberWhatsappGroup,
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

    res.status(200).json({
      message: "Success registering Chambers!",
      chamber: chamber,
      email: emailResult.message,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to register Chambers", error: error.message });
  }
};

exports.getChamberRegistration = async (req, res) => {
  try {
    const chamberId = 5;
    const userId = req.user.id;

    const registration = await EventRegistration.findOne({
      where: {
        userId: userId,
        eventId: chamberId,
      },
    });

    if (!registration)
      return res
        .status(404)
        .json({ message: "Chamber registration not found" });

    const chamber = await Chamber.findOne({
      where: {
        registrationId: registration.id,
      },
    });

    if (!chamber)
      return res
        .status(404)
        .json({ message: "Chamber registration not found" });

    res.status(200).json({
      data: {
        chamber,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to get chamber registration",
        error: error.message,
      });
  }
};
