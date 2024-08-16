import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EventCard from "./../components/elements/event-card";
import Navbar from "./../components/navbar";
import Footer from "./../components/footer";
import { fetchAllCompetitions, fetchAllEvents } from "../service/services";
import { normalizeData } from "../service/helpers";
import Spinner from "../components/elements/spinner";

const Events = () => {
  const location = useLocation();

  const [ isLoading, setIsLoading ] = useState(true);

  const [filter, setFilter] = useState("All");
  const [eventsData, setEventsData] = useState(null);
  const [competitionsData, setCompetitionsData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    if (category) {
      setFilter(category);
    }
  }, [location.search]);

  const fetchAllEventsData = async () => {
    try {
      const response = await fetchAllEvents();
      setEventsData(normalizeData(response, "event"));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCompetitionsData = async () => {
    try {
      const response = await fetchAllCompetitions();
      setCompetitionsData(normalizeData(response, "competition"));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEventsData();
    fetchAllCompetitionsData();
  }, []);

  useEffect(() => {
    if (!eventsData && !competitionsData) {
      return;
    }

    const combinedData = [...(eventsData || []), ...(competitionsData || [])];

    // Sort the combined data by date
    const sortedCombinedData = combinedData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB; // Sort by ascending order
    });

    let filteredEvents =
      filter === "All"
        ? sortedCombinedData
        : sortedCombinedData.filter((event) => event.category === filter);
    setFilteredData(filteredEvents);
  }, [eventsData, competitionsData, filter]);

  return (
    <>
      <Navbar currentPath={location.pathname} />
      <div className="p-8 md:p-8 bg-primary-1 text-white h-full">
        {
          isLoading ?
          <div className="h-[80vh]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner/>
          </div>
          </div>
           :
          <>
          <div className="flex mx-auto overflow-scroll">
            <div className="flex space-x-4 mb-4 mx-auto">
              {["All", "Workshop", "Company Visit", "Competition", "Seminar"].map(
                (category) => (
                  <div className="flex w-fit">
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-2 py-2 md:px-4 md:py-2 rounded ${
                      filter === category ? "bg-yellow-500" : "bg-teal-700"
                    }`}
                  >
                    <p className="text-xs md:text-sm">{category}</p>
                  </button>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="space-y-4 my-2 md:my-5">
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((event, index) => (
                <EventCard
                  key={index}
                  id={event.id}
                  title={event.title}
                  description={event.description}
                  category={event.category}
                />
              ))
            ) : (
              <div className="flex w-full min-h-[80vh] items-center justify-center ">
                <p className="text-3xl">No events posted yet. Stay tuned!</p>
              </div>
            )}
          </div>
          </>
        }

      </div>
      <Footer />
    </>
  );
};

export default Events;
