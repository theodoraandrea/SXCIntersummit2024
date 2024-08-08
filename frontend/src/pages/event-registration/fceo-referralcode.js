import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import { FCEO_REGIST_MEMBER_2 } from "../../constants/routes";
import { postCheckTeamCode } from "../../service/services";

const ReferralCode = () => {
  const [teamCode, setTeamCode] = useState("");
  const [teamDetails, setTeamDetails] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleKeyPress = async (event) => {
    const updatedTeamCode = event.target.value.toUpperCase();

    setTeamCode(updatedTeamCode);

    if (updatedTeamCode.length === 6) {
      try {
        const response = await postCheckTeamCode(updatedTeamCode);
        setTeamDetails(response);
        setError(false);

        if (event.key === "Enter") {
          navigate(FCEO_REGIST_MEMBER_2);
        }
      } catch (error) {
        setError(true);
        setErrorMsg(error.response?.data?.error);
        setTeamDetails(null);
      }
    } else {
      setTeamDetails(null);
      setError(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-primary w-full min-h-screen flex items-center justify-center">
        <div className="bg-dark-2 p-8 rounded-lg shadow-lg text-center max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">Team Code</h1>
          <input
            type="text"
            id="teamcode"
            name="teamcode"
            value={teamCode}
            maxLength={6}
            onChange={handleKeyPress}
            className="max-w-fit px-3 py-2 rounded-lg"
            style={{ textTransform: "uppercase" }}
          />
          {error && <p className="text-red-500 mt-2">{errorMsg}</p>}
          {teamDetails && (
            <>
              <div className="text-white mt-2">{teamDetails.message}</div>
              <div className="text-white mt-2">
                {/* Render team details here */}
                <p>Team Name: {teamDetails.teamName}</p>
                <p>Team Leader: {teamDetails.leader}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralCode;
