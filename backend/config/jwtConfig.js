const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    const payload = { id: user.id, email: user.email }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h'});
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };