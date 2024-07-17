import { useEffect, useState } from "react";
import Navbar from "./../components/navbar";
import Profile from "./../images/sponsor.png";
import { DummyProfileData } from "../constants/dummy/userdata";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("events");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch data function here
    setUserData(DummyProfileData);
  }, []);

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
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Event 01</h3>
                  <p className="text-gray-600">20 July 2024 | 19.00 WIB</p>
                  <p className="text-gray-600">📍 Jakarta Timur</p>
                </div>
                <button className="bg-primary-2 text-white px-4 py-2 rounded-full">
                  3 days to go
                </button>
              </div>
            </div>
          )}
          {activeTab === "competitions" && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Competition 01</h3>
                  <p className="text-gray-600">25 July 2024 | 10.00 WIB</p>
                  <p className="text-gray-600">📍 Jakarta Barat</p>
                </div>
                <button className="bg-primary-2 text-white px-4 py-2 rounded-full">
                  8 days to go
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
