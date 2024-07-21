const passport = require("passport");
const Validator = require("validatorjs");
const User = require("../models/user");
const {
  REGISTER_PAGE,
  FILL_DETAILS_PAGE,
  HOME_PAGE,
} = require("../constants/url");

exports.login = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleAuthCallback = (req, res) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return res.redirect(REGISTER_PAGE);
    }
    // if (!user) {
    //   return res.redirect(REGISTER_PAGE);
    // }
    // Successful authentication, establish session and redirect to home page
    req.logIn(user, (err) => {
      if (err) {
        return res.redirect(REGISTER_PAGE);
      }
      res.redirect(FILL_DETAILS_PAGE);
    });
  })(req, res);
};

// Logout
module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.redirect(HOME_PAGE);
  });
};

// Success Redirect
exports.successRedirect = (req, res) => {
  res.status(200).json({ message: "Authentication successful" });
};
