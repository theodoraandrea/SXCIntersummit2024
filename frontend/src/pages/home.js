import Navbar from "./../components/navbar";
import Footer from "./../components/footer";
import BgHero from "./../images/bg-home.png";
import Circle from "./../images/sponsor.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box } from "@mui/material";
import Dummy from "./../images/bg-about.png";
import Winner1 from "./../images/winner1.png";
import Winner2 from "./../images/winner2.png";
import Elips1 from "./../images/elips1.png";
import Elips2 from "./../images/elips2.png";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { fetchAllCompetitions, fetchTwoEvents } from "../service/services";
import { EVENT_DETAILS, EVENTS_PAGE } from "../constants/routes";
import { normalizeData } from "../service/helpers";

export default function Home() {
  const [eventCards, setEventCards] = useState([]);
  const [competitionCard, setCompetitionCard] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const location = useLocation();
  const partnershipRef = useRef(null);

  const partnerImages = [
    Circle,
    Circle,
    Circle,
    Circle,
    Circle,
    Circle,
    Circle,
    Circle,
    Circle,
    Circle,
    Circle,
    Circle,
    Circle,
    Circle,
    Circle,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const getEventCards = async () => {
      try {
        const data = await fetchTwoEvents();
        const eventData = normalizeData(data, "event");

        const dataCompetitions = await fetchAllCompetitions();
        const twoCompetition = dataCompetitions.slice(0, 2);
        const normalizedOneCompetition = normalizeData(
          twoCompetition,
          "competition"
        );

        const combinedData = [
          ...(eventData ? eventData : []),
          ...(normalizedOneCompetition ? normalizedOneCompetition : []),
        ];

        const sortedCombinedData = combinedData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB; // Sort by ascending order
        });

        // Update state with combined data
        setEventCards(sortedCombinedData.slice(0, 2));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    getEventCards();
  }, []);

  const handleScrollToEvent = () => {
    const element = document.getElementById("event-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setShowArrows(eventCards.length > 2);
  }, [eventCards.length]);

  const settings = {
    dots: true,
    infinite: showArrows ? true : false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: showArrows,
    prevArrow: showArrows ? (
      <button className="slick-prev">Previous</button>
    ) : null,
    nextArrow: showArrows ? <button className="slick-next">Next</button> : null,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: showArrows,
        },
      },
    ],
  };

  return (
    <div>
      <Navbar currentPath={location.pathname} />
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-screen flex flex-col justify-center"
        style={{ backgroundImage: `url(${BgHero})` }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mx-5 md:mx-20">
          StudentxCEOs International Summit 2024
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mt-4 text-gradient mx-5 md:mx-20">
          Innovate or Obsolete: Thriving in a world of technology disruption
        </h2>
        <p class="mt-5 text-md md:text-lg max-w-[72vw] mx-5 md:mx-20 text-white">
        The StudentsxCEOs (SxC) International Summit is <strong>a grand event</strong> organized by <strong>StudentsxCEOs Jakarta</strong>. 
        This year, the SxC Summit will embrace the grand theme: <strong>“Elevating Future Leaders: Transcending User-Centricity To Strategic Innovation In The Digital Economy”</strong>. 
        </p>
        <p class="mt-5 text-md md:text-lg max-w-[72vw] mx-5 md:mx-20 text-white">
        This summit will take you on an <strong>unforgettable upskilling journey </strong> with a series of <strong>events </strong> 
        consisting of <strong>Business Master Class, Chambers, Company Visit, and Summit Talkshow</strong>, 
        as well as <strong>challenging competitions</strong>, namely,
        <strong> Future CEO, Business Case Competition, and Business Plan Competition</strong>.
        </p>
        <p class="mt-5 text-md md:text-lg max-w-full mx-5 md:mx-20 text-white">
            We dare you to <strong className="text-gradient text-lg md:text-xl">#Lead the Change, Shape the Future</strong> with us now!
        </p>
        <button
          className="w-60 h-10 mx-5 md:mx-20 my-5 bg-yellow-500 text-lg font-semibold rounded-md hover:bg-yellow-600 transition duration-300 text-white"
          onClick={handleScrollToEvent}
        >
          Explore Our Programs
        </button>
      </section>

      {/* Events Section */}
      <section id="event-section" className="bg-primary-1 py-10">
        {/*<div className="max-w-7xl justify-between mx-auto px-4">*/}
        <div className="grid sm:grid-cols-2 gap-4 mx-4 md:mx-8">
          {eventCards.map((card, index) => (
            <>
              <div key={index} className="px-2 my-8 md:mt-5">
                <div className="text-3xl my-4 text-white font-bold">
                  Upcoming {card.type}
                </div>
                <div className="bg-gradient-primary rounded-xl h-full">
                  <div className="h-60 flex mb-4 bg-white rounded-b-none rounded-t-lg">
                    <img
                      className="w-full h-full object-cover rounded-b-none rounded-t-xl"
                      src={card.image}
                      alt="Event"
                    />
                  </div>
                  <div className="p-4 pb-8 md:p-8">
                    <h1 className="text-xl font-bold mt-4 text-white">
                      {card.title}
                    </h1>
                    <p className="mt-2 text-white">{card.description}</p>
                    <Link to={`${EVENT_DETAILS}/${card.id}`}>
                      <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300">
                        View Event
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="mt-32">
          <Link to={EVENTS_PAGE} className="flex justify-center items-center">
            <h1 className="text-xl text-white mr-2">View all programs</h1>
            <Box
              component="div"
              sx={{
                color: "white",
                display: "inline-block",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateX(5px)", // Moves the icon 5px to the right on hover
                },
              }}
            >
              <ArrowForwardIcon fontSize="large" />
            </Box>
          </Link>
        </div>
      </section>

      {/* Winner Section */}
      <section className="bg-primary-1 py-20">
        <div className="">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">
            Winner of 2023
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-center text-center relative">
              <img
                src={Elips1}
                alt="Ellipse 1"
                className="absolute top-0 left-0  -mt-10"
              />
              <img src={Winner2} alt="Winner 1" className="relative" />
              <h3 className=" text-xl font-bold text-white bg-primary-3 px-4 rounded-2xl z-10">
                Name of the Winner
              </h3>
              <p className="mt-2 text-white px-4 text-left mx-5 md:mx-10 z-10 pb-10 md:pb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                cursus in dolor vel semper. Donec augue neque, fermentum sed
                augue a, cursus fermentum nunc. Ut sollicitudin vel arcu eu
                vulputate. Phasellus ultrices non metus et interdum. Aliquam
                eleifend odio sed eleifend porttitor.
              </p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <img
                src={Elips2}
                alt="Ellipse 2"
                className="absolute top-0 right-0 -mt-10 "
              />
              <img src={Winner1} alt="Winner 2" className="relative" />
              <h3 className="text-xl font-bold text-white bg-primary-3 px-4 rounded-2xl z-10">
                Name of the Winner
              </h3>
              <p className="mt-2 text-white px-4 text-right mx-5 md:mx-10 z-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                cursus in dolor vel semper. Donec augue neque, fermentum sed
                augue a, cursus fermentum nunc. Ut sollicitudin vel arcu eu
                vulputate. Phasellus ultrices non metus et interdum. Aliquam
                eleifend odio sed eleifend porttitor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="sponsorship" className="bg-primary-1 py-20" hidden={true}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Company Partners
            </h2>
            <div className="flex justify-center space-x-4">
              {partnerImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Company Partner ${index + 1}`}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                />
              ))}
            </div>
          </div>
          <hr className="my-10 border-t border-primary-3" />
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Sponsors
            </h2>
            <div className="flex justify-center space-x-4">
              {partnerImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Company Partner ${index + 1}`}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                />
              ))}
            </div>
          </div>
          <hr className="my-10 border-t border-primary-3" />
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Media Partners
            </h2>
            <div className="flex justify-center space-x-4">
              {partnerImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Company Partner ${index + 1}`}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
