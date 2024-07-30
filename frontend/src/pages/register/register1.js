import React from "react";
import bg from "./../../images/Kiri.png";
import { login } from "../../service/services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/user-context";
import { HOME } from "../../constants/routes";

export default function Register1() {
  
  const { loginUser } = useUser();

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ validationMessage, setValidationMessage ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateEmail(email.trim())) {
      console.log("email ok");
      const data = {
        email: email,
        password: password
      }

      try {
        const response = await login({ email, password });
        console.log('Login successful', response); 
        loginUser();
        navigate(HOME);
      } catch (error) {
        console.log('Login failed: ', error);
        setErrorMessage(error.message);
      }
    } else {
      console.log("email not ok");
      setValidationMessage('Please input a valid email address');
    }

    
  }
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      {/* Right Side */}
      <div className="w-1/2 bg-primary-1 flex justify-center items-center">
        <div className="w-full max-w-lg px-6 py-8 rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Hello!
          </h1>
          <form
            onSubmit={handleLogin}
            className="w-full max-w-xl px-6 py-8 rounded-lg shadow-lg text-white">
            <input
              id="email"
              className="w-full px-4 py-2 mb-1 border rounded-lg bg-opacity-25 bg-white"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              className="w-full px-4 py-2 mb-1 border rounded-lg bg-opacity-25 bg-white"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small className="text-red-400" hidden={!errorMessage}>
                {errorMessage}
            </small>
          <button className="w-auto px-5 py-2 mb-4 bg-primary-3 text-white font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex"
            type="submit">
              Login
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}
