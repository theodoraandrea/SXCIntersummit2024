import React, { useState, useEffect } from 'react';
import Navbar from "./../components/navbar";
import Footer from "./../components/footer";
import BgHero from "./../images/bg-home.png";
import Circle from "./../images/sponsor.png";
import Dummy from "./../images/bg-about.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [showArrows, setShowArrows] = useState(false);

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

  const eventCards = [
    { title: "Event Title 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc.", image: Dummy },
    { title: "Event Title 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus in dolor vel semper. Donec augue neque, fermentum sed augue a, cursus fermentum nunc.", image: Dummy },
  ];

  const handleScrollToEvent = () => {
    const element = document.getElementById('event-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
    prevArrow: showArrows ? <button className="slick-prev">Previous</button> : null,
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
      <Navbar />
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-screen flex flex-col justify-center"
        style={{ backgroundImage: `url(${BgHero})` }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mx-20">
          StudentxCEOs International Summit 2024
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mt-4 text-gradient mx-20">
          Innovate or Obsolete: Thriving in a world of technology disruption
        </h2>
        <p className="mt-5 text-lg md:text-xl max-w-full mx-20 text-white">
          Prepare yourself for a brand new era with SxC International Summit, a
          Grand Event organized by StudentsxCEOs Jakarta consisting of a
          sequence of enriching and groundbreaking events.
        </p>
        <button className="w-44 h-10 mx-20 my-5 bg-yellow-500 text-lg font-semibold rounded-md hover:bg-yellow-600 transition duration-300 text-white" onClick={handleScrollToEvent}>
          Explore Our Events
        </button>
      </section>

      {/* Events Section */}
      <section id="event-section" className="bg-primary-1 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Slider {...settings}>
            {eventCards.map((card, index) => (
              <div key={index} className="px-2">
                <div className="bg-gradient-primary p-4 rounded-xl">
                  <img className="bg-white w-full" src={card.image} alt="Event Image" />
                  <h1 className="text-xl font-bold mt-4 text-white">{card.title}</h1>
                  <p className="mt-2 text-white">{card.description}</p>
                  <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md">Read More</button>
                </div>
              </div>
            ))}
          </Slider>
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
