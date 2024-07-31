const passport = require('passport');
var crypto = require('crypto');
const LocalStrategy = require('passport-local');
var db = require('../config/databaseConfig');
const User = require("../models/user");

passport.use(new LocalStrategy(
  function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
    
      crypto.pbkdf2(password, row.salt, 13000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(row.password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect email or password.'});
        }
        return cb(null, user);
      });
    });
  }));

module.exports = passport;
