const API_URL = "http://localhost:3001";

const GOOGLE_LOGIN = "/auth/google";
const LOGOUT = "/auth/logout";

const PROFILE_DATA = "/profile";

const GET_EVENT_BY_ID = "/events";
const GET_ALL_EVENTS = "/events/all";

const API_GOOGLE_LOGIN = `${API_URL}${GOOGLE_LOGIN}`;
const API_LOGOUT = `${API_URL}${LOGOUT}`;
const API_PROFILE_DATA = `${API_URL}${PROFILE_DATA}`;
const API_GET_EVENT_BY_ID = `${API_URL}${GET_EVENT_BY_ID}`;
const API_GET_ALL_EVENTS = `${API_URL}${GET_ALL_EVENTS}`;

export {
  API_URL,
  API_GOOGLE_LOGIN,
  API_LOGOUT,
  API_PROFILE_DATA,
  API_GET_ALL_EVENTS,
  API_GET_EVENT_BY_ID,
};
