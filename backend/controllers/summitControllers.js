const { User, Summit, Event, EventRegistration } = require("../models/index");
const { createFolder, getImageURLsList } = require("../utils/handleImage");
const { validationResult } = require("express-validator");
const checkRequiredFields = require("../utils/checkRequiredFields");
const sendAutomatedEmail = require("../services/automatedEmail");

const summitWhatsappGroup = "https://chat.whatsapp.com/Cx46vK2imNtDBGlVxVTuxU";

exports.registerSummit = async (req, res) => {
  try {
    //Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    // Check if there any required image not uploaded.
    const requiredFields = [
      "proofOfFollow",
      "proofOfStory",
      "proofOfPayment",
      "proofOfLikeAndComment",
    ];
    if (!checkRequiredFields(req.files, requiredFields)) {
      return res.status(400).json({
        message:
          "Upload incomplete: Please ensure that all required images are uploaded before submitting the form.",
      });
    }

    const summitId = 7;
    const userId = req.user.id;
    const body = req.body;
    const files = req.files;

    const user = await User.findByPk(userId);
    const event = await Event.findByPk(summitId);

    if (!user && !event)
      return res.status(400).json({ message: "User or Event not found" });

    const isRegistered = await EventRegistration.findOne({
      where: {
        userId: userId,
        eventId: summitId,
      },
    });
    if (isRegistered)
      return res.status(500).json({ message: "Already Registered Summit" });

    const qnaList = [
      { "Find out about event": body.eventSource },
      { "Event Expectation": body.expectation },
      {
        "Question for Speaker": body.question,
      },
    ];

    const fileNames = [
      `${user.fullname}_Proof of Follow`,
      `${user.fullname}_Proof of Instastory`,
      `${user.fullname}_Proof of Payment`,
      `${user.fullname}_Proof of Like and Comment`,
    ];
    const rootFolderId = process.env.FOLDER_SUMMIT_ID;
    const folderId = await createFolder(user.fullname, rootFolderId);

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
    const proofOfPayment = await getImageURLsList(
      files.proofOfPayment,
      folderId,
      fileNames[2]
    );
    const proofOfLikeAndComment = await getImageURLsList(
      files.proofOfLikeAndComment,
      folderId,
      fileNames[3]
    );

    const eventRegistration = await EventRegistration.create({
      userId: userId,
      eventId: summitId,
    });

    let summit;
    try {
      summit = await Summit.create({
        registrationId: eventRegistration.id,
        cityOfResidence: body.cityOfResidence,
        status: body.status,
        statusDetail: body.statusDetail,
        question: qnaList,
        proofOfStory,
        proofOfFollow,
        //proofOfPayment,
        proofOfLikeAndComment,
      });
    } catch (error) {
      await EventRegistration.destroy({
        where: {
          userId: userId,
          eventId: summitId,
        },
      });
      return res
        .status(500)
        .json({ message: "Failed to register Summit", error: error.message });
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
          "You've just successfully registered to the International Summit! We're excited to have you on board! Your task is now to join the Whatsapp group for further info and instructions",
        action: {
          instructions: "Join the WA Group by clicking the button below",
          button: {
            color: "#003337",
            text: "Join WA Group",
            link: summitWhatsappGroup,
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
      message: "Success registering Summit!",
      summit: summit,
      email: emailResult.message,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to register Summit", error: error.message });
  }
};

exports.getSummitRegistration = async (req, res) => {
  try {
    const summitId = 7;
    const userId = req.user.id;

    const registration = await EventRegistration.findOne({
      where: {
        userId: userId,
        eventId: summitId,
      },
    });

    if (!registration)
      return res.status(404).json({ message: "Summit registration not found" });

    const summit = await Summit.findOne({
      where: {
        registrationId: registration.id,
      },
    });

    if (!summit)
      return res.status(404).json({ message: "Summit registration not found" });

    res.status(200).json({
      data: {
        summit,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get Summit registration",
      error: error.message,
    });
  }
};
