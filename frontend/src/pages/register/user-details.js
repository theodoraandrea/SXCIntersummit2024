import React, { useState, useEffect } from "react";
import bg from "./../../images/Kiri.png";
import { useNavigate } from "react-router-dom";
import { putProfileData } from "../../service/services";
import { HOME, LANDING_PAGE } from "../../constants/routes";
import { useUser } from "../../contexts/user-context";

export default function UserDetails() {
  const { isLoggedIn, profileData, loading } = useUser();
  const [fullName, setFullName] = useState("");
  const [ gender, setGender ] = useState("");
  const [ institution, setInstitution ] = useState("");
  const [ major, setMajor ] = useState("");
  const [ phoneNumber, setPhoneNumber ] = useState("+62 "); // For display
  const [ batch, setBatch ] = useState("");
  const [ errors, setErrors ] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        navigate(LANDING_PAGE);
      }

      if (profileData) {
        setFullName(profileData.fullname);
        setMajor(profileData.major);
        setInstitution(profileData.institution);
        setBatch(profileData.batch);
        setPhoneNumber(profileData.phoneNumber);
        setGender(profileData.gender);
      }
    }
  }, [loading, isLoggedIn, profileData]);

  useEffect(() => {
    if (fullName) setErrors((errors) => ({ ...errors, fullname: undefined }));
  }, [fullName]);

  useEffect(() => {
    if (gender) setErrors((errors) => ({ ...errors, gender: undefined }));
  }, [gender]);

  useEffect(() => {
    if (institution)
      setErrors((errors) => ({ ...errors, institution: undefined }));
  }, [institution]);

  useEffect(() => {
    if (major) setErrors((errors) => ({ ...errors, major: undefined }));
  }, [major]);

  useEffect(() => {
    if (phoneNumber)
      setErrors((errors) => ({ ...errors, phoneNumber: undefined }));
  }, [phoneNumber]);

  useEffect(() => {
    if (batch) setErrors((errors) => ({ ...errors, batch: undefined }));
  }, [batch]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      fullname: sanitizeInput(fullName),
      gender: gender,
      institution: sanitizeInput(institution),
      major: sanitizeInput(major),
      phoneNumber: phoneNumber,
      batch: batch,
    };

    console.log(data);
    const newErrors = {};

    if (!data.fullname) newErrors.fullname = "Full Name is required";
    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.institution) newErrors.institution = "Institution is required";
    if (!data.major) newErrors.major = "Major is required";
    if (!data.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!data.batch) newErrors.batch = "Batch is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      console.log("data from user-details: ", data);
      const response = await putProfileData(data);
      console.log(response);
      if (response.status === 200) {
        console.log("Profile updated successfully");
        navigate(HOME);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const sanitizeInput = (input) => {
    return input.trim().replace(/[^a-zA-Z\s]/g, "");
  };

  const handlePhoneNumberChange = (e) => {
    let inputValue = e.target.value;

    let numericValue = inputValue.replace(/\D/g, "");

    if (!numericValue.startsWith("62")) {
      numericValue = `62${numericValue}`;
    }

    const formattedValue = numericValue.replace(
      /(\d{2})(\d{4})(\d{4})(\d*)/,
      "+62 $2 $3 $4"
    );

    setPhoneNumber(formattedValue);
  };

  // Constants for Batches
  const oldestBatch = 2016;
  const currentYear = new Date().getFullYear();

  const batchesOptions = Array.from(
    { length: currentYear - oldestBatch + 1 },
    (_, i) => oldestBatch + i
  );

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      {/* Right Side */}
      <div className="w-1/2 bg-primary-1 flex justify-center items-center">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-xl px-6 py-8 rounded-lg shadow-lg text-white"
        >
          <h1 className="text-4xl font-bold mb-4 text-left">
            Let us know more about you
          </h1>

          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                id="fullName"
                className="w-full px-4 py-2 mb-1 border rounded-lg bg-opacity-25 bg-white"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e)=>setFullName(e.target.value)}
              />
              {errors.fullname && (
                <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
              )}
            </div>

            <div className="w-1/2 px-2 mb-4">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                id="gender"
                className="w-full px-4 py-2 mb-1 border rounded-lg bg-opacity-25 bg-white"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option className="text-black" value="">
                  Select Gender
                </option>
                <option className="text-black" value="Male">
                  Male
                </option>
                <option className="text-black" value="Female">
                  Female
                </option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="institution"
              >
                Institution
              </label>
              <input
                id="institution"
                className="w-full px-4 py-2 mb-1 border rounded-lg bg-opacity-25 bg-white"
                type="text"
                placeholder="Institution"
                value={institution}
                onChange={(e)=>setInstitution(e.target.value)}
              />
              <small className="text-gray-400">
                Example: Universitas Indonesia
              </small>
              {errors.institution && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.institution}
                </p>
              )}
            </div>

            <div className="w-1/2 px-2 mb-4">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="major"
              >
                Major
              </label>
              <input
                id="major"
                className="w-full px-4 py-2 mb-1 border rounded-lg bg-opacity-25 bg-white"
                type="text"
                placeholder="Major"
                value={major}
                onChange={(e)=>setMajor(e.target.value)}
              />
              <small className="text-gray-400">Example: Computer Science</small>
              {errors.major && (
                <p className="text-red-500 text-xs mt-1">{errors.major}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                className="w-full px-4 py-2 mb-1 border rounded-lg bg-opacity-25 bg-white"
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              <small className="text-gray-400">
                Example: +62 812 3456 7890
              </small>
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="w-1/2 px-2 mb-4">
              <label
                className="block text-sm font-medium text-gray-300 mb-1"
                htmlFor="batch"
              >
                Batch
              </label>
              <select
                id="batch"
                className="w-full px-4 py-2 mb-1 border rounded-lg bg-opacity-25 bg-white"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              >
                <option className="text-black" value="">
                  Select Batch
                </option>
                {batchesOptions.map((year) => {
                  return (
                    <option className="text-black" key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errors.batch && (
                <p className="text-red-500 text-xs mt-1">{errors.batch}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mb-4 bg-primary-3 text-white font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
