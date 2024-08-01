import Navbar from "./../components/navbar";
import Footer from "./../components/footer";
import BgHero from "./../images/bg-home.png";
import Timeline1 from "./../images/home1.png";
import Timeline2 from "./../images/home2.png";
import Timeline3 from "./../images/home3.png";
import Timeline4 from "./../images/home4.png";
import Timeline5 from "./../images/home5.png";
import Timeline6 from "./../images/home6.png";
import Circle from "./../images/sponsor.png";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Home() {

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

  return (
    <div>
      <Navbar 
        currentPath={location.pathname}
      />
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
        <button className="w-44 h-10 mx-20 my-5 bg-yellow-500 text-lg font-semibold rounded-md hover:bg-yellow-600 transition duration-300 text-white">
          Explore Our Events
        </button>
      </section>

      {/* Timeline Section */}
      <section className="bg-primary-1 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
          Events Timeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-6 mx-10">
          <div className="relative">
            <img
              src={Timeline1}
              alt="July"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-20 text-white font-semibold">
              July
            </div>
          </div>
          <div className="relative">
            <img
              src={Timeline2}
              alt="August"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-20 text-white font-semibold">
              August
            </div>
          </div>
          <div className="relative">
            <img
              src={Timeline3}
              alt="September"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-20 text-white font-semibold">
              September
            </div>
          </div>
          <div className="relative">
            <img
              src={Timeline4}
              alt="October"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-20 text-white font-semibold">
              October
            </div>
          </div>
          <div className="relative">
            <img
              src={Timeline5}
              alt="November"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-20 text-white font-semibold">
              November
            </div>
          </div>
          <div className="relative">
            <img
              src={Timeline6}
              alt="December"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-20 text-white font-semibold">
              December
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
      <Footer/>
    </div>
  );
}