/**
 * Check whether user login or signup
 * (SAMPAI SAAT INI TIDAK DIPAKAI)
 */

module.exports = (req, res, next) => {
  if (
    req.user.institution.length < 1 ||
    req.user.gender.length < 1 ||
    req.user.fullname.length < 1 ||
    req.user.phoneNumber.length < 1
  ) {
    console.log("NEXTTTT");
    next();
  } else {
    res.redirect("/profile");
  }
};
