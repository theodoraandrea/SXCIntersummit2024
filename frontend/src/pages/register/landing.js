import React, { useState, useEffect } from "react";
import bg from "./../../images/Kiri.png";
import {
  login,
  register,
  postForgotPassword,
  postVerifyOtp,
  putResetPassword,
} from "../../service/services";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/user-context";
import { USER_DETAILS_PAGE, HOME } from "../../constants/routes";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Swal from "sweetalert2";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

export default function Landing() {
  const { loginUser } = useUser();

  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpIsValid, setOtpIsValid] = useState(null);
  const [otpTouched, setOtpTouched] = useState(false);
  const [enterNewPasswordMode, setEnterNewPasswordMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    if (otpTouched) {
      setOtpIsValid(otp.length === 6); // Assuming OTP is 6 digits
    }
  }, [email, password, confirmPassword, otp]);

  useEffect(() => {
    if (emailTouched && !emailIsValid) {
      setValidationMessage("Invalid email format");
    } else if (passwordTouched && !passwordIsValid) {
      setValidationMessage("Password must be at least 6 characters long");
    } else if (confirmPasswordTouched && !confirmPasswordIsValid) {
      setValidationMessage("Passwords do not match");
    } else if (otpTouched && !otpIsValid) {
      setValidationMessage("Invalid OTP");
    } else {
      setValidationMessage("");
    }
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    return passwordIsValid && password === confirmPassword;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateEmail(email.trim())) {
      try {
        setIsLoading(true);
        const response = await login({ email, password });
        console.log("Login successful", response);
        loginUser(response.user);
        navigate(HOME);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validatePassword()) {
      const data = {
        email: email,
        password: password,
      };
      try {
        setIsLoading(true);
        const response = await register(data);
        loginUser();
        navigate(USER_DETAILS_PAGE);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    } else {
      setValidationMessage("Passwords do not match");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (validateEmail(email.trim())) {
      try {
        setIsLoading(true);
        const response = await postForgotPassword(email);
        console.log(response);
        if (response.status === 201) {
          Swal.fire({
            title: "Success!",
            text: "Please check your email for the OTP!",
            icon: "success",
            confirmButtonText: "Okay",
            customClass: {
              confirmButton:
                "bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500",
            },
            buttonsStyling: false,
          });
          setOtpMode(true);
          setForgotPasswordMode(false);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(
          "Failed to send password reset email. Please try again."
        );
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await postVerifyOtp(otp);
      console.log(response);
      if (response.status === 200) {
        setEnterNewPasswordMode(true);
        setOtpMode(false);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      try {
        setIsLoading(true);
        const response = await putResetPassword({ email, password });
        if (response.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Password Reset Success! please login with your new password.",
            icon: "success",
            confirmButtonText: "Okay",
            customClass: {
              confirmButton:
                "bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500",
            },
            buttonsStyling: false,
          });
          setEnterNewPasswordMode(false);
          setForgotPasswordMode(false);
          setOtpMode(false);
          setActiveTab("login");
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    } else {
      setValidationMessage("Passwords do not match or invalid.");
    }
  };

  const resetAllModes = () => {
    setForgotPasswordMode(false);
    setOtpMode(false);
    setEnterNewPasswordMode(false);
    setActiveTab("login");
    setErrorMessage("");
    setValidationMessage("");
  };

  const scrollToFormContainer = () => {
    const formContainer = document.getElementById("form-container");

    if (formContainer) {
      formContainer.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row ">
      {/* Left Side */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center md:w-1/2"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <button
          className="md:hidden absolute bottom-5 left-1/2 text-black p-2 rounded-full shadow-md hover:bg-gray-200 focus:outline-none"
          onClick={scrollToFormContainer}
        >
          <ArrowDropDownCircleIcon style={{ color: "white" }} />
        </button>
      </div>

      {/* Right Side */}
      <div
        id="form-container"
        className="w-full min-h-screen md:h-full md:w-1/2 bg-primary-1 flex flex-col justify-center items-center p-8"
      >
        <div className="flex justify-center space-x-6 mb-8">
          {/* Login Page or Register page*/}
          {!forgotPasswordMode && !otpMode && !enterNewPasswordMode && (
            <>
              <button
                className={`text-lg font-semibold ${
                  activeTab === "login"
                    ? "text-yellow-500 border-b-4 border-yellow-500"
                    : "text-gray-500"
                }`}
                onClick={() => {
                  resetAllModes();
                  setActiveTab("login");
                }}
              >
                Login
              </button>
              <button
                className={`text-lg font-semibold ${
                  activeTab === "register"
                    ? "text-yellow-500 border-b-4 border-yellow-500"
                    : "text-gray-500"
                }`}
                onClick={() => {
                  resetAllModes();
                  setActiveTab("register");
                }}
              >
                Register
              </button>
            </>
          )}
        </div>
        {!forgotPasswordMode &&
          !otpMode &&
          !enterNewPasswordMode &&
          activeTab === "login" && (
            <>
              <form
                className="w-full max-w-sm text-white"
                onSubmit={handleLogin}
              >
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
                <small
                  className="text-red-400 mb-4 block"
                  hidden={!errorMessage}
                >
                  {errorMessage}
                </small>
                <button
                  className={`w-full px-5 py-2 mb-4 text-white font-bold rounded-lg 
                    ${
                      isLoading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-primary-3 hover:bg-yellow-600 focus:ring-yellow-500"
                    }
                    focus:outline-none focus:ring-2`}
                  type="submit"
                  disabled={isLoading}
                >
                  Login
                </button>
                <small
                  className="text-gray-500 hover:text-white hover:underline cursor-pointer"
                  onClick={() => {
                    resetAllModes();
                    setForgotPasswordMode(true);
                  }}
                >
                  Forgot Password?
                </small>
              </form>
            </>
          )}
        {!forgotPasswordMode &&
          !otpMode &&
          !enterNewPasswordMode &&
          activeTab === "register" && (
            <>
              <form
                className="w-full max-w-sm text-white"
                onSubmit={handleRegister}
              >
                <div className="relative w-full mb-4">
                  <input
                    id="email"
                    className={`w-full px-4 py-2 border rounded-lg bg-opacity-25 bg-white pr-10 ${
                      emailTouched &&
                      (emailIsValid ? "border-green-500" : "border-red-500")
                    }`}
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
                    className={`w-full px-4 py-2 border rounded-lg bg-opacity-25 bg-white pr-10 ${
                      passwordTouched &&
                      (passwordIsValid ? "border-green-500" : "border-red-500")
                    }`}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordTouched(true)}
                  />
                  {passwordTouched && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      {passwordIsValid ? (
                        <CheckCircleOutlineIcon className="text-green-500" />
                      ) : (
                        <ErrorOutlineIcon className="text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                <div className="relative w-full mb-4">
                  <input
                    id="confirmPassword"
                    className={`w-full px-4 py-2 border rounded-lg bg-opacity-25 bg-white pr-10 ${
                      confirmPasswordTouched &&
                      (confirmPasswordIsValid
                        ? "border-green-500"
                        : "border-red-500")
                    }`}
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setConfirmPasswordTouched(true)}
                  />
                  {confirmPasswordTouched && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      {confirmPasswordIsValid ? (
                        <CheckCircleOutlineIcon className="text-green-500" />
                      ) : (
                        <ErrorOutlineIcon className="text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                <small
                  className="text-red-400 mb-4 block"
                  hidden={!validationMessage}
                >
                  {validationMessage}
                </small>
                <small
                  className="text-red-400 mb-4 block"
                  hidden={!errorMessage}
                >
                  {errorMessage}
                </small>
                <button
                  className={`w-full px-5 py-2 mb-4 text-white font-bold rounded-lg 
                    ${
                      isLoading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-primary-3 hover:bg-yellow-600 focus:ring-yellow-500"
                    }
                    focus:outline-none focus:ring-2`}
                  type="submit"
                  disabled={isLoading}
                >
                  Register
                </button>
              </form>
            </>
          )}
        {/* Forgot password page */}
        {forgotPasswordMode && !otpMode && !enterNewPasswordMode && (
          <>
            <form
              className="w-full max-w-sm text-white"
              onSubmit={handleForgotPassword}
            >
              <p className="flex text-lg justify-center font-semibold text-yellow-500 pb-5">
                Forgot Password
              </p>
              <input
                id="forgotPasswordEmail"
                className="w-full px-4 py-2 mb-4 border rounded-lg bg-opacity-25 bg-white"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className={`w-full px-5 py-2 mb-4 text-white font-bold rounded-lg 
                  ${
                    isLoading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-primary-3 hover:bg-yellow-600 focus:ring-yellow-500"
                  }
                  focus:outline-none focus:ring-2`}
                type="submit"
                disabled={isLoading}
              >
                Send OTP
              </button>
              <small
                className="text-gray-500 hover:text-white hover:underline cursor-pointer"
                onClick={() => {
                  resetAllModes();
                  setActiveTab("login");
                }}
              >
                Back
              </small>
            </form>
          </>
        )}
        {/* Enter OTP page */}
        {otpMode && (
          <>
            <form
              className="w-full max-w-sm text-white"
              onSubmit={handleOtpSubmit}
            >
              <input
                id="otp"
                className="w-full px-4 py-2 mb-4 border rounded-lg bg-opacity-25 bg-white"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className={`w-full px-5 py-2 mb-4 text-white font-bold rounded-lg 
                  ${
                    isLoading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-primary-3 hover:bg-yellow-600 focus:ring-yellow-500"
                  }
                  focus:outline-none focus:ring-2`}
                type="submit"
                disabled={isLoading}
              >
                Verify OTP
              </button>
            </form>
          </>
        )}
        {/* Enter new password page */}
        {enterNewPasswordMode && (
          <>
            <form className="w-full max-w-sm" onSubmit={handleResetPassword}>
              <input
                id="newPassword"
                className="w-full px-4 py-2 mb-4 border rounded-lg bg-opacity-25 bg-white"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordTouched(true)}
              />
              <input
                id="confirmNewPassword"
                className="w-full px-4 py-2 mb-4 border rounded-lg bg-opacity-25 bg-white"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmPasswordTouched(true)}
              />
              <small
                className="text-red-400 mb-4 block"
                hidden={!validationMessage}
              >
                {validationMessage}
              </small>
              <button
                className={`w-full px-5 py-2 mb-4 text-white font-bold rounded-lg 
                  ${
                    isLoading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-primary-3 hover:bg-yellow-600 focus:ring-yellow-500"
                  }
                  focus:outline-none focus:ring-2`}
                type="submit"
                disabled={isLoading}
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
