const passport = require("passport");
const { generateToken } = require("../config/jwtConfig");
const { User } = require("../models");
const {
  REGISTER_PAGE,
  FILL_DETAILS_PAGE,
  HOME_PAGE,
} = require("../constants/url");

exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    console.log("user from signup: ", user);
    const token = generateToken(user);
    return res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
  }
};

exports.login = async (req, res) => {
  try {
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

// Success Redirect
exports.successRedirect = (req, res) => {
  res.status(200).json({ message: "Authentication successful" });
};
