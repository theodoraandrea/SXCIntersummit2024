const passport = require("passport");

exports.login = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/profile",
});

// Logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.status(200).json({ message: "Logout successful" });
  });
};

// Success Redirect
exports.successRedirect = (req, res) => {
  res.status(200).json({ message: "Authentication successful" });
};

// GetProfileData
exports.getProfile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json(req.user);
};
