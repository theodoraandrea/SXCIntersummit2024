import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EventCard from "./../components/elements/event-card";
import Navbar from "./../components/navbar";
import Footer from "./../components/footer";
import { DummyEventsData as events } from "../constants/dummy/eventsdata";
import { fetchAllEvents } from "../service/services";

const Events = () => {
  const location = useLocation();
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    if (category) {
      setFilter(category);
    }
  }, [location.search]);

  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((event) => event.category === filter);

  return (
    <>
      <Navbar />
      <div className="p-8 bg-primary-1 text-white min-h-screen">
        <div className="flex mx-auto">
          <div className="flex space-x-4 mb-4 mx-auto">
            {["All", "Workshop", "Company Visit", "Competitions"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded ${
                    filter === category ? "bg-yellow-500" : "bg-teal-700"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>
        <div className="space-y-4 my-5">
          {filteredData && filteredData.length > 0
            ? filteredData.map((event, index) => (
                <EventCard
                  key={index}
                  title={event.eventName}
                  description={event.shortDesc}
                  category={event.category}
                />
              ))
            : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Events;
