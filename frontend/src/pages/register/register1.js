import React, { useState } from "react";
import bg from "./../../images/Kiri.png";
import google from "./../../images/google.png";
import { Link } from "react-router-dom";
import { API_GOOGLE_LOGIN } from "../../config/endpoints";

export default function Register1() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);


  const validateEmail = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    }

    if (isValid) {
      setFormSubmitted(true);
      // Handle registration logic here, e.g., make API call
      console.log("Email:", email);
      console.log("Password:", password);
    }
  };


  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      {/* Right Side */}
      {/* code for registration using text field email and password */}
      {/* <div className="w-1/2 bg-primary-1 flex justify-center items-center">
        <div className="w-full max-w-lg px-6 py-8 rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Join With Google Account
          </h1>
          <Link to={API_GOOGLE_LOGIN}>
            <button className="w-auto px-5 py-2 mb-4 bg-primary-3 text-white font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex">
              <img
                src={google}
                alt="google-logo"
                className="w-5 mr-2 my-auto"
              />
              Sign Up With Google
            </button>
          </Link>
        </div>
      </div> */}

      {/* Right Side */}
      <div className="w-1/2 bg-primary-1 flex justify-center items-center">
        <div className="w-full max-w-lg px-6 py-8 rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Register
          </h1>

          {/* Registration Form */}
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${emailError ? "border border-red-500" : ""}`}
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${passwordError ? "border border-red-500" : ""}`}
                required
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className={`w-full px-5 py-2 bg-primary-3 text-white font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-transform ${formSubmitted ? "scale-95" : ""}`}
            >
              Register
            </button>
            {formSubmitted && !emailError && !passwordError && (
              <p className="text-green-500 text-center mt-4">Registration successful!</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
