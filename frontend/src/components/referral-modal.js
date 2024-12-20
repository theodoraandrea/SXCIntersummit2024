import React, { useState, useEffect } from "react";
import { postCheckReferralCode } from "../service/services";

const ReferralModal = ({
  eventName,
  referralCode,
  verifiedRefCode,
  setVerifiedRefCode,
  setRefCodeValid,
}) => {
  const [code, setCode] = useState(referralCode ?? "");
  const [referralDetails, setReferralDetails] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [submitTouched, setSubmitTouched] = useState(false);

  useEffect(() => {
    if (referralDetails?.code) {
      setVerifiedRefCode(referralDetails.code);
      setRefCodeValid(true);
    } else {
      if (!verifiedRefCode) {
        setRefCodeValid(false);
      }
    }
  }, [referralDetails]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await postCheckReferralCode({
        code: code,
        eventName: eventName,
      });
      setReferralDetails(res);
    } catch (error) {
      setError(true);
      setErrorMsg(error.response?.data?.message);
    } finally {
      setIsLoading(false);
      setSubmitTouched(true);
    }
  };

  return (
    <div className="p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-xl font-bold text-white">Referral Code</h1>
      <p className="text-md text-white mb-4">
        Enter your referral code to get a discount
      </p>
      <div className="mt-8 flex-col">
        <input
          type="text"
          id="code"
          name="code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          className="max-w-fit px-3 py-2 mb-4 rounded-lg"
        />
        <div className="block sm:inline">
          <button
            className={`ml-3 text-white px-6 py-2 rounded-full
                ${
                  isLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-primary-3 hover:bg-yellow-600 focus:ring-yellow-500"
                }
            `}
            onClick={handleSubmit}
            disabled={true}
          >
            Use code
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{errorMsg}</p>}
      {submitTouched && (
        <div className="text-white mt-4">
          {referralDetails?.code ? (
            <p>Discount applied!</p>
          ) : (
            <p>Referral code invalid</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReferralModal;
