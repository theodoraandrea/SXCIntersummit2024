const cors = require("cors");

const corsOptions = {
  origin: true,
  credentials: true, // Allow credentials (cookies) to be sent
};

module.exports = cors(corsOptions);
