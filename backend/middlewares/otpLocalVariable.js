const otplocalVariable = (req, res, next) => {
  const otpExpier = new Date();

  req.app.locals = {
    otpCode: null,
    otpExpireIn: otpExpier.setMinutes(otpExpier.getMinutes() + 10),
    resetSession: false,
  };

  next();
};

module.exports = otplocalVariable;
