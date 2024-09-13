const express = require("express");
const {
  FCEOMember,
  FCEO,
  User,
  Event,
  EventRegistration,
  CompanyVisit,
} = require("../models");
const { createFolder, getImageURLsList } = require("../utils/handleImage");
const { generateTeamCode } = require("../utils/generateTeamCode");
const checkRequiredFields = require("../utils/checkRequiredFields");
const { validationResult } = require("express-validator");

exports.registerCompanyVisit = async (req, res) => {
  const companyVisitId = 6;
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

    // Create and upload File/Image
    const fileNames = [
      `${teamName}_${user.fullname}_Proof of Follow`,
      `${teamName}_${user.fullname}_Proof of Instastory`,
    ];
    const rootFolderId = process.env.FOLDER_COMPANYVISIT_ID;
    const folderId = await createFolder("Team " + teamName, rootFolderId);

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
        gpa,
        semester,
        domicile,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
