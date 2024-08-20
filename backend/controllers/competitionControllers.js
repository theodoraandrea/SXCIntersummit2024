const express = require("express");
const User = require("../models/user");
const Competition = require("../models/competition");
const CompetitionRegistration = require("../models/competitionregistrations");
const { Op } = require("sequelize");

exports.getAllCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.findAll({
      order: [
        ['competitionDate', 'ASC']
      ]
    });
    return res.status(200).json(competitions);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch competitions" });
  }
};

exports.getTwoLatestCompetitions = async (req, res) => {
  const today = new Date();
  try {
    const competitions = await Competition.findAll({
      where: {
        competitionDate: {
          [Op.gt]: today
        }
      },
      order: [
        ['competitionDate', 'ASC']
      ],
      limit: 2
    });

    if (competitions.length == 1) {
      try {
        const moreEvents = await Competition.findOne({
          where: {
            competitionDate: {
              [Op.lt]: competitions[0].competitionDate
            }
          }
        });
        competitions.push(moreEvents);
      } catch (error) {
        throw error;
      }
    }

    if (competitions.length == 0) {
      try {
        const competitions = await Competition.findAll({
          order: [
            ['competitionDate', 'DESC']
          ],
          limit: 2
        });
        return res.status(200).json(competitions);
      } catch (error) {
        throw error;
      }
    }
    return res.status(200).json(competitions);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch events"});
  }
}

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
