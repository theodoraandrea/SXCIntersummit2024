require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const routes = require("./routes");
const corsMiddleware = require("./middlewares/corsMiddleware");
const dotenv = require("dotenv");
const path = require("path");

const db = require("./config/databaseConfig");
require("./associations/association").entitiesAssociation();

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
// db.sync({ alter: true })
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
app.get("/", (req, res) => {
  res.send("API is running fine :)");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
