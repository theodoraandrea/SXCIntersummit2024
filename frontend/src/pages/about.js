import Navbar from "./../components/navbar";
import AboutCard from "../components/elements/about-card";
import Footer from "./../components/footer";
import { useLocation } from "react-router-dom";

const bgHero = "/images/bg-about.png";
const logo = "/images/sxc-jakarta.png";

export default function About() {

  const location = useLocation();
  
  return (
    <div>
      <Navbar 
        currentPath={location.pathname}
      />
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-500 flex flex-col justify-center"
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mx-4 sm:mx-8 md:mx-20">
          StudentxCEOs International Summit 2024
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold mt-2 sm:mt-4 md:mt-6 text-gradient mx-4 sm:mx-8 md:mx-20">
          Innovate or Obsolete: Thriving in a world of technology disruption
        </h2>
        <p className="text-base sm:text-lg md:text-xl mt-3 sm:mt-5 md:mt-6 max-w-full mx-4 sm:mx-8 md:mx-20 text-white">
          Prepare yourself for a brand new era with SxC International Summit, a
          Grand Event organized by StudentsxCEOs Jakarta consisting of a
          sequence of enriching and groundbreaking events.
        </p>
      </section>

      {/* New Section */}
      <section className="bg-primary-1 py-10 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
            Part of StudentxCEOs
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center">
            <AboutCard logo={logo} header={"StudentsxCEOs Jakarta"}>
              StudentsxCEOs Jakarta is a non-governmental and non-profit
              organization to support college students as an incubator for
              self-development and learning platform. Vision to be the home of
              balanced and connected economic leaders, to push the nations
              towards a development country.
            </AboutCard>

            <AboutCard logo={logo} header={"StudentsxCEOs Jakarta"}>
              StudentsxCEOs Jakarta is a non-governmental and non-profit
              organization to support college students as an incubator for
              self-development and learning platform. Vision to be the home of
              balanced and connected economic leaders, to push the nations
              towards a development country.
            </AboutCard>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-16 md:py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8">Vision</h3>
          <p className="text-base sm:text-lg mb-4 sm:mb-6">Vision content goes here.</p>
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8">Mission</h3>
          <p className="text-base sm:text-lg">Mission content goes here.</p>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
