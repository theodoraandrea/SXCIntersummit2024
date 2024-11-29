import React, { useState, useEffect } from "react";
import { getIntersummitRegistrationData } from "../../service/services";
import Spinner from "../../components/elements/spinner";
import { errorAlert, successAlert } from "../../components/alert";

const Summit = () => {
  const [uniqueCode, setUniqueCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch data awal saat komponen dimuat
  useEffect(() => {
    // No need to fetch initial data anymore
  }, []); // No longer necessary to fetch initial data

  const handleVerification = async (e) => {
    e.preventDefault();

    if (!uniqueCode.trim()) {
      setMessage("Please enter a code.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Directly check the database for the unique code
      const response = await getIntersummitRegistrationData(uniqueCode);

      if (response && response.valid) {
        // If the code is valid, we assume it is new and verified
        successAlert("Code Verified Successfully!");
      } else {
        // Invalid code handling
        errorAlert("Invalid Code. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      errorAlert("An error occurred while verifying the code.");
    } finally {
      setLoading(false);
      setUniqueCode("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-1 via-primary-1 to-primary-1 text-white flex flex-col items-center justify-center">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wider drop-shadow-lg">
          Code Verification System
        </h1>

        <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <form onSubmit={handleVerification}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Unique Code:
              </label>
              <input
                type="text"
                value={uniqueCode}
                onChange={(e) => setUniqueCode(e.target.value)}
                placeholder="Enter your code"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-3 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-3 to-primary-3 hover:from-primary-2 hover:to-primary-2 text-white py-3 rounded-lg shadow-lg font-semibold transition-all"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
          {message && (
            <p
              className={`text-center mt-4 font-medium transition-all ${
                message.includes("Successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {loading ? (
          <Spinner />
        ) : (
          // Data table section has been removed since it's no longer needed
          <></>
        )}
      </div>
    </div>
  );
};

export default Summit;
