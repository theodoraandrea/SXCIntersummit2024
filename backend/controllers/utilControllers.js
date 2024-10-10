const ReferralCode = require("../models/referralCode");
const sendAutomatedEmail = require("../services/automatedEmail");

// Check referral code
exports.checkReferralCode = async (req, res) => {
  const { referralCode, eventName } = req.body;
  try {
    const result = await ReferralCode.findOne({
      where: {
        code: referralCode,
        [eventName]: 1,
      },
    });
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Referral code not found" });
  }
};

exports.sendWelcomingEmail = async (req, res) => {
  try {
    const { fullname, email } = req.body;
    const directUser = {
      fullname,
      email,
    };

    // Automated Email details
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
          "You've just successfully registered to the FCEO competition. We're excited to have you on board!",
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

    const subject = `Welcome to SxC Intersummit - ${directUser.fullname}`;
    const emailResult = await sendAutomatedEmail(
      directUser,
      subject,
      emailDetails
    );

    if (!emailResult.success) {
      return res
        .status(500)
        .json({ message: emailResult.message, error: emailResult.error });
    }

    return res.status(201).json({
      message: emailResult.message,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
