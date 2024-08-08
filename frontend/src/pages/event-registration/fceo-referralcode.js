import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import { postCheckReferralCode } from "../../service/services";
import { FCEO_REGIST } from "../../constants/routes";

const ReferralCode = () => {
  const [ refCode, setRefCode ] = useState("");
  const [ referralDetails, setReferralDetails ] = useState({});
  const [ submitTouched, setSubmitTouched ] = useState(false);
  const [ discount, setDiscount ] = useState("");
  const [ price, setPrice ] = useState(null);
  const [ error, setError] = useState(false);
  const [ errorMsg, setErrorMsg] = useState(null);

  const [ response, setResponse ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setDiscount(referralDetails?.discountPercentage);
  }, [referralDetails]);

  const handleSubmit = async () => {
    setDiscount(0);
    try {
      const res = await postCheckReferralCode(refCode);
      console.log(res);
      setReferralDetails(res);
    } catch (error) {
      setError(true);
      setErrorMsg(error.response?.data?.message);
    } finally {
      setSubmitTouched(true);
    }
  }

  const onContinue = () => {
    navigate(
      FCEO_REGIST, {
        state: {
          referralCode: refCode,
          currentView: 1
        }
      }
    )
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-primary w-full min-h-screen flex items-center justify-center">
        <div className="bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">Referral Code</h1>
          <div>
          <input
            type="text"
            id="refCode"
            name="refCode"
            value={refCode}
            onChange={(e)=>{setRefCode(e.target.value)}}
            className="max-w-fit px-3 py-2 rounded-lg"
          />
          <button
          onClick={handleSubmit}
          className="ml-3 bg-primary-3 text-white px-6 py-2 rounded-full"
          >
            Submit
          </button>
          </div>
          {error && <p className="text-red-500 mt-2">{errorMsg}</p>}
          {
            submitTouched && <div className="text-white mt-2">
            { discount ? 
            <>
            <p>Congratulations, you are eligible for a {discount}% discount!</p>
            </>
                : <p>Referral not found</p>
            }
          </div>
          }
          <div className="mt-6 mb-2 flex justify-center items-center">
              <button
                type="button"
                className="bg-primary-3 text-white px-6 py-2 mr-6 rounded-full"
              >
                Back
              </button>
              <button
                type="button"
                onClick={onContinue}
                className="bg-primary-3 text-white px-6 py-2 rounded-full"
              >
                Continue
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralCode;
