import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchProfileData } from "../service/services";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const data = {
      userId: userId,
      token: token
    }
    console.log("fetching data...");
    fetchData(data);
  }, []);
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (userId && token) {
      console.log("has id and token");
      setIsLoggedIn(true);
    } else {
      console.log("no id or token");
    }
  });

  const fetchData = async (data) => {
    try {
      const response = await fetchProfileData(data);
      setProfileData(response);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = () => {
    console.log("removeUser");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setProfileData(null);
  }

  const loginUser = () => {
    console.log("loginUser");
    setIsLoggedIn(true);
  }

  return (
    <UserContext.Provider value={{ profileData, isLoggedIn, loading, removeUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook creation
export const useUser = () => useContext(UserContext);
