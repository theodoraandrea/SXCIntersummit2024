import { useEffect, useState } from "react"; 
import Navbar from "./../components/navbar";
import { DummyCompetitionsData } from "../constants/dummy/competitions";
import { useUser } from "../contexts/user-context";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { EVENTS_PAGE, LANDING_PAGE, USER_DETAILS_PAGE } from "../constants/routes";
import { fetchRegisteredEvents } from "../service/services";
import { getDaysUntilEvent, formatDate } from "../service/helpers";
import profile from "./../images/person.png";
import Footer from "./../components/footer";


export default function UserDashboard() {
  const { profileData, isLoggedIn, loading } = useUser();
  const [ activeTab, setActiveTab] = useState("events");
  const [ userData, setUserData ] = useState(null);
  const [registeredEventsData, setRegisteredEventsData] = useState([]);
  const [competitionsData, setCompetitionsData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      console.log(profileData);
      if (isLoggedIn) {
        setUserData(profileData);
        fetchRegisteredEventsData();

        // Dummy Datas
        // setUserData(DummyProfileData);
        //setRegisteredEventsData(DummyEventsData);
        setCompetitionsData(DummyCompetitionsData);
      } else {
        navigate(LANDING_PAGE);
      }
    }
  }, [loading, isLoggedIn, profileData]);

  const fetchRegisteredEventsData = async () => {
    try {
      console.log("in fetchRegisteredEventsData...");
      const response = await fetchRegisteredEvents();
      setRegisteredEventsData(response);
    } catch (error) {
      // bisa taro function buat display error message dsini (maybe alert, etc)
    }
  };

  return (
    <div>
      <Navbar 
        currentPath={location.pathname}
      />
      {/* Profile Section */}
      <section className="bg-primary-4 flex items-center py-12 px-20">
        <div className="flex items-center justify-center w-28 h-28">
          <img
            src={userData?.picture ?? profile}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <div className="ml-5">
          <h2 className="text-2xl font-bold text-white ">
            {userData?.fullname}
          </h2>
          <p className="text-white">{userData?.email} | {userData?.phoneNumber} </p>
          <p className="text-white">{userData?.institution}</p>
          <p className="text-white">{userData?.major} {userData?.batch}</p>
        </div>
        <div className="ml-auto">
        <Link to={USER_DETAILS_PAGE}>
          <button className="bg-primary-2 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </Link>
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
              {registeredEventsData && registeredEventsData.length > 0 ? (
                registeredEventsData.map((event) => {
                  const { message, status } = getDaysUntilEvent(
                    event.eventDate
                  );
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
                            {formatDate(event.eventDate)}
                          </p>
                          <p className="text-gray-600">
                            📍 {event.eventLocation}
                          </p>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-full ${
                            status === "started"
                              ? "bg-green-500"
                              : "bg-primary-2"
                          } text-white`}
                        >
                          {message}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-xl text-white mb-4">
                    No registered events yet.
                  </p>
                  <button
                    className="bg-primary-2 text-white px-4 py-2 rounded-full"
                    onClick={() => {
                      navigate(EVENTS_PAGE);
                    }}
                  >
                    Register Now!
                  </button>
                </div>
              )}
            </>
          )}
          {activeTab === "competitions" && (
            <>
              {competitionsData && competitionsData.length > 0 ? (
                competitionsData?.map((competition) => {
                  const { message, status } = getDaysUntilEvent(
                    competition.date
                  );
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
                            status === "started"
                              ? "bg-green-500"
                              : "bg-primary-2"
                          } text-white`}
                        >
                          {message}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-xl text-white mb-4">
                    No registered competition yet.
                  </p>
                  <button
                    className="bg-primary-2 text-white px-4 py-2 rounded-full"
                    onClick={() => {
                      // navigate(COMPETITION_PAGE);
                    }}
                  >
                    Register Now!
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer/>
    </div>
  );
}
