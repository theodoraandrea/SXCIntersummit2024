import { useEffect, useState } from "react";
import Navbar from "./../components/navbar";
import { useUser } from "../contexts/user-context";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  EVENTS_PAGE,
  LANDING_PAGE,
  USER_DETAILS_PAGE,
} from "../constants/routes";
import {
  fetchRegisteredEvents,
  fetchRegisteredCompetitions,
} from "../service/services";
import { getDaysUntilEvent, formatDate, getCompetitionSummaryLink, getEventSummaryLink } from "../service/helpers";
import Footer from "./../components/footer";
import Spinner from "../components/elements/spinner";

export default function UserDashboard() {
  const { profileData, isLoggedIn, loading } = useUser();
  const [ activeTab, setActiveTab] = useState("events");
  const [ userData, setUserData ] = useState(null);
  const [registeredEventsData, setRegisteredEventsData] = useState([]);
  const [registeredCompetitionsData, setRegisteredCompetitionsData] = useState(
    []
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [fetching, setFetching] = useState(true); // Add a fetching state

  useEffect(()=>{
    window.scrollTo(0,0);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchRegisteredEventsData();
      fetchRegisteredCompetitionsData();
    }
  }, [isLoggedIn]);
  
  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
        setUserData(profileData);

      } else {
        navigate(LANDING_PAGE);
      }
    }
  }, [loading, isLoggedIn, profileData, navigate]);

  useEffect(() => {
    if (location.state) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  const fetchRegisteredEventsData = async () => {
    try {
      setFetching(true);
      const response = await fetchRegisteredEvents();
      setRegisteredEventsData(response);
    } catch (error) {
      // Handle error
    } finally {
      setFetching(false);
    }
  };

  const fetchRegisteredCompetitionsData = async () => {
    try {
      setFetching(true);
      const response = await fetchRegisteredCompetitions();
      setRegisteredCompetitionsData(response);
    } catch (error) {
      // Handle error
    } finally {
      setFetching(false);
    }
  };



  if (loading) {
    return <Spinner customStyles={{ height: "50vh" }} />; // Show spinner during initial loading
  }

  return (
    <div>
      <Navbar currentPath={location.pathname} />
      {/* Profile Section */}
      <section className="bg-primary-4 flex flex-row items-center justify-around 
      px-2 py-8
      md:justify-between
      md:p-8 md:py-12 md:px-20">
        <div className="overflow-x-scroll max-w-1/2">
          <h2 className="text-lg md:text-2xl font-bold text-white ">
            {userData?.fullname}
          </h2>
          <div className="text-white text-sm md:text-base">
            <p>
              {userData?.email}
            </p>
            <p>
              {userData?.phoneNumber}
            </p>
            <p>{userData?.institution}</p>
            <p>
              {userData?.major} {userData?.batch}
            </p>
          </div>
        </div>
        <div>
          <Link to={USER_DETAILS_PAGE}>
            <button className="border-2 border-primary-3 text-primary-3 hover:bg-primary-3 hover:text-white transition duration-300 rounded-full
            text-xs px-3 py-1
            sm:text-sm sm:px-4
            md:px-6 md:py-2
            md:text-base
            
            ">
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

          {/* Show spinner while fetching data */}
          {fetching ? (
            <Spinner customStyles={{ margin: "2rem 0" }} />
          ) : (
            <>
              <p className="text-white text-center font-bold mb-8">View your registrations and check for updates here!</p>
              {activeTab === "events" && (
                <>
                  {registeredEventsData && registeredEventsData.length > 0 ? (
                    registeredEventsData.map((event) => {
                      const { message, status } = getDaysUntilEvent(
                        event.eventDate
                      );
                      return (
                        <Link to={getEventSummaryLink(event.id)}>
                        <div
                          key={event.id}
                          className="bg-white rounded-lg shadow-lg p-6 mb-4
                          transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
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
                              } text-white
                              hidden md:block
                              `}
                            >
                              {message}
                            </button>
                          </div>
                        </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-xl text-white mb-4">
                        No registered events yet.
                      </p>
                      <button
                        className="bg-primary-2 text-white px-4 py-2 rounded-full hover:bg-secondary-2 transition duration-300"
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
                  {registeredCompetitionsData &&
                  registeredCompetitionsData.length > 0 ? (
                    registeredCompetitionsData?.map((competition) => {
                      const { message, status } = getDaysUntilEvent(
                        competition.competitionDate
                      );
                      return (
                        <Link to={getCompetitionSummaryLink(competition.id)}>
                        <div
                          key={competition.id}
                          className="bg-white rounded-lg shadow-lg p-6 mb-4 
                          transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-semibold">
                                {competition.competitionName}
                              </h3>
                              <p className="text-gray-600">
                                {formatDate(competition.competitionDate)}
                              </p>
                              <p className="text-gray-600">
                                📍 {competition.competitionLocation}
                              </p>
                            </div>
                            <button
                              className={`px-4 py-2 rounded-full ${
                                status === "started"
                                  ? "bg-green-500"
                                  : "bg-primary-2"
                              } text-white
                              hidden md:block
                              `}
                            >
                              {message}
                            </button>
                          </div>
                        </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-xl text-white mb-4">
                        No registered competition yet.
                      </p>
                      <button
                        className="bg-primary-2 text-white px-4 py-2 rounded-full hover:bg-secondary-2 transition duration-300"
                        onClick={() => {
                          navigate(`${EVENTS_PAGE}?category=Competition`);
                        }}
                      >
                        Register Now!
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
