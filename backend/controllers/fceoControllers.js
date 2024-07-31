const express = require("express");
const { FCEOMember, FCEOTeam, User } = require("../models");

// Create a new team
exports.createNewTeam = async (req, res) => {
  try {
    const { name, leaderId, proofOfPayment, teamCode } = req.body;
    // const teamCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newTeam = await FCEOTeam.create({
      teamName: name,
      leaderId,
      teamCode,
      proofOfPayment,
    });

    res
      .status(201)
      .json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Register a new member
exports.createNewFCEOMember = async (req, res) => {
  try {
    const { userId, teamCode, nationalStudentIdNumber, isLeader } = req.body;

    const team = await FCEOTeam.findOne({ where: { teamCode } });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const newMember = await FCEOMember.create({
      userId,
      teamId: team.id,
      isLeader,
      nationalStudentIdNumber,
    });

    res
      .status(201)
      .json({ message: "Success creating new member", member: newMember });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get team details and members by userId
exports.getTeamDetailsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find member corresponding to the userId
    const member = await FCEOMember.findOne({
      where: { userId },
    });

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    // Find team details using the teamId
    const teamId = member.teamId;
    const team = await FCEOTeam.findOne({
      where: { id: teamId },
    });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Find all members of the same team
    const teamMembers = await FCEOMember.findAll({
      where: { teamId },
      include: [
        {
          model: User,
          attributes: ["fullname", "email", "phoneNumber"],
        },
      ],
    });

    res.status(200).json({
      teamName: team.teamName,
      teamCode: team.teamCode,
      members: teamMembers.map((member) => ({
        userId: member.userId,
        isLeader: member.isLeader,
        fullname: member.User.fullname,
        email: member.User.email,
        phoneNumber: member.User.phoneNumber,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
