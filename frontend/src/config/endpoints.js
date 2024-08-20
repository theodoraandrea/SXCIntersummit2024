const API_URL = "http://srv582502.hstgr.cloud";
//const API_URL = "http://localhost:3001";

// Auth or Profile related
const SIGNUP = "/auth/signup";
const LOGIN = "/auth/login";
const LOGOUT = "/auth/logout";
const POST_FORGOT_PASSWORD = "/auth/forgot-password";
const POST_VERIFY_OTP = "/auth/verify-otp";
const PUT_RESET_PASSWORD = "/auth/reset-password";
const PROFILE_DATA = "/profile";
const POST_VERIFY_EMAIL = "/auth/verify-email";

const REF_CODE = "/referral";

// GET DATA
const GET_USER_REGISTERED_EVENTS = "/events";
const GET_ALL_EVENTS = "/events/all";
const GET_TWO_EVENTS = "/events/twoEvents";
const GET_USER_REGISTERED_COMPETITIONS = "/competitions";
const GET_ALL_COMPETITIONS = "/competitions/all";
const GET_TWO_COMPETITIONS = "/competitions/twoComps";

// BMC
const BMC_REGISTRATION = "/events/BMC";
const BMC_SUMMARY = "/events/BMC/summary";
// FCEO
const POST_NEW_FCEO_MEMBER = "/fceo/member";
const POST_NEW_FCEO_TEAM = "/fceo/team";
const POST_CHECK_FCEO_TEAMCODE = "/fceo/team/check";
const FCEO_SUMMARY = "/fceo/summary";

// Concat URLs
const API_SIGNUP = `${API_URL}${SIGNUP}`;
const API_LOGIN = `${API_URL}${LOGIN}`;
const API_LOGOUT = `${API_URL}${LOGOUT}`;
const API_PROFILE_DATA = `${API_URL}${PROFILE_DATA}`;
const API_GET_USER_REGISTERED_EVENTS = `${API_URL}${GET_USER_REGISTERED_EVENTS}`;
const API_GET_ALL_EVENTS = `${API_URL}${GET_ALL_EVENTS}`;
const API_GET_TWO_EVENTS = `${API_URL}${GET_TWO_EVENTS}`;
const API_GET_USER_REGISTERED_COMPETITIONS = `${API_URL}${GET_USER_REGISTERED_COMPETITIONS}`;
const API_GET_ALL_COMPETITIONS = `${API_URL}${GET_ALL_COMPETITIONS}`;
const API_GET_TWO_COMPETITIONS = `${API_URL}${GET_TWO_COMPETITIONS}`;
const API_POST_CHECK_REF_CODE = `${API_URL}${REF_CODE}`;
const API_POST_NEW_FCEO_MEMBER = `${API_URL}${POST_NEW_FCEO_MEMBER}`;
const API_POST_NEW_FCEO_TEAM = `${API_URL}${POST_NEW_FCEO_TEAM}`;
const API_GET_FCEO_REGISTRATION = `${API_URL}${FCEO_SUMMARY}`;
const API_POST_CHECK_FCEO_TEAMCODE = `${API_URL}${POST_CHECK_FCEO_TEAMCODE}`;
const API_GET_BMC_REGISTRATION = `${API_URL}${BMC_SUMMARY}`;
const API_POST_BMC_REGISTRATION = `${API_URL}${BMC_REGISTRATION}`;
const API_POST_FORGOT_PASSWORD = `${API_URL}${POST_FORGOT_PASSWORD}`;
const API_POST_VERIFY_OTP = `${API_URL}${POST_VERIFY_OTP}`;
const API_PUT_RESET_PASSWORD = `${API_URL}${PUT_RESET_PASSWORD}`;
const API_POST_VERIFY_EMAIL = `${API_URL}${POST_VERIFY_EMAIL}`;

export {
  API_URL,
  API_SIGNUP,
  API_LOGIN,
  API_LOGOUT,
  API_PROFILE_DATA,
  API_POST_CHECK_REF_CODE,
  API_GET_ALL_EVENTS,
  API_GET_TWO_EVENTS,
  API_GET_USER_REGISTERED_EVENTS,
  API_GET_ALL_COMPETITIONS,
  API_GET_TWO_COMPETITIONS,
  API_GET_USER_REGISTERED_COMPETITIONS,
  API_POST_NEW_FCEO_MEMBER,
  API_POST_NEW_FCEO_TEAM,
  API_GET_FCEO_REGISTRATION,
  API_POST_CHECK_FCEO_TEAMCODE,
  API_POST_BMC_REGISTRATION,
  API_GET_BMC_REGISTRATION,
  API_POST_FORGOT_PASSWORD,
  API_POST_VERIFY_OTP,
  API_PUT_RESET_PASSWORD,
  API_POST_VERIFY_EMAIL,
};
