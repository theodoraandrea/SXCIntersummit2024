import React from "react";
import { Link } from "react-router-dom";

const TimelineItem = ({ title, date, type, link, registered }) => {
  return (
    <div className="mx-4 flex items-center">
      <div className="bg-primary-3 w-4 h-4 rounded-full"></div>
      <div className="ml-4 my-2">
        <h3 className="font-bold">{title}</h3>
        <p>{date}</p>
        {/*type === "register" && (
          <>
          { registered ? (
              <button className="text-sm md:text-base py-1 px-4 bg-primary-2 md:px-4 md:py-2 my-2 rounded-lg text-white mr-2 mt-2"
              disabled={true}>
              Already registered!
            </button>
          ) :
          <Link to={link}>
            <button className="text-sm md:text-base py-1 px-4 bg-primary-2 md:px-4 md:py-2 my-2 rounded-lg text-white mr-2 mt-2">
              Register Now
            </button>
          </Link>
          }
          </>
        )*/}
      </div>
    </div>
  );
};

export default TimelineItem;
