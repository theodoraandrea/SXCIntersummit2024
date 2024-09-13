const express = require("express");
const { User, EventRegistration, CompanyVisit } = require("../models");
const { createFolder, getImageURLsList } = require("../utils/handleImage");
const { generateTeamCode } = require("../utils/generateTeamCode");
const checkRequiredFields = require("../utils/checkRequiredFields");
const { validationResult } = require("express-validator");

const companyVisitId = 6;

// Register new company visit
exports.registerCompanyVisit = async (req, res) => {
  try {
    // Body Validation Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { files, body } = req;

    const requiredFields = ["proofFollow", "proofStory"];
    if (!checkRequiredFields(req.files, requiredFields)) {
      return res.status(400).json({
        message:
          "Upload incomplete: Please ensure that all required images are uploaded before submitting the form.",
      });
    }

    const { company, attendanceType, gpa, semester, domicile } = body;

    const userId = req.user.id;
    const user = await User.findByPk(userId);

    const qnaList = [
      {
        "Are you part of the StudentsxCEOs International Summit Committee?":
          body.partOfCommittee ? "Yes" : "No",
      },
      {
        "What motivates you to join the StudentsxCEOs International Summit Company Visit 2024? ":
          body.motivation ?? "-",
      },
    ];

    // Create and upload File/Image
    const fileNames = [
      `${user.fullname}_Proof of Follow`,
      `${user.fullname}_Proof of Instastory`,
    ];
    const rootFolderId = process.env.FOLDER_COMPANYVISIT_ID;
    const folderId = await createFolder(user.fullname, rootFolderId);

    const proofFollow = await getImageURLsList(
      files.proofFollow,
      folderId,
      fileNames[0]
    );
    const proofStory = await getImageURLsList(
      files.proofStory,
      folderId,
      fileNames[1]
    );

    const screenshotCompanyVisit = [proofFollow, proofStory];

    let eventRegistration;
    try {
      eventRegistration = await EventRegistration.create({
        userId,
        eventId: companyVisitId,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ e });
    }

    let newCompanyVisit;
    try {
      newCompanyVisit = await CompanyVisit.create({
        registrationId: eventRegistration.id,
        company,
        attendanceType,
        GPA: gpa,
        semester,
        domicile,
        question: qnaList,
        screenshotCompanyVisit,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }

    res.status(200).json({
      message: "Success registering Company Visit!",
      companyVisitDetails: newCompanyVisit,
      email: emailResult.message,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getCompanyVisitSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    let eventRegistration;
    try {
      eventRegistration = await EventRegistration.findOne({
        where: {
          userId: userId,
          eventId: companyVisitId,
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }

    const registrationId = eventRegistration.id;

    let companyVisitDetails;
    try {
      companyVisitDetails = await CompanyVisit.findOne({
        where: { registrationId: registrationId },
      });
    } catch (error) {
      res.status(500).json(error);
    }

    // If no registration is found return error
    if (!eventRegistration) {
      return res.status(404).json({
        message: `No company visit registration found with Registration ID : ${registrationId}`,
      });
    }

    // Respond with the event registration details
    res.status(200).json({
      message: "Company visit registration details retrieved successfully!",
      companyVisitDetails: companyVisitDetails,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
