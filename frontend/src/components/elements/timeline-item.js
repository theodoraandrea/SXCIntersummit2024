import React from "react";
import { Link } from "react-router-dom";

const TimelineItem = ({ title, date, type, link }) => {
  return (
    <div className="flex items-center">
      <div className="bg-primary-3 w-4 h-4 rounded-full"></div>
      <div className="ml-4">
        <h3 className="font-bold">{title}</h3>
        <p>{date}</p>
        {type === "register" && (
          <>
            <Link to={link}>
              <button className="bg-primary-2 px-4 py-2 rounded-lg text-white mt-2">
                Register Now
              </button>
            </Link>
            <button className="bg-primary-3 px-4 py-2 rounded-lg text-white mt-2 ml-2">
              View Booklet
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
