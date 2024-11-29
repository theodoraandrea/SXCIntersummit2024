import React, { useState } from "react";
import { validateSummitRegistrationCode } from "../../service/services";
import Spinner from "../../components/elements/spinner";

const Summit = () => {
  const [summitRegistrationCode, setSummitRegistrationCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleVerification = async (e) => {
    e.preventDefault();

    const trimmedCode = summitRegistrationCode.trim();

    if (!trimmedCode) {
      setMessage("Please enter a code.");
      return;
    }

    // Cek apakah kode sudah diverifikasi sebelumnya
    const isAlreadyVerified = data.some((item) => item.code === trimmedCode);
    if (isAlreadyVerified) {
      setMessage("Code has already been verified.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await validateSummitRegistrationCode(trimmedCode);

      if (response) {
        const verifiedData = { ...response, code: trimmedCode, status: "Verified" };
        setData([...data, verifiedData]);
        setMessage("Code Verified Successfully!");
      } else {
        setMessage("Code not found. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setMessage("An error occurred while verifying the code.");
    } finally {
      setLoading(false);
      setSummitRegistrationCode("");
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
                Enter Summit Registration Code:
              </label>
              <input
                type="text"
                value={summitRegistrationCode}
                onChange={(e) => setSummitRegistrationCode(e.target.value)}
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

        {data.length > 0 && (
          <div className=" backdrop-blur-md p-2 md:p-6 rounded-lg shadow-lg mt-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Verified Data
            </h2>
            <table className="w-full text-xs text-gray-700 border-collapse sm:text-xs md:text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-primary-3 to-primary-3 text-white">
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center odd:bg-gray-100 even:bg-gray-200 hover:bg-primary-6 transition-all"
                  >
                    <td className="p-3 border">{item.registrant.name}</td>
                    <td className="p-3 border">{item.registrant.email}</td>
                    <td className="p-3 border text-green-600 font-bold">
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Summit;
