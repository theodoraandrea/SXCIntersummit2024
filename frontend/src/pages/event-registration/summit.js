import React, { useState, useEffect } from "react";
import Spinner from "../../components/elements/spinner";
import { errorAlert, successAlert } from "../../components/alert";
import {
  getSummitRegistrationData,
  validateSummitRegistrationCode,
} from "../../service/services";

const Summit = () => {
  const [uniqueCode, setUniqueCode] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data awal
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const responseData = await getSummitRegistrationData();
        setData(responseData || []); // Pastikan data berupa array
        console.log(data);
      } catch (error) {
        errorAlert("Failed to fetch initial data.");
        console.log(data);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleVerification = async (e) => {
    e.preventDefault();

    if (!uniqueCode.trim()) {
      setMessage("Please enter a valid code.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const result = await validateSummitRegistrationCode(uniqueCode);

      if (result && result.message === "Summit registration code is valid") {
        successAlert(`Code Verified Successfully for ${result.registrant.name}!`);

        // Update daftar data dengan hasil baru
        const updatedData = [
          ...data,
          {
            code: uniqueCode,
            name: result.registrant.name,
            batch: result.registrant.batch || "Unknown Batch",
            school: result.registrant.school || result.registrant.email,
            status: "Verified",
          },
        ];
        setData(updatedData);
      } else {
        errorAlert(result.message || "Invalid Code. Please try again.");
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
    <div className="min-h-screen bg-gradient-to-b from-primary-1 to-primary-1 text-white flex flex-col items-center justify-center">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wider">
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
              className="w-full bg-gradient-to-r from-primary-3 to-primary-2 text-white py-3 rounded-lg shadow-lg font-semibold transition-all"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
          {message && (
            <p
              className={`text-center mt-4 font-medium ${
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
          data.length > 0 && (
            <div className="backdrop-blur-md p-6 rounded-lg shadow-lg mt-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-4">
                Verified Data
              </h2>
              <table className="w-full border-collapse text-gray-700">
                <thead>
                  <tr className="bg-primary-3 text-white">
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">Batch</th>
                    <th className="p-3 border">School/University</th>
                    <th className="p-3 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={`${item.code}-${index}`}
                      className="odd:bg-gray-100 even:bg-gray-200 hover:bg-primary-6"
                    >
                      <td className="p-3 border">{item.name}</td>
                      <td className="p-3 border">{item.batch}</td>
                      <td className="p-3 border">{item.school}</td>
                      <td className="p-3 border text-green-600 font-bold">
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Summit;
