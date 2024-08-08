const passport = require("passport");
const { generateToken } = require("../config/jwtConfig");
const { User } = require("../models");
const {
  REGISTER_PAGE,
  FILL_DETAILS_PAGE,
  HOME_PAGE,
} = require("../constants/url");
const { validationResult } = require("express-validator");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    console.log("user from signup: ", user);
    const token = generateToken(user);
    return res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user && user.validatePassword(password)) {
      const token = generateToken(user);
      res.status(200).json({ token, user });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    const otpCode = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    req.app.locals.otpCode = otpCode;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailGenerator = new Mailgen({
      theme: "salted",
      product: {
        name: "StudentsxCEOs International Summit 2024",
        link: "https://mailgen.js/",
      },
    });

    var otpEmail = {
      body: {
        name: user.fullname,
        intro:
          "You've requested to reset your password. No worries, you can enter the OTP provided below to proceed with resetting your password.",

        action: {
          instructions: "Your OTP",
          button: {
            color: "#003337",
            text: otpCode,
          },
        },

        outro:
          "Please note, your OTP is valid for only 10 minutes. Ensure you keep it confidential and do not share it with anyone. ",

        signature: "Cheers, StudentsxCEOs International Summit 2024",
      },
    };

    const otpHtml = mailGenerator.generate(otpEmail);

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Reset Password",
      text: `Hi, ${user.fullname}.\nYou've requested to reset your password. No worries, you can enter the OTP provided : ${otpCode}\n\nRegards, StudentsxCEOs International Summit 2024`,
      html: otpHtml,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        return res.status(500).json({ err });
      } else {
        return res.status(201).json({
          message: `OTP has been sent to your email : ${email}`,
        });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const { otpCode } = req.body;

    if (
      parseInt(otpCode) === parseInt(req.app.locals.otpCode) &&
      req.app.locals.otpExpireIn > Date.now()
    ) {
      req.app.locals.otpCode = null;
      req.app.locals.resetSession = true;
      req.app.locals.otpExpireIn = null;

      return res.status(200).json({ message: "OTP code is verified" });
    } else {
      return res.status(401).json({ message: "OTP code not valid" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).json({ message: "Session Expired" });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid Email" });

    await User.update(
      { password: password },
      {
        where: { email },
        individualHooks: true,
      }
    );
    req.app.locals.resetSession = false;
    return res.status(200).json({ message: "Password Updated" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Success Redirect
exports.successRedirect = (req, res) => {
  res.status(200).json({ message: "Authentication successful" });
};
