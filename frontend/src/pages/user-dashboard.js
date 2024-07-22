import { useEffect, useState } from "react";
import Navbar from "./../components/navbar";
import { DummyProfileData } from "../constants/dummy/userdata";
import { DummyEventsData } from "../constants/dummy/eventsdata";
import { DummyCompetitionsData } from "../constants/dummy/competitions";
import { useUser } from "../contexts/user-context";
import { useNavigate } from "react-router-dom";
import { REGISTER } from "../constants/routes";
import { fetchEventsByUserId } from "../service/services";
import { getDaysUntilEvent, formatDate } from "../service/helpers";

export default function UserDashboard() {
  const { profileData, isLoggedIn, loading } = useUser();
  const [activeTab, setActiveTab] = useState("events");
  const [userData, setUserData] = useState(null);
  const [registeredEventsData, setRegisteredEventsData] = useState(null);
  const [competitionsData, setCompetitionsData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
        setUserData(profileData);
        // fetchRegisteredEventsData();
        setRegisteredEventsData(DummyEventsData);
        setCompetitionsData(DummyCompetitionsData);
      } else {
        navigate(REGISTER);
      }
    }
  }, [loading, isLoggedIn, profileData]);

  const fetchRegisteredEventsData = async () => {
    try {
      const response = await fetchEventsByUserId();
      // console.log(response);
      setRegisteredEventsData(response);
    } catch (error) {
      // bisa taro function buat display error message dsini (maybe alert, etc)
    }
  };

  return (
    <div>
      <Navbar />

      {/* Profile Section */}
      <section className="bg-primary-4 grid grid-cols-[auto,1fr] py-12">
        <div className="flex items-center justify-center ml-36 w-28 h-28">
          <img
            src={userData?.picture}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full mb-4"
          />
        </div>
        <div className="ml-5 mt-5">
          <h2 className="text-2xl font-bold text-white ">
            {userData?.username}
          </h2>
          <p className="text-white">{userData?.email}</p>
        </div>
      </section>

      {/* Events and Competitions Section */}
      <section className="bg-primary-1 py-8 h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-center space-x-6 mb-8">
            <button
              className={`text-lg font-semibold ${
                activeTab === "events"
                  ? "text-yellow-500 border-b-4 border-yellow-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("events")}
            >
              Events
            </button>
            <button
              className={`text-lg font-semibold ${
                activeTab === "competitions"
                  ? "text-yellow-500 border-b-4 border-yellow-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("competitions")}
            >
              Competitions
            </button>
          </div>
          {activeTab === "events" && (
            <>
              {registeredEventsData?.map((event) => {
                const { message, status } = getDaysUntilEvent(event.date);
                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-lg p-6 mb-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {event.eventName}
                        </h3>
                        <p className="text-gray-600">
                          {formatDate(event.date)}
                        </p>
                        <p className="text-gray-600">📍 {event.location}</p>
                      </div>
                      <button
                        className={`px-4 py-2 rounded-full ${
                          status === "started" ? "bg-green-500" : "bg-primary-2"
                        } text-white`}
                      >
                        {message}
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {activeTab === "competitions" && (
            <>
              {competitionsData?.map((competition) => {
                const { message, status } = getDaysUntilEvent(competition.date);
                return (
                  <div
                    key={competition.id}
                    className="bg-white rounded-lg shadow-lg p-6 mb-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {competition.competitionName}
                        </h3>
                        <p className="text-gray-600">
                          {formatDate(competition.date)}
                        </p>
                        <p className="text-gray-600">
                          📍 {competition.location}
                        </p>
                      </div>
                      <button
                        className={`px-4 py-2 rounded-full ${
                          status === "started" ? "bg-green-500" : "bg-primary-2"
                        } text-white`}
                      >
                        {message}
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
