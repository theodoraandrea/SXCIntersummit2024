import Navbar from "./../components/navbar";
import AboutCard from "../components/elements/about-card";
import Footer from "./../components/footer";
import { useLocation } from "react-router-dom";
import { version } from "react";

const challenges1 = "/images/challenges/challenge1.png";
const challenges2 = "/images/challenges/challenge2.png";
const challenges3 = "/images/challenges/challenge3.png";
const challenges4 = "/images/challenges/challenge4.png";


const bgHero = "/images/bg-about.png";
const logo = "/images/logo-fix/sxcjkt.png";
const logointersummit = "/images/logo-fix/intersummit.png";
const Tiketcom = "/images/tiket.com.png";
const PizzaHut = "/images/PizzaHut.png";
const PNG = "/images/PNG.png";
const mi = "/images/mi.png";
const traveloka = "/images/traveloka.png";
const puyo = "/images/puyo.png";
const mandiri = "/images/mandiri.png";
const rohto = "/images/rohto.png";
const bukalapak = "/images/bukalapak.png";
const nutrifood = "/images/nutrifood.png";
const microsoft = "/images/microsoft.png";
const tokopedia = "/images/tokopedia.png";
const bca = "/images/bca.png";
const loreal = "/images/loreal.png";
const natur = "/images/natur.png";
const hangry = "/images/hangry.png";
const lingotalk = "/images/lingotalk.png";
const cakap = "/images/cakap.png";
const prodia = "/images/prodia.png";
const paragon = "/images/paragon.png";
const kopisoe = "/images/kopisoe.png";
const cakeresume = "/images/cakeresume.png";
const blibli = "/images/blibli.png";
const lokalate = "/images/lokalate.png";
const medpar1 = "/images/medpar1.png";
const medpar2 = "/images/medpar2.png";
const synergy = "/images/valueee1.png";
const passion = "/images/valueee3.png";
const excellence = "/images/valueee2.png";
const pwc = "/images/ricky-pwc.png";
const corporate = "/images/Corporate.jpg";
const medpar = "/images/medpar.jpg";
const university = "/images/university.png";
const school = "/images/school.png";
const participants = "/images/participant.png";
const najwa = "/images/ambassador/najwa.png";
const bilgis = "/images/ambassador/bilgis.png";
const rezita = "/images/ambassador/rezita.png";
const talita = "/images/ambassador/talita.png";
const vania = "/images/ambassador/vania.png";
const alifya = "/images/ambassador/1/alifya.png";
const denisha = "/images/ambassador/1/Denisha.png";
const gracia = "/images/ambassador/1/gracia.png";
const lucas = "/images/ambassador/1/lucas.png";
const m_alvin = "/images/ambassador/1/M_Alvin.png";
const m_rizki = "/images/ambassador/1/M_Rizki.png";
const rahma = "/images/ambassador/1/rahma.png";
const ratu = "/images/ambassador/1/ratu.png";
const Veronica = "/images/ambassador/1/Veronica.png";
const enta = "/images/ambassador/1/Enta.png";
const yumna = "/images/ambassador/1/yumna.png";

const ajeng = "/images/ambassador/2/ajeng.png";
const deva = "/images/ambassador/2/deva.png";
const dhabi = "/images/ambassador/2/dhabi.png";
const dinda = "/images/ambassador/2/dinda.png";
const estu = "/images/ambassador/2/estu.png";
const fahrul = "/images/ambassador/2/fahrul.png";
const shabrina = "/images/ambassador/2/shabrina.png";
const syifa = "/images/ambassador/2/syifa.png";
const varencia = "/images/ambassador/2/varencia.png";
const yossi = "/images/ambassador/2/yossi.png";

const value1 = "/images/our-values/value1.png";
const value2 = "/images/our-values/value2.png";
const value3 = "/images/our-values/value3.png";
const value4 = "/images/our-values/value4.png";
const reviewbca = "/images/reviewbca2.png";

// Medpar
const CBSAUI = "/images/media-partner/CBSA-UI.png";
const FPCI = "/images/media-partner/LOGO-FPCI-CHAPTER-BINUS.png";
const HIMA = "/images/media-partner/LOGO-HIMA-PSIKOLOGI-UNY.png";
const IIS = "/images/media-partner/Logo-IIS-2024.png";
const STEM = "/images/media-partner/YouthInSTEM.png";
const aisectrisakti = "/images/media-partner/aisec-trisakti.png";
const atmaconsul = "/images/media-partner/Atma-Jaya-Consulting-Community.png";
const femipb = "/images/media-partner/BEM-FEM-IPB.png";
const brandui = "/images/media-partner/Brand-UI.png";
const cedsui = "/images/media-partner/CEDS-UI.png";
const fincamp = "/images/media-partner/Fincamp.png";
const fpci = "/images/media-partner/FPCI-UI.jpeg";
const growthhub = "/images/media-partner/Growth-Hub.png";
const himamgtunpad = "/images/media-partner/HIMAMGTUNPAD.jpg";
const himatika = "/images/media-partner/himatika-umm.png";
const himmebinus = "/images/media-partner/himme-binus.jpg";
const imagama = "/images/media-partner/imagama.png";
const kostaf = "/images/media-partner/kostaf.png";
const kronika = "/images/media-partner/kronika.png";
const bemfebunj = "/images/media-partner/bemfebunj.png";
const cdc = "/images/media-partner/logo_CDC-Gelap.png";
const magdalene = "/images/media-partner/logo-magdalene.png";
const ppit = "/images/media-partner/Logo-PPIT-Dark.png";
const radiountar = "/images/media-partner/radiountar.png";
const search = "/images/media-partner/Logo-SEARCH.jpg";
const mss = "/images/media-partner/mss-feb-ui.jpg";
const sigma = "/images/media-partner/SigmaTvUnj.png";
const skillup = "/images/media-partner/SkillUp.png";
const teens = "/images/media-partner/Teens-Educ.png";
const uidigitalk = "/images/media-partner/UI-DigiTalk.jpg";
const untirta = "/images/media-partner/Untirta-TV.png";
const birama = "/images/media-partner/2/birama.jpg";
const bpreneur = "/images/media-partner/2/bpreneur.png";
const fiscalcareer = "/images/media-partner/2/fiscalcareer.png";
const fisipupn = "/images/media-partner/2/fisipupn.png";
const fkipusd = "/images/media-partner/2/fkipusd.png";
const fmipaunnes = "/images/media-partner/2/fmipaunnes.png";
const fpcibinus = "/images/media-partner/2/fpcibinus.png";
const himiespa = "/images/media-partner/2/himiespa.png";
const himitepa = "/images/media-partner/2/himitepa.png";
const husbandry = "/images/media-partner/2/husbandry.png";
const psikouny = "/images/media-partner/2/psikouny.png";




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
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mx-4 sm:mx-8 md:mx-20 text-gradient mx-4 sm:mx-8 md:mx-2">
          StudentsxCEOs International Summit
        </h1>
      
        <p className="text-base sm:text-lg md:text-xl mt-3 sm:mt-5 md:mt-6 max-w-full mx-4 sm:mx-8 md:mx-20 text-white">
        Unlock your potential at the StudentsxCEOs International Summit, where Indonesia's brightest minds converge to innovate, inspire, and lead. Dive into transformative programs tailored to elevate your future. Be the change-maker our nation needs—your journey starts here.
        </p>
      </section>

      {/* New Section */}
      <section className="bg-primary-1 py-10 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
            Part of StudentxCEOs
          </h2>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-stretch space-y-4 sm:space-y-0 sm:space-x-0 mx-4 sm:mx-8">
            <AboutCard
              logo={logo}
              header="StudentsxCEOs Jakarta"
              logoClassName="w-32 h-32 object-cover mx-auto"
              className="flex-1"
            >
              StudentsxCEOs was founded in 2010 as an organization for aspiring future business leaders in Indonesia. StudentsxCEOs is a leadership accelerator, guild boardroom, and think-tank for future business leaders designed for students. With strongly connected 5 major chapters, 150+ core members linked to 1000+ top students in over 30+ top universities and 100+ corporate partners, we help corporations and leaders to connect with student-leaders across the nation.
            </AboutCard>

            <AboutCard
              logo={logointersummit}
              header="SxC International Summit 2024"
              logoClassName="w-32 h-32 object-cover mx-auto"
              className="flex-1"
            >
              StudentsxCEOs International Summit is a grand event organized by StudentsxCEOs Jakarta. Its objective is to act as a catalyst for students worldwide, helping them prepare for the workforce and differentiate themselves from their peers. SxC International Summit invited the participants to help prepare themselves to enter the work environment and distinguish themselves from their competitors.
            </AboutCard>
          </div>
        </div>
      </section>

      {/* New Section : Vision and Mission */}
      <div className="bg-teal-800 min-h-screen p-8 flex flex-col items-center justify-center">
        {/* Section Atas : Our Value */}
        <div className="w-full mb-10 max-w-4xl p-6 sm:p-10 rounded-lg relative">
          <div className="absolute top-[-60px] sm:top-[-80px] left-1/2 transform -translate-x-1/2 w-full max-w-lg sm:max-w-2xl bg-primary-4 rounded-lg p-6 sm:p-8 shadow-lg flex justify-around items-center space-x-6 sm:space-x-8">
            <div className="text-center">
              <img src={passion} alt="Passion" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4" />
              <div className="text-white font-bold text-base sm:text-lg">Passion</div>
            </div>
            <div className="text-center">
              <img src={synergy} alt="Synergy" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4" />
              <div className="text-white font-bold text-base sm:text-lg">Synergy</div>
            </div>
            <div className="text-center">
              <img src={excellence} alt="Excellence" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4" />
              <div className="text-white font-bold text-base sm:text-lg">Excellence</div>
            </div>
          </div>
        </div>


        {/* Section Tengah : Tagline */}
          <h2 className="text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gradient mx-4 sm:mx-8 md:mx-2">
            Tagline
          </h2>
          <h5
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-6 sm:mb-8 md:mb-10 text-white p-4 rounded-3xl shadow-lg bg-primary-4 mx-auto overflow-hidden text-ellipsis"
          >
            Lead The Change, Shape The Future!
          </h5>




        {/* Section Bawah */}
      <div className="w-full max-w-5xl bg-teal-100 p-10 rounded-lg shadow-lg flex flex-col sm:flex-row items-center">
        {/* Bagian Kiri */}
        <div className="flex-1 flex items-center justify-center mb-8 sm:mb-0">
          <div className="bg-gradient-to-b from-teal-500 to-teal-800 rounded-full w-72 h-72 flex items-center justify-center">
            <span className="text-white text-center text-xl sm:text-2xl font-bold">
              Our Vision & Mission
            </span>
          </div>
        </div>

        {/* Bagian Kanan */}
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-teal-800 text-xl sm:text-2xl font-bold mb-4">Vision</h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Envisions a future where the global economy is driven by innovative and strategic leaders who harness technology as a tool to create sustainable growth, foster collaboration, and address the complex challenges of the modern world.
            </p>
          </div>
          <div>
            <h2 className="text-teal-800 text-xl sm:text-2xl font-bold mb-4">Mission</h2>
            <ul className="list-decimal list-inside text-gray-700 space-y-2 text-sm sm:text-base">
              <li>Fostering Strategic Thinking</li>
              <li>Addressing the Skills Gap</li>
              <li>Promoting Sustainability</li>
              <li>Encouraging Innovation</li>
            </ul>
          </div>
        </div>
      </div>
      </div>  


      {/* New Section : Why We Move Amoung Youth? */}
      <section className="bg-primary-1 py-10 sm:py-16 md:py-20">
        {/* Why We Move Amoung Youth? */}
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-white">
          <h2 className="text-center text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gradient mx-4 sm:mx-8 md:mx-2">
            Why We Move Amoung Youth?
          </h2>
          <p
           className="text-center text-base sm:text-lg md:text-xl my-5 font-normal mb-6 sm:mb-8 md:mb-10 px-2">
            As Indonesia strides towards Vision 2045, building a strong workforce is crucial. However, statistics show that 1 in 5 young people are still not engaged in meaningful real-world training. The SxC International Summit is committed to bridging this gap by preparing students for successful careers and equipping them with the skills and insights needed to excel in the professional world
          </p>
        </div>

        {/* The Challenges We Address */}
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-white">
          <h2 className="text-center text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gradient mx-4 sm:mx-8 md:mx-2">
            The Challenges We Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                <img src={challenges1} alt="icon 1" className="w-12 h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white max-w-xs">Adapting to rapid technological disruption</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                <img src={challenges2} alt="icon 2" className="w-12 h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white max-w-xs">Filling gaps in essential professional skills</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                <img src={challenges3} alt="icon 3" className="w-12 h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white max-w-xs">Navigating increased competition in the job market</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                <img src={challenges4} alt="icon 4" className="w-12 h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white max-w-xs">Overcoming limited access to relevant work-study opportunities</div>
            </div>
          </div>
        </div>

        {/* Our Focus Area */}
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-white">
          <h2 className="text-center text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gradient mx-4 sm:mx-8 md:mx-2">
            Our Focus Area
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                <img src={value1} alt="icon 1" className="w-12 h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white max-w-xs">Providing career knowledge, networking, and transformation opportunities</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                <img src={value2} alt="icon 2" className="w-12 h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white max-w-xs"> Offering guidance for career transitions and upskilling</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                <img src={value3} alt="icon 3" className="w-12 h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white max-w-xs">Enhancing both soft and hard skills in alignment with technological advancements</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                <img src={value4} alt="icon 4" className="w-12 h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white max-w-xs">Cultivating an innovative mindset and personal growth for future leaders</div>
            </div>
          </div>
        </div>
        
        {/* Our Milestone */}
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-white">
          <h2 className="text-center text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gradient mx-4 sm:mx-8 md:mx-2">
            Our Milestone
          </h2>
          <h5 className="text-yellow-500 text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 mx-4 sm:mx-8 md:mx-2 max-w-full">
            Participants
          </h5>
          
          <div className="bg-primary-4 shadow-md rounded-lg p-4 mx-2 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 min-h-30">
            {/* Future Leaders */}
            <div className="flex items-center space-x-2">
                <img src={participants} alt="Future Leaders Icon" className="h-20 w-20 object-contain sm:h-16 sm:w-16 md:h-12 md:w-12" />
                <div className="text-center">
                  <div className="text-teal-600 text-3xl font-bold">2000+</div>
                  <div className="text-white text-lg">Future Leaders</div>
                </div>
              </div>

              {/* University Students */}
              <div className="flex items-center space-x-2">
                <img src={university} alt="University Students Icon" className="h-20 w-20 object-contain sm:h-16 sm:w-16 md:h-12 md:w-12" />
                <div className="text-center">
                  <div className="text-teal-600 text-3xl font-bold">87%</div>
                  <div className="text-white text-lg">University Students</div>
                </div>
              </div>

              {/* High School Students */}
              <div className="flex items-center space-x-2">
                <img src={school} alt="High School Students Icon" className="h-20 w-20 object-contain sm:h-16 sm:w-16 md:h-12 md:w-12" />
                <div className="text-center">
                  <div className="text-teal-600 text-3xl font-bold">13%</div>
                  <div className="text-white text-lg">High School Students</div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* New Section : Our Milestone */}
      <section className="bg-primary-1 py-2 sm:py-16 md:py-20">
        

        {/* Masukkan Untuk CP, Sponsors, Media Partner */}
        <section className="bg-primary-4 py-5 sm:py-16 md:py-20">
            {/* Bagian 2 */}
            <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4 mx-4 my-6">
              {/* Company Partners */}
              <div className="bg-white shadow-md rounded-lg px-16 w-full lg:w-[30%] lg:ml-10">
                <div className="text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-yellow-500 text-center">Company Partner</div>
                <div className="grid grid-cols-3 gap-4 mb-7">
                  <div className="flex justify-center items-center">
                    <img src={Tiketcom} alt="Tiket.com" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={PizzaHut} alt="Pizza Hut" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={PNG} alt="P&G" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={mi} alt="mi" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={traveloka} alt="Traveloka" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={puyo} alt="Puyo" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={mandiri} alt="mandiri" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={rohto} alt="rohto" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={bukalapak} alt="bukalapak" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={nutrifood} alt="nutrifood" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={microsoft} alt="microsoft" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={tokopedia} alt="tokopedia" className="h-16 object-contain" />
                  </div>
                </div>
              </div>

              {/* Sponsor */}
              <div className="bg-white shadow-md rounded-lg px-16 w-full lg:w-[30%]">
                <div className="text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-yellow-500 text-center">Sponsor</div>
                <div className="grid grid-cols-3 gap-4 mb-7">
                  <div className="flex justify-center items-center">
                    <img src={bca} alt="BCA" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={natur} alt="Natur" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={loreal} alt="Loreal" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={hangry} alt="hangry" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={lingotalk} alt="lingotalk" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={cakap} alt="cakap" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={prodia} alt="prodia" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={paragon} alt="paragon" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={kopisoe} alt="kopisoe" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={cakeresume} alt="cakeresume" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={blibli} alt="blibli" className="h-16 object-contain" />
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={lokalate} alt="lokalate" className="h-16 object-contain" />
                  </div>
                </div>
              </div>

              {/* Media Partner */}
              <div className="bg-white shadow-md rounded-lg px-16 w-full lg:w-[30%] lg:mr-10">
                <div className="text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-yellow-500 text-center">Media Partner</div>
                <div className="grid grid-cols-1 gap-4 mb-7">
                  <div className="flex justify-center items-center h-auto">
                    <img src={medpar1} alt="medpar1" className="max-h-20 sm:max-h-24 md:max-h-32 w-auto object-contain" />
                  </div>
                  <div className="flex justify-center items-center h-auto">
                    <img src={medpar2} alt="medpar2" className="max-h-60 sm:max-h-72 md:max-h-80 w-auto object-contain"/>
                  </div>
                </div>
              </div>
            </div>
            {/* end of */}


          
        </section>

      </section>

      {/* New Section : Past Testimony */}
      <section className="bg-primary-1 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center text-white">
          <h2 className="text-2xl my-auto sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gradient mx-4 sm:mx-8 md:mx-2">
            Past Testimony
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-center text-center relative">
              
              <img src={pwc} alt="Winner 1" className="relative z-20 mb-[15px]" />
              <h3 className="text-xl font-bold text-white bg-primary-3 px-4 rounded-2xl z-10">
              Ricky Sucitra - Human Capital Strategy Lead at PwC
              </h3>
              <p className="mt-2 text-white px-4 text-left mx-5 md:mx-10 z-10 pb-10 md:pb-0">
              “Wow baru kali ini nih kita collab acara mahasiswa di sesi Q&Anya pertanyaannya sangat berbobot ya, bisa terlihat kualitas dari temen-temen sxc yang luar biasa loh, baru kali ini engga ada yang nanya work life balance dan bedagang ga kak kerja di PwC, yes yes we should definitely collab in another event yaa temen-temen SxC."
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center relative">
              
              <img src={reviewbca} alt="Winner 2" className="relative z-20 mb-[-20px]" />
              <h3 className="text-xl font-bold text-white bg-primary-3 px-4 rounded-2xl z-10">
              Veigy Pruedensia - Employer Branding at BCA
              </h3>
              <p className="mt-2 text-white px-4 text-right mx-5 md:mx-10 z-10">
              Terima kasih banyak temen-temen SxCEOs. Jujur kolaborasi bareng kalian adalah pengalaman yang berkesan dan menyenangkan banget juga buat aku. Kalian antusias dan koordinasinya juga lancar. Senang juga bisa kenal kalian semuaa anak- anak baik yang passionate dan berambisi.
              </p>
            </div>
          </div>
        </div>
      

      </section>

      {/* New Section : Ambassador */}
      <section className="bg-primary-1 py-10 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center text-white">
          <h2 className="text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gradient mx-4 sm:mx-8 md:mx-2">
            Ambassador
          </h2>

          <div className="flex flex-wrap justify-center">
            <img src={najwa} alt="Ambassador 1" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={bilgis} alt="Ambassador 2" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={rezita} alt="Ambassador 3" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={talita} alt="Ambassador 4" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={vania} alt="Ambassador 5" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={alifya} alt="Ambassador 6" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={denisha} alt="Ambassador 7" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={enta} alt="Ambassador 8" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={gracia} alt="Ambassador 9" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={lucas} alt="Ambassador 10" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={m_alvin} alt="Ambassador 11" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={m_rizki} alt="Ambassador 12" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={rahma} alt="Ambassador 13" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={ratu} alt="Ambassador 14" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={Veronica} alt="Ambassador 15" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={yumna} alt="Ambassador 16" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={ajeng} alt="Ambassador 17" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={deva} alt="Ambassador 18" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={dhabi} alt="Ambassador 19" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={dinda} alt="Ambassador 20" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={estu} alt="Ambassador 21" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={fahrul} alt="Ambassador 22" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={shabrina} alt="Ambassador 23" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={syifa} alt="Ambassador 24" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={varencia} alt="Ambassador 25" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
            <img src={yossi} alt="Ambassador 26" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 m-2 sm:m-3 md:m-4" />
          </div>

        </div>

        {/* Our Sponsors and Media Partners */}
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center text-white">
          <h2 className="text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gradient mx-4 sm:mx-8 md:mx-2">
            Our Sponsors and Media Partners
          </h2>

          <div className="flex flex-wrap justify-center">
          <img src={CBSAUI} alt="Ambassador 1" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={FPCI} alt="Ambassador 2" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={HIMA} alt="Ambassador 3" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={IIS} alt="Ambassador 4" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={STEM} alt="Ambassador 5" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={aisectrisakti} alt="Ambassador 6" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={atmaconsul} alt="Ambassador 7" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={femipb} alt="Ambassador 8" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={brandui} alt="Ambassador 9" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={cedsui} alt="Ambassador 10" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={fincamp} alt="Ambassador 11" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={fpci} alt="Ambassador 12" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={growthhub} alt="Ambassador 13" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={himamgtunpad} alt="Ambassador 14" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={himatika} alt="Ambassador 15" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={himmebinus} alt="Ambassador 16" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={imagama} alt="Ambassador 17" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={kostaf} alt="Ambassador 18" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={kronika} alt="Ambassador 19" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={bemfebunj} alt="Ambassador 20" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={cdc} alt="Ambassador 21" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={magdalene} alt="Ambassador 22" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={ppit} alt="Ambassador 23" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={radiountar} alt="Ambassador 24" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={search} alt="Ambassador 25" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={mss} alt="Ambassador 26" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={sigma} alt="Ambassador 27" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={skillup} alt="Ambassador 28" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={teens} alt="Ambassador 29" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={uidigitalk} alt="Ambassador 30" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={untirta} alt="Ambassador 31" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={birama} alt="Ambassador 32" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={bpreneur} alt="Ambassador 33" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={fiscalcareer} alt="Ambassador 34" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={fisipupn} alt="Ambassador 35" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={fkipusd} alt="Ambassador 36" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          <img src={fmipaunnes} alt="Ambassador 37" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
            <img src={fpcibinus} alt="Ambassador 38" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
            <img src={himiespa} alt="Ambassador 39" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
            <img src={himitepa} alt="Ambassador 40" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
            <img src={husbandry} alt="Ambassador 41" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
            <img src={psikouny} alt="Ambassador " className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 m-2 sm:m-3 md:m-4" />
          </div>
        </div>
         
      </section>

      {/* New Section : We Are Still Calling for Sponsor */}
      <section className="bg-teal-900 py-16 text-white">
      <div className="container mx-auto text-center">
        <h1 className="text-yellow-500 text-xl md:text-3xl font-bold mb-6">
          We Are Still Calling for Sponsor and Media Partner!
        </h1>
      </div>

      {/* Corporate Partnership Section 1 */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="bg-teal-800 p-6 rounded-lg shadow-lg w-full md:w-1/2 text-center">
          <img src={corporate} alt="Corporate Partnership" className="h-full w-full object-contain" />
        </div>
        <div className="bg-teal-800 p-6 rounded-lg shadow-lg w-full md:w-1/2">
          <h2 className="text-yellow-500 text-lg font-semibold mb-4">Corporate Partnership</h2>
            <p className="text-sm md:text-base leading-relaxed">
              Looking for a way to create a lasting impact and exposure to the next generation? Establish a partnership with us and support our mission to empower future leaders and innovators in the digital economy. We’d love to explore how we can collaborate to achieve this shared vision. Together, let's elevate the future leaders!
            </p>
          <div className="mt-6 text-center">
            <a href="https://wa.me/081288059303" className="bg-yellow-500 text-teal-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Jabat Tangan Section */}
      <div className="container mt-10 mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-6">
        <div className="bg-teal-800 p-6 rounded-lg shadow-lg w-full md:w-1/2">
          <h2 className="text-yellow-500 text-lg font-semibold mb-4">Media Partner</h2>
          <p className="text-sm md:text-base leading-relaxed">
            Is your platform dedicated to spotlighting education and development for the youth? Establish a partnership with us and let's nurture the next wave of global leaders in the digital economy. We’d love to discuss how we can work together to amplify this mission. Let’s join forces to broadcast the future with the SxC International Summit 2024!
          </p>
          <div className="mt-6 text-center">
            <a href="https://wa.me/085782799445" className="bg-yellow-500 text-teal-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600">
              Contact Us
            </a>
          </div>
        </div>
        <div className="bg-teal-800 p-6 rounded-lg shadow-lg w-full md:w-1/2 text-center">
          <img src={medpar} alt="Corporate Partnership" className="h-full w-full object-contain" />
        </div>
      </div>

      </section>
      
      <Footer/>
    </div>
  );
}
