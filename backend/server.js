require("dotenv").config();
const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const routes = require("./routes");
const corsMiddleware = require("./middlewares/corsMiddleware");
const dotenv = require("dotenv");
const path = require("path");

const user = require("./models/user");
const db = require("./config/databaseConfig");
const FCEOMember = require("./models/fceomember");

require("./associations/association").eventAssociations();
require("./associations/association").competitionAssociations();

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: path.resolve(__dirname, envFile) });

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
// FCEOMember.sync()
//   .then(() => {
//     console.log("Update Database");
//   })
//   .catch((err) => {
//     console.log("ERROR");
//     console.log(err.message);
//   });

// CORS configuration
app.use(corsMiddleware);

// Session middleware
// console.log(process.env.JWT_SECRET);
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
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
app.get("/", (req, res) => {
  res.send("API is running fine :)");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
