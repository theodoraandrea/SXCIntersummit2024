const express = require("express");
const {
  User,
  Chamber,
  BMC,
  CompanyVisit,
  Summit,
  Event,
  EventRegistration,
} = require("../models");
// Handling Images Dependencies
const { createFolder, getImageURLsList } = require("../utils/handleImage");
const sendAutomatedEmail = require("../services/automatedEmail");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch events" });
  }
};

exports.getRegisteredEventsByUser = async (req, res) => {
  try {
    const id = req.user.id;
    const events = await Event.findAll({
      include: {
        model: EventRegistration,
        where: {
          userId: id,
        },
      },
      order: [["eventDate", "ASC"]],
    });

    res.status(200).json({ events });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch events" });
  }
};

exports.getBMCRegistration = async (req, res) => {
  try {
    const bmcId = 1;
    const userId = req.user.id;

    const registrations = await EventRegistration.findAll({
      where: {
        userId: userId,
        eventId: bmcId,
      },
    });

    const forms = [];

    if (registrations.length > 0) {
      console.log("found: ", registrations.length);
      for (let i = 0; i < registrations.length; i++) {
        const item = registrations[i];
        try {
          const data = await BMC.findOne({
            where: {
              registrationId: item.id,
            },
          });
          forms.push(data);
        } catch (error) {
          res.status(400).json({ message: "Registration data not found" });
        }
      }
    }
    console.log(forms);
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/**
 *
 * EVENTS REGISTRATION
 */

exports.registerBMC = async (req, res) => {
  try {
    const bmcId = 1; // BMC event id
    const userId = req.user.id;
    const body = req.body;
    const files = req.files;

    if (!files.agreement) {
      console.log("Haven't uploaded agreement");
    } else {
      console.log("agreement: ", files.agreement);
    }

    if (!files.screenshot1) {
      console.log("Haven't uploaded screenshot 1");
    } else {
      console.log("screenshot 1: ", files.screenshot1);
    }
    if (!files.screenshot2) {
      console.log("Haven't uploaded screenshot 2");
    } else {
      console.log("screenshot 2: ", files.screenshot2);
    }
    if (!files.screenshot1) {
      console.log("Haven't uploaded screenshot 3");
    } else {
      console.log("screenshot 3: ", files.screenshot3);
    }

    const user = await User.findByPk(userId);
    const email = user.email;
    const event = await Event.findByPk(bmcId);

    if (!user && !event) {
      return res.status(400).json({ message: "User or Event not found" });
    }

    // List of Questions and Answers
    const qnaList = [
      { "How did you know this event?": body.eventSource },
      {
        "Have you ever participated in a business competition before?":
          body.experience ? "Yes" : "No",
      },
      {
        "What was your experience when participating in a business competition before?":
          body.experience ?? "-",
      },
      {
        "What are your expectations for this Business Master Class?":
          body.expectations,
      },
      { "What kind of competition materials do you need?": body.materials },
    ];

    /**
     * Upload Images to Google Drive
     *
     * 1. Get Root Folder ID (e.g: bmc, futureCEO, summit, etc) from .ENV file
     *
     * 2. Create folder of the registrant for specific event/competition-> await createFolder(user.fullname, ROOT_FOLDER_ID)
     *
     * 3. Get list of public link for each image fields, then store into database -> await getImageURLsList(files.NAME_OF_FIELDS, folderId from "createFolder" )
     *
     */

    const rootFolderId = process.env.FOLDER_BMC_ID;
    const folderId = await createFolder(user.fullname, rootFolderId);

    const screenshots = [
      files.screenshot1,
      files.screenshot2,
      files.screenshot3,
    ];

    const agreementURL = await getImageURLsList(files.agreement, folderId);
    const screenshot1 = await getImageURLsList(files.screenshot1, folderId);
    const screenshot2 = await getImageURLsList(files.screenshot2, folderId);
    const screenshot3 = await getImageURLsList(files.screenshot3, folderId);
    const screenshotBMC_URL = [screenshot1, screenshot2, screenshot3];

    // Automated Email
    const emailDetails = {
      from: "info.sxcintersummit@gmail.com",
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
          "You've just successfully registered to the Business Master Class! We're excited to have you on board! Your task is now to join the Whatsapp group for further info and instructions",
        action: {
          instructions: "Join the WA Group by clicking the button below",
          button: {
            color: "#003337",
            text: "Join WA Group",
            link: "#",
          },
        },
        outro:
          "We're glad to have you on board! Stay tuned in the group for further information!",
        signature: "Cheers, StudentsxCEOs International Summit 2024",
      },
    };

    const emailResult = await sendAutomatedEmail({ userId, emailDetails });

    if (!emailResult.success) {
      return res
        .status(500)
        .json({ message: emailResult.message, error: emailResult.error });
    }

    // BMC Registration
    const eventRegistration = await EventRegistration.create({
      userId: userId,
      eventId: bmcId,
    });

    const bmc = await BMC.create({
      registrationId: eventRegistration.id,
      agreement: agreementURL,
      sessionType: body.sessionType,
      question: qnaList,
      screenshotBMC: screenshotBMC_URL,
    });

    res.status(200).json({
      message: "Success registering BMC!",
      bmc: bmc,
      email: emailResult.message,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
