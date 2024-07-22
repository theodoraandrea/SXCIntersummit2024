const express = require("express");
const User = require("../models/user");
const Chamber = require("../models/chamber");
const BMC = require("../models/bmc");
const CompanyVisit = require("../models/companyvisit");
const Summit = require("../models/summit");
const Event = require("../models/event");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch events" });
  }
};
exports.getAllEventsById = async (req, res) => {
  try {
    const id = req.user.id; //req.user.id

    const chamber = await Chamber.findOne({ where: { userId: id } });
    const companyVisit = await CompanyVisit.findOne({ where: { userId: id } });
    const bmc = await BMC.findOne({ where: { userId: id } });
    const summit = await Summit.findOne({ where: { userId: id } });

    const eventList = [chamber, companyVisit, bmc, summit].filter(
      (event) => event != null
    );
    res.status(200).json({ eventList });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch events" });
  }
};
