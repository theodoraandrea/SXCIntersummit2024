import axiosInstance from "../config/axiosConfig";
import {
  API_PROFILE_DATA,
  API_GET_ALL_EVENTS,
  API_GET_USER_REGISTERED_EVENTS,
  API_GET_USER_REGISTERED_COMPETITIONS,
  API_LOGIN,
} from "../config/endpoints";


//Login
const login = async (data) => {
  try {
    const response = await axiosInstance.post(API_LOGIN, data);
    const token = response.data.token;
    const userId = response.data.user.id;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    return response.data;
  } catch (error) {
    console.error("Error logging in: ", error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Incorrrect email or password');
    } else {
      throw new Error('Network error');
    }
  }
}

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
    // console.log(response)
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
    // console.log(response);
    return response.data.events;
  } catch (error) {
    console.error("Error fetching registered event(s):", error);
    throw error;
  }
};

// Get competitions registered by user
const fetchRegisteredCompetitions = async () => {
  try {
    const response = await axiosInstance.get(
      API_GET_USER_REGISTERED_COMPETITIONS
    );
    // console.log(response);
    return response.data.competitions;
  } catch (error) {
    console.error("Error fetching registered competition(s):", error);
    throw error;
  }
};

export {
  login,
  fetchProfileData,
  putProfileData,
  fetchRegisteredEvents,
  fetchAllEvents,
};
