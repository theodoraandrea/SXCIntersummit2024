import Navbar from "./../components/navbar";
import Footer from "./../components/footer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchTwoLatestEvents, fetchTwoLatestCompetitions } from "../service/services";
import { EVENT_DETAILS, EVENTS_PAGE } from "../constants/routes";

const bgHero = "/images/bg-home.png";
const circle = "/images/sponsor.png";
const winner1 = "/images/winner1.png";
const winner2 = "/images/winner2.png";
const elips1 = "/images/elips1.png";
const elips2 = "/images/elips2.png";

export default function Home() {
  const [eventCards, setEventCards] = useState([]);
  const [competitionCards, setCompetitionCards] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const location = useLocation();
  const partnershipRef = useRef(null);

  const partnerImages = [
    circle,
    circle,
    circle
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    getCompetitionCards();
    getEventCards();
  }, []);

  const getEventCards = async () => {
    try {
      const data = await fetchTwoLatestEvents();
      const eventsWithDate = getProgramDateStatus(data, "event");
      const events = getProgramImageLink(eventsWithDate, "event");
      setEventCards(events);
    } catch (error) {
      throw error;
    }
  }

  const getCompetitionCards = async () => {
    try {
      const data = await fetchTwoLatestCompetitions();
      const compsWithDate = getProgramDateStatus(data, "competition");
      const competitions = getProgramImageLink(compsWithDate, "competition");
      console.log("COMPS", competitions);
      setCompetitionCards(competitions);
    } catch (error) {
      throw error;
    }
  }

  const getProgramImageLink = (programs, type) => {
    const location = "images/programs";
    const bmc = location + "/bmc.png";
    const comvis = location + "/comvis.png";
    const summit = location + "/summit.png";
    const chambers = location + "/chambers.png";
    const ibc_bcc = location + "/ibc-bcc.png";
    const ibc_bpc = location + "/ibc-bpc.png";
    const fceo = location + "/fceo.png";

    for (let item of programs) {
      console.log(item);
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
    console.log(programs);
    return programs;
  }

  const getProgramDateStatus = (programs, type) => {
    const today = new Date();
    const programsWithStatus = [];
    for (let program of programs) {
      console.log(program);
      let programDate;
      if (type === "event") {
        programDate = new Date(program.eventDate);
      } else if (type === "competition") {
        programDate = new Date(program.competitionDate);
      }
      if (today > programDate) {
        program = {
          ...program,
          status: "Passed"
        }
       console.log("passed");
      } else {
        program = {
          ...program,
          status: "Upcoming"
        }
      }
      programsWithStatus.push(program);
    }
    return programsWithStatus;
  }

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
    <div className="overflow-hidden">
      <Navbar currentPath={location.pathname} />
      {/* Hero Section */}
      <section
        className="bg-cover bg-center xl:h-screen flex flex-col justify-center py-10"
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-10 mx-10 md:mx-20">
          StudentxCEOs International Summit 2024
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mt-4 text-gradient mx-10 md:mx-20">
          Innovate or Obsolete: Thriving in a world of technology disruption
        </h2>
        <p class="mt-5 text-md md:text-lg max-w-[72vw] mx-10 md:mx-20 text-white">
        The StudentsxCEOs (SxC) International Summit is <strong>a grand event</strong> organized by <strong>StudentsxCEOs Jakarta</strong>. 
        This year, the SxC Summit will embrace the grand theme: <strong>“Elevating Future Leaders: Transcending User-Centricity To Strategic Innovation In The Digital Economy”</strong>. 
        </p>
        <p class="mt-5 text-md md:text-lg max-w-[72vw] mx-10 md:mx-20 text-white">
        This summit will take you on an <strong>unforgettable upskilling journey </strong> with a series of <strong>events </strong> 
        consisting of <strong>Business Master Class, Chambers, Company Visit, and Summit Talkshow</strong>, 
        as well as <strong>challenging competitions</strong>, namely,
        <strong> Future CEO, Business Case Competition, and Business Plan Competition</strong>.
        </p>
        <p class="mt-5 text-md md:text-lg max-w-full mx-10 md:mx-20 text-white">
            We dare you to <strong className="text-gradient text-lg md:text-xl">#Lead the Change, Shape the Future</strong> with us now!
        </p>
        <button
          className="w-60 h-10 mx-10 md:mx-20 my-5 bg-yellow-500 text-lg font-semibold rounded-md hover:bg-yellow-600 transition duration-300 text-white"
          onClick={handleScrollToEvent}
        >
          Explore Our Programs
        </button>
      </section>

      {/* Programs Section */}
      <section id="event-section" className="bg-primary-1 p-10 md:px-0">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 gap-y-8 md:gap-8 md:mx-16 xl:mx-4 xl:gap-x-2">
          <h1 className="text-4xl font-semibold text-center text-gradient xl:col-span-2">Competitions</h1>
          <h1 className="text-4xl font-semibold text-center text-gradient hidden md:block xl:col-span-2">Events</h1>
          {/*COMPETITIONS*/}
          {competitionCards.map((card, index) => (
            <>
              <div key={index} className="px-2 md:mt-5">
                <div className="bg-primary-4 rounded-xl 
                w-[75vw] h-full
                md:w-full 
                pt-4 mx-auto
                transform hover:scale-105 transition duration-300 ease-in-out
                ">
                  {
                    card.openRegistration && (
                    <h1 className="mx-4 mb-4 px-2 py-0.5 h-fit w-fit text-xs font-semibold text-white rounded-md bg-gradient-secondary">
                      Open registration  
                    </h1>
                    )
                  }
                  {
                    !card.openRegistration && (
                    <h1 className={`mx-4 mb-4 px-2 py-0.5 h-fit w-fit text-xs font-semibold text-white rounded-md 
                    ${
                      card.status === "Upcoming" ?
                      "bg-gradient-primary-2" :
                      "bg-gradient-gray"
                    }
                    `}>
                     {card.status}
                    </h1>
                    )
                  }

                  <Link to={`${EVENT_DETAILS}/comp_${card.id}`}>
                  <div className="rounded-lg mx-4">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={card.image}
                      alt="Comps"
                    />
                  </div>
                  </Link>
                  <div className="p-5">
                    <div className="flex flex-row justify-between">
                    <Link to={`${EVENT_DETAILS}/comp_${card.id}`}>
                    <h1 className="text-2xl md:text-md xl:text-sm font-bold text-white hover:text-gradient transition duration-400">
                      {card.competitionName}
                    </h1>
                    </Link>
                    </div>
                    <p className="mt-2 text-sm text-justify text-white h-full">{card.shortDesc}</p>
                  </div>
                </div>
              </div>
            </>
          ))}
          {/*EVENTS*/}
          <h1 className="text-4xl font-semibold text-center text-gradient block md:hidden xl:col-span-2">Events</h1>
          {eventCards.map((card, index) => (
            <>
              <div key={index} className="px-2 md:mt-5">
                <div className="bg-primary-4 rounded-xl 
                w-[75vw] h-full
                md:w-full 
                pt-4 mx-auto
                transform hover:scale-105 transition duration-300 ease-in-out
                ">
                  {
                    card.openRegistration && (
                    <h1 className="mx-4 mb-4 px-2 py-0.5 h-fit w-fit text-xs font-semibold text-white rounded-md bg-gradient-secondary">
                      Open registration  
                    </h1>
                    )
                  }
                  {
                    !card.openRegistration && (
                    <h1 className={`mx-4 mb-4 px-2 py-0.5 h-fit w-fit text-xs font-semibold text-white rounded-md 
                    ${
                      card.status === "Upcoming" ?
                      "bg-gradient-primary-2" :
                      "bg-gradient-gray"
                    }
                    `}>
                     {card.status}
                    </h1>
                    )
                  }

                  <Link to={`${EVENT_DETAILS}/event_${card.id}`}>
                  <div className="rounded-lg mx-4">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={card.image}
                      alt="Event"
                    />
                  </div>
                  </Link>
                  <div className="p-5">
                    <div className="flex flex-row justify-between">
                    <Link to={`${EVENT_DETAILS}/event_${card.id}`}>
                    <h1 className="text-2xl md:text-md xl:text-sm font-bold text-white hover:text-gradient transition duration-400">
                      {card.eventName}
                    </h1>
                    </Link>
                    </div>
                    <p className="mt-2 text-sm text-justify text-white h-full">{card.shortDesc}</p>
                  </div>
                </div>
              </div>
            </>
          ))}


        </div>
        <div className="mt-16">
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
      <section className="bg-primary-1 py-20 hidden">
        <div className="">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">
            Winner of 2023
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-center text-center relative">
              <img
                src={elips1}
                alt="Ellipse 1"
                className="absolute top-0 left-0  -mt-10"
              />
              <img src={winner2} alt="Winner 1" className="relative" />
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
                src={elips2}
                alt="Ellipse 2"
                className="absolute top-0 right-0 -mt-10 "
              />
              <img src={winner1} alt="Winner 2" className="relative" />
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
      <section id="sponsorship" className="bg-primary-1 py-20">
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
