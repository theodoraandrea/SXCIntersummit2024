const errorHandling = (err, req, res, next) => {
  if (err) {
    return res.status(400).json(err.message);
  }
  next();
};

module.exports = errorHandling;
