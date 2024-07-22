import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";
import { API_PROFILE_DATA } from "../config/endpoints";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get(API_PROFILE_DATA);
        // console.log(response);
        setProfileData(response.data);
        if (response.data.username) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoggedIn(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <UserContext.Provider value={{ profileData, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook creation
export const useUser = () => useContext(UserContext);
