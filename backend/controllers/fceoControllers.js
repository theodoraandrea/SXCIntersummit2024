const express = require("express");
const { FCEOMember, FCEOTeam } = require("../models");

// Create a new team
exports.createNewTeam = async (req, res) => {
  try {
    const { name, leaderId, proofOfPayment, teamCode } = req.body;
    // const teamCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newTeam = await FCEOTeam.create({
      name,
      leaderId,
      teamCode,
      proofOfPayment,
    });

    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Register a new member
exports.createNewFCEOMember = async (req, res) => {
  try {
    const { userId, teamCode, isLeader } = req.body;

    const team = await FCEOTeam.findOne({ where: { teamCode } });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const newMember = await FCEOMember.create({
      userId,
      teamId: team.id,
      isLeader,
    });

    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
