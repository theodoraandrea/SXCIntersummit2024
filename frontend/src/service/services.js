import axiosInstance from "../config/axiosConfig";
import {
  API_PROFILE_DATA,
  API_GET_ALL_EVENTS,
  API_GET_USER_REGISTERED_EVENTS,
  API_GET_USER_REGISTERED_COMPETITIONS,
  API_GET_ALL_COMPETITIONS,
} from "../config/endpoints";

// Get Profile Datas
const fetchProfileData = async () => {
  try {
    const response = await axiosInstance.get(API_PROFILE_DATA);
    return response.data;
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

const fetchAllCompetitions = async () => {
  try {
    const response = await axiosInstance.get(API_GET_ALL_COMPETITIONS);
    // console.log(response);
    return response.data.competitions;
  } catch (error) {
    console.error("Error fetching competition(s):", error);
    throw error;
  }
};

export {
  fetchProfileData,
  putProfileData,
  fetchRegisteredEvents,
  fetchAllEvents,
  fetchAllCompetitions,
  fetchRegisteredCompetitions,
};
