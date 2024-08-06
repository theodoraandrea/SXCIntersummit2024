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

exports.registerBMC = async (req, res) => {
  try {
    // const userId = 1;
    const bmcId = 1; // BMC event id
    console.log(req.files);
    const userId = req.user.id;
    const { body, files } = req;

    const user = await User.findByPk(userId);
    const event = await Event.findByPk(bmcId);

    if (!user && !event) {
      return res.status(400).json({ message: "User or Event not found" });
    }

    // List of Questions and Answers
    const qnaList = [
      { "How did you know this event?": body.eventSource },
      {
        "Have you ever participated in a business competition before?":
          body.experience ? 'Yes' : 'No',
      },
      {
        "What was your experience when participating in a business competition before?":
          body.experience ?? '-',
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

    const agreementURL = await getImageURLsList(files.agreement, folderId);
    const screenshotBMC_URL = await getImageURLsList(
      files.screenshotBMC,
      folderId
    );

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
