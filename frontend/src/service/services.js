import axiosInstance from "../config/axiosConfig";
import {
  // Auth
  API_LOGIN,
  API_SIGNUP,
  API_PROFILE_DATA,
  API_POST_FORGOT_PASSWORD,
  API_POST_VERIFY_OTP,
  API_PUT_RESET_PASSWORD,
  // GET DATA
  API_GET_ALL_EVENTS,
  API_GET_USER_REGISTERED_EVENTS,
  API_GET_USER_REGISTERED_COMPETITIONS,
  API_GET_ALL_COMPETITIONS,
  API_POST_CHECK_REF_CODE,
  // FCEO
  API_POST_NEW_FCEO_MEMBER,
  API_POST_NEW_FCEO_TEAM,
  API_POST_CHECK_FCEO_TEAMCODE,
  API_GET_FCEO_REGISTRATION,
  // BMC
  API_GET_BMC_REGISTRATION,
  API_POST_BMC_REGISTRATION,
} from "../config/endpoints";

//Login
const login = async (data) => {
  try {
    const response = await axiosInstance.post(API_LOGIN, data);
    const token = response.data.token;
    const userId = response.data.user.id;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    return response.data;
  } catch (error) {
    console.error("Error logging in: ", error);
    if (error.response) {
      throw new Error(
        error.response.data.message[0].msg || "Incorrrect email or password"
      );
    } else {
      throw new Error("Network error");
    }
  }
};

// Register
const register = async (data) => {
  try {
    const response = await axiosInstance.post(API_SIGNUP, data);
    const token = response.data.token;
    const userId = response.data.user.id;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    console.log("response from services.js/register:", response);
    return response.data;
  } catch (error) {
    console.error("Error signing up: ", error);
    if (error.response) {
      throw new Error(error.response.data.message[0].msg);
    } else {
      throw new Error("Network error");
    }
  }
};

// Forgot Password
const postForgotPassword = async (email) => {
  const data = { email: email };

  try {
    const res = await axiosInstance.post(API_POST_FORGOT_PASSWORD, data);
    return res;
  } catch (error) {
    console.error("Error forgot password: ", error);
    throw error;
  }
};

// Verify OTP
const postVerifyOtp = async (otp) => {
  const data = { otpCode: otp };
  try {
    const res = await axiosInstance.post(API_POST_VERIFY_OTP, data);
    return res;
  } catch (error) {
    console.error("Error verifying OTP: ", error);
    throw error;
  }
};

// Reset password
const putResetPassword = async ({ email, password }) => {
  const data = { email, password };
  try {
    const res = await axiosInstance.put(API_PUT_RESET_PASSWORD, data);
    return res;
  } catch (error) {
    console.error("Error resetting password: ", error);
    throw error;
  }
};

// Get Profile Datas
const fetchProfileData = async (data) => {
  try {
    const res = await axiosInstance.post(API_PROFILE_DATA, data);
    return res.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};

// PUT profile datas
const putProfileData = async (data) => {
  try {
    const response = await axiosInstance.put(API_PROFILE_DATA, data);
    return response;
  } catch (error) {
    console.error("Error sending profile data:", error);
    throw error;
  }
};

// Get all events
const fetchAllEvents = async () => {
  try {
    const response = await axiosInstance.get(API_GET_ALL_EVENTS);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Get events registered by user
const fetchRegisteredEvents = async () => {
  try {
    const response = await axiosInstance.get(API_GET_USER_REGISTERED_EVENTS);
    return response.data.events;
  } catch (error) {
    console.error("Error fetching registered event(s):", error);
    throw error;
  }
};

// Get two events for homepage
const fetchTwoEvents = async () => {
  try {
    const response = await axiosInstance.get(API_GET_ALL_EVENTS);
    const allEvents = response.data;

    const twoEvents = allEvents.slice(0, 2);
    return twoEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Get competitions registered by user
const fetchRegisteredCompetitions = async () => {
  try {
    const response = await axiosInstance.get(
      API_GET_USER_REGISTERED_COMPETITIONS
    );
    return response.data.competitions;
  } catch (error) {
    console.error("Error fetching registered competition(s):", error);
    throw error;
  }
};

//BMC
const postBMCRegistration = async (data) => {
  try {
    const response = await axiosInstance.post(API_POST_BMC_REGISTRATION, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchAllCompetitions = async () => {
  try {
    const response = await axiosInstance.get(API_GET_ALL_COMPETITIONS);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching competition(s):", error);
    throw error;
  }
};

const getBmcRegistrationData = async (data) => {
  try {
    const response = await axiosInstance.get(API_GET_BMC_REGISTRATION, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// FCEO
const postNewFceoMember = async (data) => {
  try {
    console.log("in postNewFceoMember ", data);
    const response = await axiosInstance.post(API_POST_NEW_FCEO_MEMBER, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postNewFceoTeam = async (data) => {
  try {
    const response = await axiosInstance.post(API_POST_NEW_FCEO_TEAM, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFceoRegistrationData = async (data) => {
  try {
    const response = await axiosInstance.get(API_GET_FCEO_REGISTRATION, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//LATER RECYCLE FOR REFERRAL CODE
const postCheckTeamCode = async (data) => {
  try {
    const response = await axiosInstance.post(API_POST_CHECK_FCEO_TEAMCODE, {
      teamCode: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postCheckReferralCode = async (data) => {
  try {
    console.log("in postCheckReferralCode");
    console.log("data ", data);
    const response = await axiosInstance.post(API_POST_CHECK_REF_CODE, {
      referralCode: data.code,
      eventName: data.eventName,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  login,
  register,
  fetchProfileData,
  putProfileData,
  fetchRegisteredEvents,
  fetchAllEvents,
  fetchTwoEvents,
  fetchAllCompetitions,
  fetchRegisteredCompetitions,
  postNewFceoMember,
  postNewFceoTeam,
  getFceoRegistrationData,
  postCheckTeamCode,
  postCheckReferralCode,
  postBMCRegistration,
  getBmcRegistrationData,
  postForgotPassword,
  postVerifyOtp,
  putResetPassword,
};
