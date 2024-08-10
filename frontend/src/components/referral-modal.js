import React, { useState, useEffect } from "react";
import { postCheckReferralCode } from "../service/services";


const ReferralModal = ({ setReferralCode, setDiscountedPrice }) => {
    const [ code, setCode ] = useState("");
    const [ discount, setDiscount ] = useState("");
    const [ referralDetails, setReferralDetails ] = useState({});

    const [ price, setPrice ] = useState(15000);

    const [ error, setError ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState(null);
    const [ submitTouched, setSubmitTouched ] = useState(false);

    useEffect(() => {
        if (referralDetails?.code) {
            setDiscount(referralDetails.discountPercentage);
            setPrice((price) => price - referralDetails.discountPercentage);
            setReferralCode(referralDetails.code);
            setDiscountedPrice(price);
        }
    }, [referralDetails]);

    const handleSubmit = async () => {
        try {
            const res = await postCheckReferralCode(code);
            setReferralDetails(res);
        } catch (error) {
            setError(true);
            setErrorMsg(error.response?.data?.message);
        } finally {
            setSubmitTouched(true);
        }
    }

    return (
        <div className="bg-dark-2 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-xl font-bold text-white mb-4">Referral Code</h1>
          <div>
          <input
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={(e)=>{
                setCode(e.target.value);
            }}
            className="max-w-fit px-3 py-2 rounded-lg"
          />
          <button
          onClick={handleSubmit}
          className="ml-3 bg-primary-3 text-white px-6 py-2 rounded-full"
          >
            Check
          </button>
          </div>
          {error && <p className="text-red-500 mt-2">{errorMsg}</p>}
          {
            submitTouched && 
            <div className="text-white mt-4">
            { referralDetails?.code ? 
            <p>Referral code valid!</p> : 
            <p>Referral code invalid</p>
            }
          </div>
          }
        </div>
    )

}

export default ReferralModal;