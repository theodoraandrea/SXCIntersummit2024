require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const routes = require("./routes");
const corsMiddleware = require("./middlewares/corsMiddleware");
const db = require("./config/databaseConfig");

const chamber = require("./models/chamber");
const CompanyVisit = require("./models/companyvisit");
const Summit = require("./models/summit");

const app = express();
const port = process.env.PORT;

// Database Connection
db.authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Database Table synchronizing
// Summit.sync()
//   .then(() => {
//     console.log("Summit added");
//   })
//   .catch((err) => {
//     console.log("ERROR");
//     console.log(err.message);
//   });

// CORS configuration
app.use(corsMiddleware);

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Import Passport configuration
require("./config/passport");

// Routes
app.use("/", routes);

// Default route handler
// app.get("/", (req, res) => {
//   res.send('<h1>Home</h1><a href="/auth/google">Login with Google</a>');
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
