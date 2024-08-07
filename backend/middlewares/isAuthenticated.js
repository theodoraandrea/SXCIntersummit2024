const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Assuming the header is in the format 'Bearer TOKEN'

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Token is valid, store the decoded information (e.g., user data) in the request object
    req.user = decoded;
    next(); // Call the next middleware/route handler
  });
};
