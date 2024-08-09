const ReferralCode = require('../models/referralcode');

// Check referral code
exports.checkReferralCode = async (req, res) => {
    const { body } = req;
    console.log("in controller");
    console.log(body.referralCode);
    try {
      const referralCode = await ReferralCode.findOne({
        where: {
            code: body.referralCode
        }
      });
      res.status(200).json(referralCode);
    } catch (error) {
        console.log(error);
      res.status(404).json({ message: "Referral code not found" });
    }
  };