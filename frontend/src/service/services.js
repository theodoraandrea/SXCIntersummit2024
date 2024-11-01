import axiosInstance from "../config/axiosConfig";
import {
  // Auth
  API_LOGIN,
  API_SIGNUP,
  API_PROFILE_DATA,
  API_POST_FORGOT_PASSWORD,
  API_POST_VERIFY_OTP,
  API_PUT_RESET_PASSWORD,
  API_POST_VERIFY_EMAIL,
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
  API_GET_TWO_EVENTS,
  API_GET_TWO_COMPETITIONS,
  // IBPC
  API_GET_IBPC_REGISTRATION,
  API_POST_NEW_IBPC_MEMBER,
  API_POST_NEW_IBPC_TEAM,
  API_POST_CHECK_IBPC_TEAMCODE,
  //IBCC
  API_GET_IBCC_INDIVIDUAL_SUMMARY,
  API_GET_IBCC_TEAM_SUMMARY,
  API_POST_NEW_IBCC_INDIVIDUAL,
  API_POST_NEW_IBCC_TEAM,
  API_POST_NEW_IBCC_MEMBER,
  // CHAMBERS
  API_GET_CHAMBERS_REGISTRATION,
  API_POST_CHAMBERS_REGISTRATION,
  // COMVIS
  API_GET_COMPVIS_REGISTRATION,
  API_POST_COMPVIS_REGISTRATION,
  // SUMMIT
  API_GET_SUMMIT_REGISTRATION,
  API_POST_SUMMIT_REGISTRATION,
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

// Verify Email
const postVerifyEmail = async ({ email, password }) => {
  const data = { email, password };
  try {
    const res = await axiosInstance.post(API_POST_VERIFY_EMAIL, data);
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

//Get 2 latest events for homepage
const fetchTwoLatestEvents = async () => {
  try {
    const response = await axiosInstance.get(API_GET_TWO_EVENTS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Get 2 latest competitions for homepage
const fetchTwoLatestCompetitions = async () => {
  try {
    const response = await axiosInstance.get(API_GET_TWO_COMPETITIONS);
    return response.data;
  } catch (error) {
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
    throw error;
  }
};

// CHAMBERS
const postChambersRegistration = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_POST_CHAMBERS_REGISTRATION,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getChambersRegistrationData = async () => {
  try {
    const response = await axiosInstance.get(API_GET_CHAMBERS_REGISTRATION);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// FCEO
const postNewFceoMember = async (data) => {
  try {
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
    throw error;
  }
};

// IBPC
const postNewIbpcMember = async (data) => {
  try {
    const response = await axiosInstance.post(API_POST_NEW_IBPC_MEMBER, data, {
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

const postNewIbpcTeam = async (data) => {
  try {
    const response = await axiosInstance.post(API_POST_NEW_IBPC_TEAM, data, {
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

const getIbpcRegistrationData = async (data) => {
  try {
    const response = await axiosInstance.get(API_GET_IBPC_REGISTRATION, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// IBCC
const postNewIbccTeam = async (data) => {
  try {
    const response = await axiosInstance.post(API_POST_NEW_IBCC_TEAM, data, {
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

const postNewIbccMember = async (data) => {
  try {
    const response = await axiosInstance.post(API_POST_NEW_IBCC_MEMBER, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postNewIbccIndividual = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_POST_NEW_IBCC_INDIVIDUAL,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getIbccIndividualRegistration = async (data) => {
  try {
    const response = await axiosInstance.get(
      API_GET_IBCC_INDIVIDUAL_SUMMARY,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getIbccTeamRegistration = async (data) => {
  try {
    const response = await axiosInstance.get(API_GET_IBCC_TEAM_SUMMARY, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Compvis
const postCompvisRegistration = async (data) => {
  try {
    const response = await axiosInstance.post(
      API_POST_COMPVIS_REGISTRATION,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error registering for Compvis:", error);
    throw error;
  }
};

const getCompvisRegistrationData = async () => {
  // Removed data parameter as it is not used
  try {
    const response = await axiosInstance.get(API_GET_COMPVIS_REGISTRATION);
    return response.data; // return response.data instead of response
  } catch (error) {
    console.error("Error fetching Compvis registration data:", error); // Added specific error log
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

// SUMMIT
const postSummitRegistration = async (data) => {
  try{
    const response = await axiosInstance.post(
      API_POST_SUMMIT_REGISTRATION,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error registering for Summit:", error);
    throw error;
  }
};

const getSummitRegistrationData = async () => {
  try {
    const response = await axiosInstance.get(API_GET_SUMMIT_REGISTRATION);
    return response.data; 
  } catch (error) {
    console.error("Error fetching Summit registration data:", error); 
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
  fetchTwoLatestEvents,
  fetchAllCompetitions,
  fetchTwoLatestCompetitions,
  fetchRegisteredCompetitions,
  postNewFceoMember,
  postNewFceoTeam,
  getFceoRegistrationData,
  postNewIbpcMember,
  postNewIbpcTeam,
  getIbpcRegistrationData,
  postNewIbccMember,
  postNewIbccTeam,
  postNewIbccIndividual,
  getIbccIndividualRegistration,
  getIbccTeamRegistration,
  postCheckTeamCode,
  postCheckReferralCode,
  postBMCRegistration,
  getBmcRegistrationData,
  postChambersRegistration,
  getChambersRegistrationData,
  postCompvisRegistration,
  getCompvisRegistrationData,
  postSummitRegistration,
  getSummitRegistrationData,
  postForgotPassword,
  postVerifyOtp,
  putResetPassword,
  postVerifyEmail,
};
