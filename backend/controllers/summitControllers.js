const { User, Summit, Event, EventRegistration } = require("../models/index");
const { createFolder, getImageURLsList } = require("../utils/handleImage");
const { validationResult } = require("express-validator");
const checkRequiredFields = require("../utils/checkRequiredFields");
const sendAutomatedEmail = require("../services/automatedEmail");
const { generateTeamCode } = require("../utils/generateTeamCode");

const summitWhatsappGroup = "https://chat.whatsapp.com/ECPYNkFM6RTCw8DVyjN38H";

exports.registerSummit = async (req, res) => {
  try {
    //Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    // Check if there any required image not uploaded.
    console.log(req.files);
    const requiredFields = [
      "proofOfFollow",
      "proofOfStory",
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
      {
        "Do you have any allergies or dietary restrictions?": body.allergy,
      },
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

    let proofPayment;
    if (files.proofPayment) {
      proofPayment = await getImageURLsList(
        files.proofPayment,
        folderId,
        fileNames[2]
      );
    }

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
        //cityOfResidence: body.cityOfResidence,
        status: body.status,
        //statusDetail,
        question: qnaList,
        proofOfStory,
        proofOfFollow,
        proofOfPayment: proofPayment ?? "",
        proofOfLikeAndComment,
        summitRegistrationCode: generateTeamCode(8),
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

exports.sendBulkEmail = async (req, res) => {
  try {
    // Define the summit ID and fetch all registrations for this summit
    const summitId = 7;

    const registrations = await EventRegistration.findAll({
      where: { eventId: summitId },
      include: [
        {
          model: User,
          attributes: ["fullname", "email"],
        },
        {
          model: Summit,
          attributes: ["summitRegistrationCode"],
          required: true,
        },
      ],
    });

    if (!registrations.length) {
      return res
        .status(404)
        .json({ message: "No registered users found for this summit" });
    }

    // Initialize success and failure counters
    let successCount = 0;
    let failureCount = 0;

    // Send email to each registered user
    for (const registration of registrations) {
      const { fullname, email } = registration.User;
      const { summitRegistrationCode } = registration.Summit;
      const subject = `Welcome to SxC Intersummit - ${fullname}`;

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
          intro: `
            Dear Future Leader!
            <br><br>
            We are excited to officially welcome you as a participant in the <b>StudentsxCEOs International Summit 2024</b>!
            <br><br>
            This summit is a unique opportunity for you to gain insights on the theme <i>“Pioneering Leadership in the Digital Economy: Strategies for Innovation and Growth from Industry Leaders’ Perspective”</i>.
            You'll engage with leading economists, top industry professionals, and explore emerging trends shaping the future of business and innovation.
            <br><br>
            <br><b>Event Details:</b><br>
            Date: Sunday, 1st December 2024<br>
            Time: 10:00 AM – 03:15 PM<br>
            Venue: Dinas Pendidikan Provinsi DKI Jakarta<br>
            Address: Jl. Gatot Subroto No. Kav. 40-41, Kuningan, Jakarta <br>
            <a href="https://shorturl.at/IWk1Z">View Map</a>
            <br><br>
            <br><b>What Awaits You at the Summit:</b>
            <ul style="text-align: left; padding-left: 20px;">
              <li><b>Prompt Presentation Session:</b> Learn from top speakers as they share practical strategies and real-world examples of successful digital transformations.</li>
              <li><b>Forum Group Discussion Session:</b> This interactive session will bring together national leaders to discuss the critical role of digital leadership in fostering innovation and business growth.</li>
              <li><b>Talkshow Session:</b> Gain insights from industry experts in a more casual, engaging talk show format.</li>
            </ul>
          `,
          action: {
            instructions:
              "Below is your registration code for the summit, Make sure to bring this code with you, as it will be required for your registration on the event day",
            button: {
              color: "#003337",
              text: summitRegistrationCode,
              link: "#",
            },
          },
          outro: `
            <br>
            Should you have any questions or need further assistance, please contact:<br>
            Secilia Deartha: 081385353064<br>
            Angelika Delvia: 082114823962<br>
            <br>
            We are looking forward to seeing you at the summit and embarking on this journey of innovation and leadership together!<br><br>
            Best regards,<br>
            <b>StudentsxCEOs International Summit 2024</b>
          `,
          signature: "Cheers, StudentsxCEOs International Summit 2024",
        },
      };

      const emailResult = await sendAutomatedEmail(
        { fullname, email },
        subject,
        emailDetails
      );
      if (emailResult.success) {
        successCount++;
      } else {
        failureCount++;
        console.error(
          `Failed to send email to ${email}: ${emailResult.message}`
        );
      }
    }

    res.status(200).json({
      message: `Bulk email process completed.`,
      successCount,
      failureCount,
      total: registrations.length,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to send bulk email", error: error.message });
  }
};

exports.checkRegistrationCode = async (req, res) => {
  try {
    // Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { summitRegistrationCode } = req.body;

    const summit = await Summit.findOne({
      where: {
        summitRegistrationCode: summitRegistrationCode,
      },
      include: [
        {
          model: EventRegistration,
          include: [User],
        },
      ],
    });

    if (!summit) {
      return res.status(404).json({ message: "Invalid registration code" });
    }

    const user = summit.EventRegistration.User;

    res.status(200).json({
      message: "Summit registration code is valid",
      registrant: {
        name: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
