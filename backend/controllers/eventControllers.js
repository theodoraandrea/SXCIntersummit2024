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
const { validationResult } = require("express-validator");
const checkRequiredFields = require("../utils/checkRequiredFields");

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

/**
 *
 * EVENTS REGISTRATION
 */

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

exports.registerBMC = async (req, res) => {
  try {
    //Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    // Check if there any required image not uploaded.
    const requiredFields = [
      "agreement",
      "screenshot1",
      "screenshot2",
      "screenshot3",
    ];
    if (!checkRequiredFields(req.files, requiredFields)) {
      return res.status(400).json({
        message:
          "Upload incomplete: Please ensure that all required images are uploaded before submitting the form.",
      });
    }

    // const userId = 1;
    const bmcId = 1; // BMC event id
    const userId = req.user.id;
    const body = req.body;
    const files = req.files;

    // if (!files.agreement) {
    //   console.log("Haven't uploaded agreement");
    // } else {
    //   console.log("agreement: ", files.agreement);
    // }

    // if (!files.screenshot1) {
    //   console.log("Haven't uploaded screenshot 1");
    // } else {
    //   console.log("screenshot 1: ", files.screenshot1);
    // }
    // if (!files.screenshot2) {
    //   console.log("Haven't uploaded screenshot 2");
    // } else {
    //   console.log("screenshot 2: ", files.screenshot2);
    // }
    // if (!files.screenshot1) {
    //   console.log("Haven't uploaded screenshot 3");
    // } else {
    //   console.log("screenshot 3: ", files.screenshot3);
    // }

    const user = await User.findByPk(userId);
    const event = await Event.findByPk(bmcId);

    if (!user && !event) {
      return res.status(400).json({ message: "User or Event not found" });
    }

    // List of Questions and Answers
    let eventSource;
    if (body.eventSource === "Other") {
      if (body.eventSourceOther) {
        eventSource = `Other: ${body.eventSourceOther}`;
      } else {
        eventSource = "Other";
      }
    } else {
      eventSource = `SxC InterSummit ${body.eventSource}`;
    }
    const qnaList = [
      { "How did you know this event?": eventSource
      },
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

    res.status(200).json(bmc);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
