const ReferralCode = require('../models/referralcode');

// Check referral code
exports.checkReferralCode = async (req, res) => {
    const { referralCode, eventName } = req.body;
    try {
      const result = await ReferralCode.findOne({
        where: {
            code: referralCode,
            [eventName]: 1
        }
      });
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
        console.log(error);
      res.status(404).json({ message: "Referral code not found" });
    }
  };