const API_URL = "http://localhost:3001";

const SIGNUP = "/auth/signup";
const LOGIN = "/auth/login";
const LOGOUT = "/auth/logout";

const PROFILE_DATA = "/profile";

const GET_USER_REGISTERED_EVENTS = "/events";
const GET_ALL_EVENTS = "/events/all";
const BMC_REGISTRATION = "/events/BMC";

const GET_USER_REGISTERED_COMPETITIONS = "/competitions";
const GET_ALL_COMPETITIONS = "/competitions/all";

const POST_NEW_FCEO_MEMBER = "/fceo/member";
const POST_NEW_FCEO_TEAM = "/fceo/team";
const POST_CHECK_FCEO_TEAMCODE = "/fceo/team/check";
const GET_TEAM_DETAILS_BY_USER = "/fceo/summary";

const API_SIGNUP = `${API_URL}${SIGNUP}`;
const API_LOGIN = `${API_URL}${LOGIN}`;
const API_LOGOUT = `${API_URL}${LOGOUT}`;
const API_PROFILE_DATA = `${API_URL}${PROFILE_DATA}`;
const API_GET_USER_REGISTERED_EVENTS = `${API_URL}${GET_USER_REGISTERED_EVENTS}`;
const API_GET_ALL_EVENTS = `${API_URL}${GET_ALL_EVENTS}`;
const API_GET_USER_REGISTERED_COMPETITIONS = `${API_URL}${GET_USER_REGISTERED_COMPETITIONS}`;
const API_GET_ALL_COMPETITIONS = `${API_URL}${GET_ALL_COMPETITIONS}`;
const API_POST_NEW_FCEO_MEMBER = `${API_URL}${POST_NEW_FCEO_MEMBER}`;
const API_POST_NEW_FCEO_TEAM = `${API_URL}${POST_NEW_FCEO_TEAM}`;
const API_GET_TEAM_DETAILS_BY_USER = `${API_URL}${GET_TEAM_DETAILS_BY_USER}`;
const API_POST_CHECK_FCEO_TEAMCODE = `${API_URL}${POST_CHECK_FCEO_TEAMCODE}`;

const API_POST_BMC_REGISTRATION = `${API_URL}${BMC_REGISTRATION}`;
export {
  API_URL,
  API_SIGNUP,
  API_LOGIN,
  API_LOGOUT,
  API_PROFILE_DATA,
  API_GET_ALL_EVENTS,
  API_GET_USER_REGISTERED_EVENTS,
  API_GET_ALL_COMPETITIONS,
  API_GET_USER_REGISTERED_COMPETITIONS,
  API_POST_NEW_FCEO_MEMBER,
  API_POST_NEW_FCEO_TEAM,
  API_GET_TEAM_DETAILS_BY_USER,
  API_POST_CHECK_FCEO_TEAMCODE,
  API_POST_BMC_REGISTRATION
};
