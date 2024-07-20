const API_URL = "http://localhost:3001";

const GOOGLE_LOGIN = "/auth/google";
const LOGOUT = "/auth/logout";

const PROFILE_DATA = "/profile";

const API_GOOGLE_LOGIN = `${API_URL}${GOOGLE_LOGIN}`;
const API_LOGOUT = `${API_URL}${LOGOUT}`;
const API_PROFILE_DATA = `${API_URL}${PROFILE_DATA}`;

export { API_URL, API_GOOGLE_LOGIN, API_LOGOUT, API_PROFILE_DATA };
