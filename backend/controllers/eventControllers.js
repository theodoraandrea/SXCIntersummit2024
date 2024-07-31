const express = require("express");
const User = require("../models/user");
const Chamber = require("../models/chamber");
const BMC = require("../models/bmc");
const CompanyVisit = require("../models/companyvisit");
const Summit = require("../models/summit");
const Event = require("../models/event");
const EventRegistration = require("../models/eventregistrations");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch events" });
  }
};
exports.getRegisteredEventsByUser = async (req, res) => {
  try {
    const id = req.user.id;
    const events = await Event.findAll({
      include: {
        model: EventRegistration,
        where: {
          userId: id,
        },
      },
      order: [["eventDate", "ASC"]],
    });

    res.status(200).json({ events });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch events" });
  }
};
