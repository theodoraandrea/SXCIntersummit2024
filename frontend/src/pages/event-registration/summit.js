import React, { useState } from "react";
import { getSummitRegistrationData } from "../../service/services";
import Spinner from "../../components/elements/spinner";

const Summit = () => {
  const [summitRegistrationCode, setSummitRegistrationCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleVerification = async (e) => {
    e.preventDefault();

    // Trim kode untuk menghapus spasi ekstra
    const trimmedCode = summitRegistrationCode.trim();

    if (!trimmedCode) {
      setMessage("Please enter a code.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Cek kode verifikasi langsung dari database
      const response = await getSummitRegistrationData(trimmedCode);

      if (response && response.valid) {
        setResponseData(response); // Menyimpan respons API ke state
        setMessage("Code Verified Successfully!");
      } else {
        setResponseData(null); // Reset data jika kode tidak valid
        setMessage("Invalid Code. Please try again.");
        console.log("Invalid code response data:", response);
        console.log("Kode yang diterima backend:", summitRegistrationCode);

      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setMessage("An error occurred while verifying the code.");
    } finally {
      setLoading(false);
      setSummitRegistrationCode(""); // Reset input setelah proses
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

          {/* Menampilkan data respons jika kode valid */}
          {responseData && responseData.valid && (
            <div className="mt-6 bg-white/90 p-4 rounded-lg shadow-lg text-gray-800">
              <h3 className="text-xl font-semibold">Registration Details:</h3>
              <p><strong>Name:</strong> {responseData.name}</p>
              <p><strong>Email:</strong> {responseData.email}</p>
              <p><strong>Registration Date:</strong> {responseData.registrationDate}</p>
            </div>
          )}
        </div>

        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Summit;
