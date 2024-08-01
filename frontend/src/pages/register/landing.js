import React from "react";
import bg from "./../../images/Kiri.png";
import { login, register } from "../../service/services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../../contexts/user-context";
import { USER_DETAILS_PAGE, HOME } from "../../constants/routes";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Landing() {
  
  const { loginUser } = useUser();

  const [activeTab, setActiveTab] = useState("login");

  const [ email, setEmail ] = useState("");
  const [ emailIsValid, setEmailIsValid ] = useState(null);
  const [ emailTouched, setEmailTouched ] = useState(false);
  const [ passwordIsValid, setPasswordIsValid ] = useState(null);
  const [ password, setPassword ] = useState("");
  const [ passwordTouched, setPasswordTouched ] = useState(false);
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ confirmPasswordTouched, setConfirmPasswordTouched ] = useState(false);
  const [ confirmPasswordIsValid, setConfirmPasswordIsValid ] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ validationMessage, setValidationMessage ] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (emailTouched) {
      setEmailIsValid(validateEmail(email));
    }
    if (passwordTouched) {
      setPasswordIsValid(password.length >= 6);
    }
    if (confirmPasswordTouched) {
      setConfirmPasswordIsValid(password === confirmPassword);
    }
  }, [email, password, confirmPassword]);

  useEffect(() => {
    if (emailTouched && !emailIsValid) {
      setValidationMessage('Invalid email format');
    } else if (passwordTouched && !passwordIsValid) {
      setValidationMessage('Password must be at least 6 characters long');
    } else if (confirmPasswordTouched && !confirmPasswordIsValid) {
      setValidationMessage('Passwords do not match');
    } else {
      setValidationMessage('');
    }
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    return passwordIsValid && (password === confirmPassword);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateEmail(email.trim())) {
      console.log("email ok");
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
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (validatePassword()) {
      const data = {
        email: email,
        password: password
      }
      try {
        const response = await register(data);
        console.log("Successfully registered: ", response);
        loginUser();
        navigate(USER_DETAILS_PAGE);
      } catch (error) {
        console.log("Registration failed: ", error);
        setErrorMessage(error.message);
      }
    } else {
      setValidationMessage("Passwords do not match");
    }
  }
  return (
    <div className="flex h-screen">
  {/* Left Side */}
  <div
    className="w-1/2 bg-cover bg-center"
    style={{ backgroundImage: `url(${bg})` }}
  />

  {/* Right Side */}
  <div className="w-1/2 bg-primary-1 flex flex-col justify-center items-center p-8">
    <div className="flex justify-center space-x-6 mb-8">
      <button
        className={`text-lg font-semibold ${
          activeTab === "login"
            ? "text-yellow-500 border-b-4 border-yellow-500"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("login")}
      >
        Login
      </button>
      <button
        className={`text-lg font-semibold ${
          activeTab === "register"
            ? "text-yellow-500 border-b-4 border-yellow-500"
            : "text-gray-500"
        }`}
        onClick={() => setActiveTab("register")}
      >
        Register
      </button>
    </div>
    {activeTab === "login" && (
      <>
        <form className="w-full max-w-sm" onSubmit={handleLogin}>
          <input
            id="email"
            className="w-full px-4 py-2 mb-4 border rounded-lg bg-opacity-25 bg-white"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            className="w-full px-4 py-2 mb-4 border rounded-lg bg-opacity-25 bg-white"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small className="text-red-400 mb-4 block" hidden={!errorMessage}>
            {errorMessage}
          </small>
          <button
            className="w-full px-5 py-2 mb-4 bg-primary-3 text-white font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="submit"
          >
            Login
          </button>
        </form>
      </>
    )}
    {activeTab === "register" && (
      <>
        <form className="w-full max-w-sm" onSubmit={handleRegister}>
          <div className="relative w-full mb-4">
          <input
            id="email"
            className={`w-full px-4 py-2 border rounded-lg bg-opacity-25 bg-white pr-10 ${emailTouched && (emailIsValid ? 'border-green-500' : 'border-red-500')}`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailTouched(true)}
          />
              {emailTouched && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {emailIsValid ? (
                    <CheckCircleOutlineIcon className="text-green-500" />
                  ) : (
                    <ErrorOutlineIcon className="text-red-500" />
                  )}
                </div>
              )}
          </div>
          <div className="relative w-full mb-4">
          <input
            id="password"
            className={`w-full px-4 py-2 border rounded-lg bg-opacity-25 bg-white pr-10 ${passwordTouched && (passwordIsValid ? 'border-green-500' : 'border-red-500')}`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordTouched(true)}
          />
          {
            passwordTouched && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                { passwordIsValid ? (
            <CheckCircleOutlineIcon className="text-green-500" />
          ) : (
          <ErrorOutlineIcon className="text-red-500" />
                )}
              </div>
            )
          }
          </div>
          <div className="relative w-full mb-4">
          <input
            id="confirmPassword"
            className={`w-full px-4 py-2 border rounded-lg bg-opacity-25 bg-white pr-10 ${confirmPasswordTouched && (confirmPasswordIsValid ? 'border-green-500' : 'border-red-500')}`}
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setConfirmPasswordTouched(true)}
          />
          {
            confirmPasswordTouched && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                { confirmPasswordIsValid ? (
                <CheckCircleOutlineIcon className="text-green-500" />
                ) : (
                <ErrorOutlineIcon className="text-red-500" />
                )}
              </div>
            )
          }
          </div>
          <small className="text-red-400 mb-4 block" hidden={!validationMessage}>
            {validationMessage}
          </small>
          <small className="text-red-400 mb-4 block" hidden={!errorMessage}>
            {errorMessage}
          </small>
          <button
            className="w-full px-5 py-2 mb-4 bg-primary-3 text-white font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            type="submit"
          >
            Register
          </button>
        </form>
      </>
    )}
  </div>
</div>

  );
}
