import React from "react";
import { Link } from "react-router-dom";
import { EVENT_DETAILS } from "../../constants/routes";

const EventCard = ({ title, description, category, image, showDetail, id }) => {
  const eventDetailLink = `${EVENT_DETAILS}/${id}`;

  return (
    <div className="bg-primary-5 w-full max-w-md md:max-w-4xl h-auto rounded-xl mx-auto mb-4">
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 w-full md:w-64 flex-grow">
          <div className="h-full flex">
            <img
              src={image}
              alt={image}
              className="w-full h-full object-cover rounded-t-xl md:rounded-lg md:rounded-r-none md:rounded-l-xl"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="p-4 text-black flex flex-col justify-between">
          <h1 className="text-xl md:text-2xl font-extrabold mb-2">{title}</h1>
          <p className="text-sm md:text-base mb-4">{description}</p>
          {
            showDetail && 
            <Link to={eventDetailLink}>
            <button className="bg-primary-3 px-4 py-2 rounded-lg text-white text-sm md:text-base hover:bg-primary-2">
              View Program
            </button>
            </Link>
          }
          {
            !showDetail && 
            <button className="w-fit bg-primary-2 px-4 py-2 rounded-lg text-white text-sm md:text-base">
              Coming Soon!
          </button>
          }

        </div>
      </div>
    </div>
  );
};

export default EventCard;
