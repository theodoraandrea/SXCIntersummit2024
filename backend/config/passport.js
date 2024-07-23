const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await User.findOne({
          where: { oauthId: profile.id },
        });
        if (currentUser) {
          // Check if username or picture changed
          let needsUpdate = false;
          if (currentUser.username !== profile.name.givenName) {
            currentUser.username = profile.name.givenName;
            needsUpdate = true;
          }

          if (currentUser.picture !== profile.photos[0]?.value) {
            currentUser.picture = profile.photos[0]?.value;
            needsUpdate = true;
          }

          // Save only if there are changes
          if (needsUpdate) {
            await currentUser.save();
          }
          return done(null, currentUser);
        } else {
          const newUser = await User.create({
            oauthId: profile.id,
            username: profile.name.givenName,
            email: profile.emails[0].value,
            // fullname: profile.displayName,
            fullname: "",
            gender: "",
            institution: "",
            phoneNumber: "",
            picture: profile.photos[0]?.value,
          });

          await newUser.save();
          return done(null, newUser);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});

module.exports = passport;
