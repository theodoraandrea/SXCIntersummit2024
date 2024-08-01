import React, { useState } from "react";
import Navbar from "./../../components/navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Footer from "./../../components/footer";
import { eventDetails } from "../../constants/eventDetails";
import TimelineItem from "../../components/elements/timeline-item";

export default function DetailEvents() {
  const { eventId } = useParams();
  const [openFAQ, setOpenFAQ] = useState(Array(5).fill(false));

  const toggleFAQ = (index) => {
    const newOpenFAQ = [...openFAQ];
    newOpenFAQ[index] = !newOpenFAQ[index];
    setOpenFAQ(newOpenFAQ);
  };

  const eventData = eventDetails[eventId] || {};

  return (
    <div>
      <Navbar />
      <div className="p-8 bg-primary-1 text-white">
        {/* Competition Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {eventData.title || "Event Title"}
            </h1>
            <p className="mt-4 text-lg">
              {eventData.description || "Event Desc goes here"}
            </p>
            <Link to={eventData.registerLink}>
              <button className="bg-primary-2 px-5 rounded-lg py-2 text-white mt-4">
                Regist Now
              </button>
            </Link>
          </div>
          <div className="bg-gray-200 rounded-lg h-64"></div>
        </div>

        {/* Timeline Section */}
        <div className="mt-16 grid grid-cols-2 gap-20">
          <div className="my-auto">
            <h2 className="text-2xl font-bold">Timeline</h2>
            <p className="mt-4 text-lg">{eventData.timelineDesc}</p>
          </div>
          <div className="mt-8 space-y-4">
            {eventData.timelineData && eventData.timelineData.length > 0 ? (
              eventData.timelineData.map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  date={item.date}
                  type={item.type}
                  link={item.link}
                />
              ))
            ) : (
              <p>No timeline data available.</p>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="mt-8 space-y-4">
            {(eventData.faq || []).map((faqItem, index) => (
              <div key={index} className="bg-primary-5 text-black p-2">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left text-lg flex items-center justify-between"
                >
                  <span className="font-bold">{faqItem}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${
                      openFAQ[index] ? "rotate-180" : "rotate-90"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
                {openFAQ[index] && (
                  <div className="mt-2">
                    <p>{eventData.faqDesc[index]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Person Section */}
        <div className="mt-16 w-auto">
          <h2 className="text-2xl font-bold text-center">Contact Person(s)</h2>
          <div className="mt-8 flex">
            {eventData.contactPerson && eventData.contactPerson.length > 0 ? (
              eventData.contactPerson.map((person, index) => (
                <div key={index} className="mx-auto">
                  <p className="flex justify-center">{person}</p>
                  <p className="flex justify-center">
                    {eventData.contactNumber[index]}
                  </p>
                </div>
              ))
            ) : (
              <div className="mt-8 w-full flex justify-center items-center">
                No Contact Person Available
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
