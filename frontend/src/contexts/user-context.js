import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchProfileData, fetchRegisteredEvents, fetchRegisteredCompetitions } from "../service/services";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [registeredCompetitions, setRegisteredCompetitions] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const data = {
      userId: userId,
      token: token
    }

    fetchData(data);
  }, []);
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (userId && token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  
  const fetchData = async (data) => {
    try {
      const response = await fetchProfileData(data);
      setProfileData(response);

      const compsRes = await getUserCompetitions();
      let comps = [];
      for (let i=0; i < compsRes.length; i++) {
        const item = compsRes[i];
        comps.push(item.id);
      }
      setRegisteredCompetitions(comps);

      const eventsRes = await getUserEvents();
      let events = [];
      for (let i=0; i < eventsRes.length; i++) {
        const item = eventsRes[i];
        if (item.id === 1) {
          events.push(item.EventRegistrations[0].bmcType);
        }
        events.push(item.id);
      }
      setRegisteredEvents(events);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }; 

  const removeUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setProfileData(null);
  };

  const loginUser = (data) => {
    setIsLoggedIn(true);
    setProfileData(data);
  };

  //fetch registered Competitions 
  const getUserEvents = async () => {
    try {
      const response = await fetchRegisteredEvents();
      return response;
    } catch (error) {
      throw error;
    }
  }

  const getUserCompetitions = async () => {
    try {
      const response = await fetchRegisteredCompetitions();
      return response;
    } catch (error) {
      throw error;
    }
  }

  return (
    <UserContext.Provider value={{ profileData, 
    registeredEvents, 
    registeredCompetitions, 
    isLoggedIn, 
    loading, 
    setProfileData, 
    setRegisteredEvents,
    setRegisteredCompetitions,
    removeUser, 
    loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook creation
export const useUser = () => useContext(UserContext);
