require("dotenv").config();
const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const routes = require("./routes");
const corsMiddleware = require("./middlewares/corsMiddleware");

const db = require("./config/databaseConfig");
require("./associations/association").entitiesAssociation();

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

// CORS configuration
app.use(corsMiddleware);

// Session middleware
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
