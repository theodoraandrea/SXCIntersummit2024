import Navbar from "./../components/navbar";
import AboutCard from "../components/elements/about-card";
import Footer from "./../components/footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { version } from "react";

const CORPORATE_PARTNERSHIP_CONTACT = "https://wa.me/081288059303";
const MEDIA_PARTNERSHIP_CONTACT = "https://wa.me/085782799445";

const challenges1 = "/images/challenges/challenge1.png";
const challenges2 = "/images/challenges/challenge2.png";
const challenges3 = "/images/challenges/challenge3.png";
const challenges4 = "/images/challenges/challenge4.png";

const ui = "/images/uni/ui.png";
const binus = "/images/uni/binus.png";
const ugm = "/images/uni/ugm.png";
const unair = "/images/uni/unair.png";
const undip = "/images/uni/undip.png";
const itb = "/images/uni/itb.png";
const ipb = "/images/uni/ipb.png";
const donghwa = "/images/uni/donghwa.png";
const prasmul = "/images/uni/prasmul.png";
const atma = "/images/uni/atma.png";


const bgHero = "/images/bg-about.png";
const bgParticipants ="/images/knowusbetter.png";
const logo = "/images/logo-fix/sxcjkt.png";
const logointersummit = "/images/logo-fix/intersummit.png";

const companyPartners = "/images/about/companyPartners.png";
const sponsors = "/images/about/sponsors.png";
const mediaPartners = "/images/about/mediaPartners.png";

const lokalate = "/images/lokalate.png";
const medpar1 = "/images/medpar1.png";
const medpar2 = "/images/medpar2.png";
const synergy = "/images/value1.png";
const passion = "/images/value3.png";
const excellence = "/images/value2.png";
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
const veronica = "/images/ambassador/1/Veronica.png";
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
const reviewbca = "/images/reviewbca.png";

// Medpar

export default function About() {

  const location = useLocation();

  useEffect(() => {
    //window.scrollTo(0,0);
  }, []);
  
  return (
    <div>
      <Navbar 
        currentPath={location.pathname}
      />
      {/* Hero Section */}
      <section
        className="bg-cover bg-center py-32 flex flex-col justify-center"
        style={{ backgroundImage: `url(${bgHero})`}}
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mx-4 sm:mx-8 md:mx-20 text-gradient mx-4 sm:mx-8 md:mx-2">
          StudentsxCEOs International Summit
        </h1>
      
        <p className="text-base sm:text-lg md:text-xl mt-3 sm:mt-5 md:mt-6 max-w-full mx-4 sm:mx-8 md:mx-20 text-white">
        Unlock your potential at the StudentsxCEOs International Summit, where Indonesia's brightest minds converge to innovate, inspire, and lead. Dive into transformative programs tailored to elevate your future. Be the change-maker our nation needs—your journey starts here.
        </p>
      </section>

      {/* New Section */}
      <section className="bg-primary-4 py-16 md:py-32"
max-w-5xl      >
        <div className="text-center">
          <h2 className="text-white mb-8 sm:mb-16 text-xl mx-8 sm:mx-32 md:mx-auto md:text-3xl font-bold">
            Part of StudentsxCEOs Jakarta
          </h2>
            <div className="mx-auto w-fit gap-y-8 justify-center flex flex-col gap-x-16 lg:flex-row">
            <div className="mx-8 px-8 py-8 sm:py-12 sm:px-12 bg-gray-200 max-w-md rounded-2xl shadow-md text-primary-1">
            <img src={logo} className="mx-auto object-contain sm:w-1/2"/>
            <div>
              <h1 className="text-primary-4 text-xl py-2 font-bold">StudentsxCEOs Jakarta</h1>
              <p className="sm:w-[320px] mx-auto text-justify text-sm text-primary-4">
              StudentsxCEOs was founded in 2010 as an organization for aspiring future business leaders in Indonesia. StudentsxCEOs is a leadership accelerator, guild boardroom, and think-tank for future business leaders designed for students. With strongly connected 5 major chapters, 150+ core members linked to 1000+ top students in over 30+ top universities and 100+ corporate partners, we help corporations and leaders to connect with student-leaders across the nation.
              </p>
            </div>
            </div>
            <div className="mx-8 px-8 py-8 sm:py-12 sm:px-12 bg-gradient-secondary-2 max-w-md rounded-2xl shadow-md text-gray-200">
              <img src={logointersummit} className="mx-auto object-contain sm:w-1/2"/>
              <div>
              <h1 className="text-xl font-bold py-2">SxC International Summit 2024</h1>
              <p className="sm:w-[320px] mx-auto text-justify text-sm">
              StudentsxCEOs International Summit is a grand event organized by StudentsxCEOs Jakarta. Its objective is to act as a catalyst for students worldwide, helping them prepare for the workforce and differentiate themselves from their peers. SxC International Summit invited the participants to help prepare themselves to enter the work environment and distinguish themselves from their competitors.
              </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      <section>
      <div className="min-h-screen py-32 bg-primary-1 flex flex-col items-center justify-center">
        {/* Section Atas : Our Value */}
        <div className="w-full">
          <div className="w-fit mx-auto px-12 py-6 sm:px-16 sm:py-12 text-primary-3 font-semibold
          bg-white
          rounded-3xl shadow-lg">
          <h2 className="text-center text-2xl sm:text-4xl pb-4 sm:pb-8">
            Our Values
          </h2>
          <div className="flex justify-center gap-x-5 sm:gap-x-24 items-center">
            <div className="text-center">
              <img src={passion} alt="Passion" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
              <div className="text-sm sm:text-lg">Passion</div>
            </div>
            <div className="text-center">
              <img src={synergy} alt="Synergy" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
              <div className="text-sm sm:text-lg">Synergy</div>
            </div>
            <div className="text-center">
              <img src={excellence} alt="Excellence" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
              <div className="text-sm sm:text-lg">Excellence</div>
            </div>
          </div>
          </div>
        </div>
        {/* Section Tengah : Tagline */}
        <div className="my-24 sm:my-48">
          <p className="text-gray-400 mx-auto w-fit mb-4 text-xl">TAGLINE</p>
          <div className="mx-4 text-4xl sm:text-6xl lg:text-7xl text-gradient italic font-semibold">
          <h1>❞ Lead the Change,</h1>
          <h1 className="ml-[10px] sm:ml-[70px] lg:ml-[100px] px-2">Shape the Future❞</h1>
          </div>
        </div>

        {/* Section Bawah */}
      <div className="w-full max-w-5xl px-10 items-center">
        <div className="flex flex-col sm:flex-row gap-x-4 md:gap-x-24 w-fit mx-auto">
          <div className="sm:w-1/2 mb-8">
            <h2 className="w-fit mx-auto text-gradient text-3xl font-bold mb-4">Vision</h2>
            <p className="text-gray-200 mx-8 text-sm sm:text-base lg:text-lg text-center">
              Envisions a future where the global economy is driven by innovative and strategic leaders who harness technology as a tool to create sustainable growth, foster collaboration, and address the complex challenges of the modern world.
            </p>
          </div>
          <div className="sm:w-1/2">
            <h2 className="w-fit mx-auto text-gradient text-3xl font-bold mb-4">Mission</h2>
            <ul className="w-fit mx-auto list-disc list-inside lg:text-lg text-gray-200 space-y-2 text-sm sm:text-base">
              <li>Fostering Strategic Thinking</li>
              <li>Addressing the Skills Gap</li>
              <li>Promoting Sustainability</li>
              <li>Encouraging Innovation</li>
            </ul>
          </div>
        </div>
      </div>
      </div>  
      </section>
      {/* New Section : Why We Move Amoung Youth? */}
      <section className="bg-primary-4 py-24 sm:py-32 sm:mx-auto">
        {/* Why We Move Amoung Youth? */}
        <div className="container mx-auto pb-8 px-4 sm:px-6 md:px-12 text-white">
          <h2 className="w-fit mx-auto text-gradient font-bold text-xl sm:text-3xl mb-4">
          Why We Move Amoung Youth?
          </h2>
          <p
           className="text-justify sm:text-center max-w-3xl mx-8 sm:mx-auto text-sm sm:text-base my-5 mb-6 sm:mb-8 md:mb-10 px-2">
            As Indonesia strides towards Vision 2045, building a strong workforce is crucial. However, statistics show that 1 in 5 young people 
            are still not engaged in meaningful real-world training. The SxC International Summit is committed to bridging this gap by preparing 
            students for successful careers and equipping them with the skills and insights needed to excel in the professional world.
          </p>
        </div>

        {/* The Challenges We Address */}
        <div className="max-w-5xl mx-auto pb-16 px-4 sm:px-6 md:px-12 text-white">
          <h2 className="w-fit mx-auto text-gradient text-xl sm:text-3xl mb-4 font-semibold">
            The Challenges We Address
          </h2>
          <div className="grid mx-8 md:mx-32 grid-cols-2 lg:grid-cols-4 pt-4 gap-y-8 lg:mx-8 lg:gap-x-16 sm:py-8">
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-400 bg-opacity-20 rounded-full w-12 h-12 sm:w-24 sm:h-24 flex items-center justify-center mb-4">
                <img src={challenges1} alt="icon 1" className="w-8 h-8 sm:w-12 sm:h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white text-xs sm:text-sm max-w-[160px] lg:max-w-[150px] ">Adapting to rapid technological disruption</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-400 bg-opacity-20 rounded-full w-12 h-12 sm:w-24 sm:h-24 flex items-center justify-center mb-4">
                <img src={challenges2} alt="icon 2" className="w-8 h-8 sm:w-12 sm:h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white text-xs sm:text-sm  max-w-[150px] ">Filling gaps in essential professional skills</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-400 bg-opacity-20 rounded-full w-12 h-12 sm:w-24 sm:h-24 flex items-center justify-center mb-4">
                <img src={challenges3} alt="icon 3" className="w-8 h-8 sm:w-12 sm:h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white text-xs sm:text-sm  max-w-[150px] ">Navigating increased competition in the job market</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-400 bg-opacity-20 rounded-full w-12 h-12 sm:w-24 sm:h-24 flex items-center justify-center mb-4">
                <img src={challenges4} alt="icon 4" className="w-8 h-8 sm:w-12 sm:h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white text-xs sm:text-sm max-w-[160px] lg:max-w-[150px] ">Overcoming limited access to relevant work-study opportunities</div>
            </div>
          </div>
        </div>

        {/* Our Focus Area */}
        <div className="max-w-5xl mx-auto pb-16 px-4 sm:px-6 md:px-12 text-white">
          <h2 className="w-fit mx-auto text-gradient text-xl sm:text-3xl mb-4 font-semibold">
            Our Focus Area
          </h2>
          <div className="grid mx-8 md:mx-32 grid-cols-2 lg:grid-cols-4 pt-4 gap-y-8 lg:mx-8 lg:gap-x-16 sm:py-8">
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-400 bg-opacity-20 rounded-full w-12 h-12 sm:w-24 sm:h-24 flex items-center justify-center mb-4">
                <img src={value1} alt="icon 1" className="w-8 h-8 sm:w-12 sm:h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white text-xs sm:text-sm max-w-[160px] lg:max-w-[150px] ">
              Providing career knowledge, networking, and transformation opportunities
              </div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-400 bg-opacity-20 rounded-full w-12 h-12 sm:w-24 sm:h-24 flex items-center justify-center mb-4">
                <img src={value2} alt="icon 2" className="w-8 h-8 sm:w-12 sm:h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white text-xs sm:text-sm  max-w-[150px] ">
              Offering guidance for career transitions and upskilling
              </div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-400 bg-opacity-20 rounded-full w-12 h-12 sm:w-24 sm:h-24 flex items-center justify-center mb-4">
                <img src={value3} alt="icon 3" className="w-8 h-8 sm:w-12 sm:h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white text-xs sm:text-sm  max-w-[190px] ">
              Enhancing both soft and hard skills in alignment with technological advancements
              </div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="bg-gray-400 bg-opacity-20 rounded-full w-12 h-12 sm:w-24 sm:h-24 flex items-center justify-center mb-4">
                <img src={value4} alt="icon 4" className="w-8 h-8 sm:w-12 sm:h-12" /> {/* Replace with your icon or image */}
              </div>
              <div className="text-white text-xs sm:text-sm max-w-[150px] lg:max-w-[170px] ">
              Cultivating an innovative mindset and personal growth for future leaders
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="w-fit mx-auto text-gradient text-5xl mt-32 mb-8 font-semibold">
          Our Milestones
        </h2>
        {/* Our Milestone */}
        <div className="w-full my-16 px-4 py-32 sm:px-6 md:px-12 text-white"
          style={{ backgroundImage: `url(${bgParticipants})`,
          backgroundSize: "cover"        }}
        >

          <h2 className="w-fit mx-auto text-gray-200 text-4xl mb-4 font-medium">
          Participants
          </h2>

          <div className="bg-primary-4 shadow-md mx-auto max-w-4xl rounded-lg px-8 py-4 flex flex-row justify-between items-center gap-x-4 min-h-30">
            <div className="flex items-center gap-x-2">
                <img src={participants} alt="Future Leaders Icon" className="h-12 w-12 sm:h-16 sm:w-16 mx-2 object-contain" />
                <div className="text-center">
                  <div className="text-gradient w-fit mx-auto text-lg sm:text-3xl font-bold">2000+</div>
                  <div className="text-white text-xs sm:text-lg">Future Leaders</div>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <img src={university} alt="University Students Icon" className="h-8 w-8 sm:h-12 sm:w-12 mx-2 object-contain" />
                <div className="text-left"> 
                  <div className="text-primary-2 w-fit text-lg sm:text-3xl font-bold">87%</div>
                  <div className="text-white text-xs sm:text-lg">University Students</div>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <img src={school} alt="High School Students Icon" className="h-8 w-8 sm:h-12 sm:w-12 mx-2 object-contain" />
                <div className="text-left">
                  <div className="text-primary-2 w-fit text-lg sm:text-3xl font-bold">13%</div>
                  <div className="text-white text-xs sm:text-lg">High School Students</div>
                </div>
              </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto justify-center flex flex-row gap-x-8 overflow-x-scroll">
            <img src={ui} className="h-16"/>
            <img src={itb} className="h-16"/>
            <img src={ugm} className="h-16"/>
            <img src={ipb} className="h-16"/>
            <img src={binus} className="h-16"/>
            <img src={unair} className="h-16"/>
            <img src={undip} className="h-16"/>
            <img src={prasmul} className="h-16"/>
            <img src={atma} className="h-16"/>
          </div>
          <p className="pt-12 w-fit mx-auto text-gray-200">and many more ...</p>
        </div>
      </section>

        {/* Masukkan Untuk CP, Sponsors, Media Partner */}
      <section className="bg-primary-4 px-32 pb-32 lg:px-16">
        <div className="bg-primary-4 h-400 flex flex-col md:flex-row md:justify-center shadow-lg">
          <div className="bg-white flex flex-col px-4 py-8 lg:py-12 lg:px-16">
            <h1 className="text-center text-primary-4 text-lg lg:text-2xl mx-auto font-semibold pb-4">Company Partners</h1>
            <img src={companyPartners} className="object-contain"/>
          </div>
          <div className="bg-white flex flex-col px-4 py-8 lg:py-12 lg:px-16">
            <h1 className="text-center text-primary-4 text-lg lg:text-2xl mx-auto font-semibold pb-4">Sponsors</h1>
            <img src={sponsors} className="object-contain"/>
          </div>
          <div className="bg-white flex flex-col px-4 py-8 lg:py-12 lg:px-16">
            <h1 className="text-center text-primary-4 text-lg lg:text-2xl mx-auto font-semibold pb-4">Media Partners</h1>
            <img src={mediaPartners} className="object-contain"/>
          </div>
        </div>
      </section>


      {/* New Section : Past Testimony */}
      <section className="bg-primary-1 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center text-white">
          <h2 className="text-2xl my-auto sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gradient mx-4 sm:mx-8 md:mx-2">
            Past Testimonies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-row md:flex-col items-center text-center relative">
              <img src={pwc} alt="Ricky Sucitra-PwC" className="h-200 lg:h-300 my-12" />
              <div>
              <h3 className="text-xl font-bold text-white px-4 rounded-2xl z-10">
              Ricky Sucitra
              </h3>
              <h1 className="text-gradient">Human Capital Strategy Lead at PwC</h1>
              <p className="mt-2 text-white text-xs lg:text-sm text-justify px-4 text-left mx-5 lg:mx-10 pb-10 md:pb-0">
              <i>Wow</i>, baru kali ini nih kita collab acara mahasiswa dan pertanyaan di sesi Q&Anya sangat berbobot, bisa terlihat kualitas dari temen-temen SxC yang luar biasa. Baru kali ini engga ada yang nanya <i>work-life balance</i> dan <i>"begadang ga kak kerja di PwC?"</i>. We should definitely collab in another event ya, temen-temen SxC!
              </p>
              </div>
            </div>
            
            <div className="flex flex-row md:flex-col items-center text-center relative">
              <img src={reviewbca} alt="Veigy Pruedensia-BCA" className="h-200 lg:h-300 my-12"/>
              <div>
              <h3 className="text-xl font-bold text-white px-4 z-10">
              Veigy Pruedensia
              </h3>
              <h1 className="text-gradient">Employer Branding at BCA</h1>
              <p className="mt-2 text-white text-xs lg:text-sm text-justify px-4 text-left mx-5 lg:mx-10 pb-10 md:pb-0">
              Terima kasih banyak, temen-temen SxC. Jujur kolaborasi bareng kalian adalah pengalaman yang berkesan dan menyenangkan banget juga buat aku. Kalian antusias dan koordinasinya juga lancar. Senang juga bisa kenal kalian semuaa anak- anak baik yang passionate dan berambisi.
              </p>
              </div>
            </div>
          </div>
        </div>
      

      </section>

      {/* New Section : Ambassador */}
      <section className="bg-primary-4 py-10 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center text-white">
          <h2 className="text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gradient mx-4 sm:mx-8 md:mx-2">
            Ambassadors
          </h2>
          <div className="carousel carousel-end w-full h-72">
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={m_rizki} alt="M. Rizki" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                <img src={najwa} alt="Najwa" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                <img src={lucas} alt="Lucas" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={syifa} alt="Syifa" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                <img src={vania} alt="Vania" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                <img src={bilgis} alt="Bilgis" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                <img src={rezita} alt="Rezita" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                <img src={talita} alt="Talita" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                <img src={alifya} alt="Alifya" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                <img src={denisha} alt="Denisha" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                <img src={enta} alt="Enta" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={gracia} alt="Gracia" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={m_alvin} alt="M. Alvin" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={rahma} alt="Rahma" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={ratu} alt="Ratu" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={veronica} alt="Veronica" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={yumna} alt="Yumna" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={ajeng} alt="Ajeng" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={deva} alt="Deva" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={dhabi} alt="Dhabi" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={dinda} alt="Dinda" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={estu} alt="Estu" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={fahrul} alt="Fahrul" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={shabrina} alt="Shabrina" className="object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={varencia} alt="Varencia" className="w-full h-full object-contain"/>
              </div>
              <div className="carousel-item max-w-80 max-h-full">
                  <img src={yossi} alt="Yossi" className="w-full h-full object-contain"/>
              </div>
          </div>
          

        {/* Our Sponsors and Media Partners */}
        <div className="hidden container mx-auto px-4 sm:px-6 md:px-12 text-center text-white">
          <h2 className="text-2xl my-5 sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gradient mx-4 sm:mx-8 md:mx-2">
            Our Sponsors and Media Partners
          </h2>
          </div>
        </div>
      </section>

      {/* New Section : We Are Still Calling for Sponsor */}
      <section className="bg-primary-1 py-16 text-white">
      <div className="container mx-auto text-center">
        <h1 className="text-gradient text-3xl">
          We are still calling for Sponsors and Media Partners!
        </h1>
      </div>

      {/* Corporate Partnership Section */}
      <div className="flex flex-col md:flex-row py-16">
        <div className="md:w-1/2"
        style={{
          backgroundImage: `url(${corporate})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        >
        </div>
        <div className="md:w-3/4 px-12 py-16 md:px-16 md:py-8 bg-gray-200 bg-opacity-10">
          <h1 className="text-4xl text-primary-3">Corporate Partnership</h1>
          <p className="py-6 text-justify">
          Looking for a way to create a lasting impact and exposure to the next generation? Establish a partnership with us and support our mission to empower future leaders and innovators in the digital economy. We’d love to explore how we can collaborate to achieve this shared vision. Together, let's elevate the future leaders!
          </p>
          <a href={CORPORATE_PARTNERSHIP_CONTACT}
          className="bg-primary-3 px-3 py-2 rounded-lg text-primary-4 font-semibold"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Media Partner Section */}
      <div className="flex flex-row-reverse">
      <div className="md:w-1/2"
        style={{
          backgroundImage: `url(${medpar})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        >
        </div>
        <div className="md:w-3/4 px-12 py-16 md:px-16 md:py-8 bg-gray-200 bg-opacity-10">
          <h1 className="text-4xl text-primary-3">Media Partnership</h1>
          <p className="py-6">
          Is your platform dedicated to spotlighting education and development for the youth? Establish a partnership with us and let's nurture the next wave of global leaders in the digital economy. We’d love to discuss how we can work together to amplify this mission. Let’s join forces to broadcast the future with the SxC International Summit 2024!
          </p>
          <a href={MEDIA_PARTNERSHIP_CONTACT}
          className="bg-primary-3 px-3 py-2 rounded-lg text-primary-4 font-semibold"
          >
            Contact Us
          </a>
        </div>
      </div>

      </section>
      
      <Footer/>
    </div>
  );
}
