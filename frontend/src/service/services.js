import axiosInstance from "../config/axiosConfig";
import {
  API_PROFILE_DATA,
  API_GET_ALL_EVENTS,
  API_GET_EVENT_BY_ID,
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
const fetchEventsByUserId = async () => {
  try {
    const response = await axiosInstance.get(API_GET_EVENT_BY_ID);
    // console.log(response)
    return response.data.eventList;
  } catch (error) {
    console.error("Error fetching registered events:", error);
    throw error;
  }
};

export { fetchProfileData, fetchEventsByUserId, fetchAllEvents };
