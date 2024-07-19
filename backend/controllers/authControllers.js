const passport = require("passport");
const Validator = require("validatorjs");
const User = require("../models/user");
const { REGISTER_PAGE, HOME_PAGE } = require("../constants/url");

exports.login = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleAuthCallback = passport.authenticate("google", {
  failureRedirect: `${REGISTER_PAGE}`,
  successRedirect: `${HOME_PAGE}`,
});

// Logout
module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.status(200).json({ message: "Logout successful" });
  });
};

// Success Redirect
exports.successRedirect = (req, res) => {
  res.status(200).json({ message: "Authentication successful" });
};

// GetProfileData
exports.getProfile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json(req.user);
};

// Get Profile data for Extra Details Form
exports.getCompleteProfile = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json(req.user);
};

// Fill extra details of User's Profile.
exports.completeProfile = async (req, res) => {
  try {
    const userId = req.user.id; // cek lagi
    const body = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }

    const data = {
      username: body.username,
      fullname: body.fullname,
      gender: body.gender,
      institution: body.institution,
      major: body.major ?? null,
      batch: body.batch ?? null,
      phoneNumber: body.phoneNumber,
      studentIdCard: body.studentIdCard ?? null,
      cv: body.cv ?? null,
      screenshotSxC: body.screenshotSxC ?? null,
    };

    const rules = {
      username: "required",
      fullname: "required|string",
      gender: "required|string|in:Male,Female|alpha",
      institution: "required|string",
      major: "string",
      batch: "integer|min:1",
      phoneNumber: "required|numeric",
      studentIdCard: [
        "regex:/^[a-zA-Z0-9_\\-\\/]+(\\.jpg|\\.jpeg|\\.png|\\.pdf)$/i",
      ],
      cv: ["regex:/^[a-zA-Z0-9_\\-\\/]+(\\.jpg|\\.jpeg|\\.png|\\.pdf)$/i"],
      screenshotSxC: "array",
    };

    const validate = new Validator(data, rules);
    if (validate.fails()) {
      throw Object.assign(
        new Error("Bad Request"),
        { status: 400 },
        { errors: validate.errors }
      );
    }

    await User.update(data, {
      where: {
        id: user.id,
      },
    });

    const completedProfile = await User.findByPk(userId);
    res.status(200).json(completedProfile);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};
