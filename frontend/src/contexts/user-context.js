import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchProfileData } from "../service/services";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchProfileData();
      setProfileData(response);
      if (response.username) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ profileData, isLoggedIn, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook creation
export const useUser = () => useContext(UserContext);
