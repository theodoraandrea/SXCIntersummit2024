import Navbar from "./../components/navbar-landing";
import BgHero from "./../images/bg-about.png";
import logo from "./../images/sxc-jakarta.png";

export default function About() {

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section 
        className="bg-cover bg-center h-500 flex flex-col justify-center"
        style={{ backgroundImage: `url(${BgHero})` }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mx-20">
          StudentxCEOs International Summit 2024
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mt-4 text-gradient mx-20">
          Innovate or Obsolete: Thriving in a world of technology disruption
        </h2>
        <p className="mt-5 text-lg md:text-xl max-w-full mx-20 text-white">
          Prepare yourself for a brand new era with SxC International Summit, a Grand Event organized by StudentsxCEOs Jakarta consisting of a sequence of enriching and groundbreaking events.
        </p>
      </section>
      
      {/* New Section */}
      <section className="bg-primary-1 py-20">
        <div className="container mx-auto px-6 md:px-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Part of StudentxCEOs
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="bg-white text-black rounded-lg shadow-lg max-w-lg mx-4 mb-8 md:mb-0 p-6">
              <img src={logo} alt="StudentxCEOs Jakarta" className="mx-auto mb-4" />
              <h1 className="text-3xl font-bold py-2 text-primary-1">StudentsxCEOs Jakarta</h1>
              <p className="text-lg">
                StudentsxCEOs Jakarta is a non-governmental and non-profit organization to support college students as an incubator for self-development and learning platform. Vision to be the home of balanced and connected economic leaders, to push the nations towards a development country.
              </p>
            </div>
            <div className="bg-white text-black rounded-lg shadow-lg max-w-lg mx-4 p-6">
              <img src={logo} alt="StudentxCEOs Jakarta" className="mx-auto mb-4" />
              <h1 className="text-3xl font-bold py-2 text-primary-1">StudentsxCEOs Jakarta</h1>
              <p className="text-lg">
                StudentsxCEOs Jakarta is a non-governmental and non-profit organization to support college students as an incubator for self-development and learning platform. Vision to be the home of balanced and connected economic leaders, to push the nations towards a development country.
              </p>
            </div>
          </div>
        </div>
      </section>

    <section className="justify-center items-center flex text-center bg-white py-20">
        <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-4">Vision</h3>
        <p className="text-lg mb-8">
            Vision content goes here.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Mission</h3>
        <p className="text-lg">
            Mission content goes here.
        </p>
        </div>
    </section>
    </div>
  );
}
