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
      const eventsWithImage = getProgramImageLink(response, "event");
      const events = normalizeData(eventsWithImage, "event");
      setEventsData(events);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCompetitionsData = async () => {
    try {
      const response = await fetchAllCompetitions();
      const compsWithImage = getProgramImageLink(response, "competition");
      const comps = normalizeData(compsWithImage, "competition");
      setCompetitionsData(comps);
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
      const opRegA = a.openRegistration;
      const opRegB = b.openRegistration;
      if (opRegA === opRegB) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB; // Sort by ascending order
      } else {
        return opRegB - opRegA; //Put programs that are open for registration at the top

      }


    });

    let filteredEvents =
      filter === "All"
        ? sortedCombinedData
        : sortedCombinedData.filter((event) => event.category === filter);
    setFilteredData(filteredEvents);
  }, [eventsData, competitionsData, filter]);

  const getProgramImageLink = (programs, type) => {
    const location = "/images/programs";
    const bmc = location + "/bmc.png";
    const comvis = location + "/comvis.png";
    const summit = location + "/summit.png";
    const chambers = location + "/chambers.png";
    const ibc_bcc = location + "/ibc-bcc.png";
    const ibc_bpc = location + "/ibc-bpc.png";
    const fceo = location + "/fceo.png";

    for (let item of programs) {
      if (type === "event") {
        switch (item.id) {
          case 1:
            item.image = bmc;
            break;
          case 5:
            item.image = chambers;
            break;
          case 6:
            item.image = comvis;
            break;
          case 7:
            item.image = summit;
            break;
          default:
            break;
        }
      } else if (type === "competition") {
        switch (item.id) {
          case 1:
            item.image = fceo;
            break;
          case 2:
            item.image = ibc_bcc;
            break;
          case 3:
            item.image = ibc_bpc;
            break;
          default:
            break;
        }
      }
    }
    return programs;
  }

  return (
    <>
      <Navbar currentPath={location.pathname} />
      <div className="p-8 md:p-8 bg-primary-1 text-white h-full min-h-[80vh]">
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
              {["All", "Competition", "Workshop", "Company Visit", "Seminar"].map(
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
                  image={event.image}
                  title={event.title}
                  showDetail={event.showDetail}
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
