const express = require("express");
const User = require("../models/user");
const Competition = require("../models/competition");
const CompetitionRegistration = require("../models/competitionregistrations");

exports.getAllCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.findAll();
    return res.status(200).json(competitions);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch competitions" });
  }
};
exports.getRegisteredCompetitionsByUser = async (req, res) => {
  try {
    const id = req.user.id;
    const competitions = await Competition.findAll({
      include: {
        model: CompetitionRegistration,
        where: {
          userId: id,
        },
      },
      order: [["competitionDate", "ASC"]],
    });

    res.status(200).json({ competitions });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch competitions" });
  }
};
