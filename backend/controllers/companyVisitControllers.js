const express = require("express");
const { User, EventRegistration, CompanyVisit } = require("../models");
const { createFolder, getImageURLsList } = require("../utils/handleImage");
const checkRequiredFields = require("../utils/checkRequiredFields");
const { validationResult } = require("express-validator");
const sendAutomatedEmail = require("../services/automatedEmail");

// WA Group Links
const BCAWAGroup = "#";
const BoschWAGroup = "#";
const ShopeeWAGroup = "#";
const AccountingFirmWAGroup = "#";

// Function to select the WA group link based on the company
const getWAGroupLinkByCompany = (company) => {
  switch (company) {
    case "BCA":
      return BCAWAGroup;
    case "Bosch":
      return BoschWAGroup;
    case "Shopee":
      return ShopeeWAGroup;
    case "Accounting Firm":
      return AccountingFirmWAGroup;
    default:
      return "#"; // Fallback, maybe taro WA Group default kalo ada?? or contact person
  }
};

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

    const requiredFields = ["cv", "proofFollow", "proofStory"];
    if (!checkRequiredFields(req.files, requiredFields)) {
      return res.status(400).json({
        message:
          "Upload incomplete: Please ensure that all required images are uploaded before submitting the form.",
      });
    }

    const { company, attendanceType, gpa, semester, domicile, question } = body;

    const userId = req.user.id;
    const user = await User.findByPk(userId);

    const qnaList = [
      {
        "Are you part of the StudentsxCEOs International Summit Committee?":
          question[0],
      },
      {
        "What motivates you to join the StudentsxCEOs International Summit Company Visit 2024? ":
          question[1],
      },
    ];

    // Create and upload File/Image
    const fileNames = [
      `${user.fullname}_Curriculum Vitae`,
      `${user.fullname}_Proof of Follow`,
      `${user.fullname}_Proof of Instastory`,
    ];
    const rootFolderId = process.env.FOLDER_COMPANYVISIT_ID;
    const folderId = await createFolder(user.fullname, rootFolderId);

    const cv = await getImageURLsList(files.cv, folderId, fileNames[0]);

    const proofFollow = await getImageURLsList(
      files.proofFollow,
      folderId,
      fileNames[1]
    );
    const proofStory = await getImageURLsList(
      files.proofStory,
      folderId,
      fileNames[2]
    );

    const screenshotCompanyVisit = [cv, proofFollow, proofStory];

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

    const companyVisitWAGroup = getWAGroupLinkByCompany(company);

    // Email Details
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
          "You've just successfully registered to the Company Visit program by SxC. We're excited to have you on board!",
        action: {
          instructions: `Join the ${company} Company Visit WA Group by clicking the button below`,
          button: {
            color: "#003337",
            text: `Join ${company} WA Group`,
            link: companyVisitWAGroup,
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
        attributes: {
          exclude: ["bmcType"],
        },
        include: [
          {
            model: CompanyVisit,
            attributes: [
              "company",
              "attendanceType",
              "GPA",
              "semester",
              "domicile",
              "question",
              "screenshotCompanyVisit",
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
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
