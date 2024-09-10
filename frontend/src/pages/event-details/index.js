import React, { useState, useEffect } from "react";
import Navbar from "./../../components/navbar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Footer from "./../../components/footer";
import { eventDetails } from "../../constants/eventDetails";
import TimelineItem from "../../components/elements/timeline-item";
import { useUser } from "../../contexts/user-context";
import Spinner from "../../components/elements/spinner";
import { LANDING_PAGE } from "../../constants/routes";

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-primary-1 p-6 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Confirmation
        </h2>
        <p className="mb-6 text-center">
          You must be a high school student to join this competition. are you a high school student?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 hover:bg-yellow-600 transition duration-300 rounded-full"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-primary-3 text-white px-4 py-2 mr-2 hover:bg-yellow-600 transition duration-300 rounded-full"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DetailEvents() {
  const { eventId } = useParams();
  const params = eventId.split("_");
  const type = params[0];
  const id = Number.parseInt(params[1]);

  const navigate = useNavigate();

  const [openFAQ, setOpenFAQ] = useState(Array(5).fill(false));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, registeredEvents, registeredCompetitions, isLoggedIn } = useUser();

  const [registered, setRegistered] = useState(false);

  useEffect(()=>{
    window.scrollTo(0,0);
  }, []);

  useEffect(() => {
    if (type === "comp") {
      if (registeredCompetitions.includes(id)) {
        setRegistered(true);
        return;
      }
      setRegistered(false);
    } else if (type === "event") {
      if (id === 1) {
        //for BMC, BCC = 2, BPC = 3
        if (registeredEvents.includes(2) && registeredEvents.includes(3)) {
          setRegistered(true);
          return;
        }
      } else if (registeredEvents.includes(id)) {
        setRegistered(true);
        return;
      }
      setRegistered(false);
    }
  }, [loading]);

  const toggleFAQ = (index) => {
    const newOpenFAQ = [...openFAQ];
    newOpenFAQ[index] = !newOpenFAQ[index];
    setOpenFAQ(newOpenFAQ);
  };

  const handleRegisterClick = () => {
    if (isLoggedIn) {
      if (eventId === 'comp_1'){
        setIsModalOpen(true);
      }else{
        window.open(eventData.registerLink, "_blank");
      }
    } else {
      navigate(LANDING_PAGE);
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    window.open(eventData.registerLink, "_blank");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const eventData = eventDetails[eventId] || {};

  return (
    <div className="bg-primary-1">
      <Navbar />
      {loading ? (
          <div className="h-[80vh] bg-primary-1">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner/>
          </div>
          </div>
      ) : (
        <div className="p-4 sm:mx-16 lg:mx-32 my-8 bg-primary-1 text-white">
          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
          />
          {/* Competition Section */}
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-8">
            <div className="flex flex-col md:row-span-4">
              <h1 className="text-gradient text-center md:text-left text-4xl px-4 md:px-0 md:text-5xl font-bold">
                {eventData.title || "Event Title"}
              </h1>
              <div className="flex flex-row items-center w-full justify-center md:w-fit space-x-4 my-4">
              <button className={`text-sm w-fit rounded-lg text-white py-1 px-4
              md:mx-0 md:text-base md:px-4 md:py-2 ${
                !eventData.openRegistration ? "bg-gray-400" : "bg-primary-2"
              }`}
              onClick={handleRegisterClick}
              disabled={registered || !eventData.openRegistration}
                >
                  {registered ? "Already registered!" : "Register"}
              </button>
              {/* <button className="bg-primary-3 text-sm w-fit rounded-lg text-white 
              py-1 px-4
              md:mx-0 md:text-base md:px-4 md:py-2">
                View Booklet
              </button> */}
              <a
                href={eventData.linkBooklet ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-3 text-sm w-fit rounded-lg text-white 
                            py-1 px-4
                            md:mx-0 md:text-base md:px-4 md:py-2"
              >
                View Booklet
              </a>
              </div>
              {/*FOR PORTRAIT
               <div className="bg-gray-200 rounded-lg w-[20rem] h-[25rem] mt-4 mb-8 md:hidden mx-auto"></div>*/}
              <div className="bg-gray-200 rounded-lg mt-4 mb-8 md:hidden mx-4 md:mx-0">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={eventData.image}
                />
              </div>
              <div 
              // className="text-sm md:text-base text-justify px-4 md:px-0"
              className="text-sm md:text-base text-left leading-relaxed px-4 md:px-0 whitespace-normal"
              dangerouslySetInnerHTML={{ __html: eventData.description     
              }}/>
            </div>
            {/*FOR PORTRAIT
            <div className="bg-gray-200 rounded-lg hidden md:block md:w-[20rem] md:h-[28rem] mx-auto"></div>
            */}
            <div className="bg-gray-200 rounded-lg hidden md:block md:w-full mx-8">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={eventData.image}
              />
            </div>
            <div className="md:mx-15 text-center md:text-left">
              <h2 className="text-2xl mt-8 mb-4 text-3xl md:text-3xl xl:mx-[5rem] font-bold">Timeline</h2>
            </div>
            <div className="md:mx-15 xl:mx-[5rem]">
              {eventData.timelineData && eventData.timelineData.length > 0 ? (
                eventData.timelineData.map((item, index) => (
                  <TimelineItem
                    key={index}
                    title={item.title}
                    date={item.date}
                    type={item.type}
                    link={item.link}
                    registered={registered}
                  />
                ))
              ) : (
                <p>No timeline data available.</p>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          {/* <div className="mt-16">
            <h2 className="text-2xl font-bold">FAQ</h2>
            <div className="mt-8 space-y-4">
              {(eventData.faq || []).map((faqItem, index) => (
                eventDetails !== 'comp_2' && eventDetails !== 'comp_3' && (
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
                )
              ))}
            </div>
          </div> */}

<div className="mt-16">
  <h2 className="text-2xl font-bold">FAQ</h2>
  <div className="mt-8 space-y-4">
    {(eventData.faq && !['comp_2', 'comp_3'].includes(eventDetails)) ? (
      (eventData.faq || []).map((faqItem, index) => (
        <div key={index} className="bg-primary-5 text-black p-2">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left text-lg flex items-center justify-between"
          >
            <span className="font-bold">{faqItem}</span>
            <svg
              className={`w-6 h-6 transform transition-transform ${openFAQ[index] ? 'rotate-180' : 'rotate-90'}`}
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
      ))
    ) : (
      <p className="text-gray-500">FAQ is not available for this event.</p>
    )}
  </div>
</div>


          {/* Contact Person Section */}
          <div className="mt-16 w-auto">
            <h2 className="text-2xl font-bold text-center">
              Contact Person
            </h2>
            <div className="mt-8 flex">
              {eventData.contactPerson && eventData.contactPerson.length > 0 ? (
                eventData.contactPerson.map((person, index) => (
                  <div key={index} className="mx-auto pb-5">
                    <p className="flex justify-center">{person}</p>
                    <a href={eventData.contactLink[index] ?? '#'} className={`${
                          eventData.contactLink[index] ?
                          "hover:text-yellow-400" : "cursor-default"
                    }`}>
                    <p className="flex justify-center">
                      {eventData.contactNumber[index]}
                    </p>
                    </a>
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
      )}
      <Footer />
    </div>
  );
}
