const { validationResult } = require("express-validator");
const User = require("../models");

// Get User Profile
exports.getProfile = async (req, res) => {
  console.log("is in getprofile");
  try {
    const user = await User.findByPk(req.user.id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Complete User Profile
exports.completeProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const userId = req.user.id;
    const updatedProfile = req.body;

    await User.update(updatedProfile, {
      where: {
        id: userId,
      },
    });

    const completedProfile = await User.findByPk(userId);
    return res.status(200).json({
      success: true,
      message: "Success updating / adding profile data",
      completedProfile,
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
