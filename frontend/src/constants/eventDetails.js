import {
  FCEO_REGIST,
  BMC_REGIST,
  IBCC_REGIST,
  IBPC_REGIST,
  CHAMBERS_REGIST,
  COMPVIS_REGISTRATION,
  INTERSUMMIT_REGISTRATION
} from "./routes";

const imgLocation = "/images/programs/";

export const eventDetails = {
  event_1: {
    title: "Business Master Class",
    image: imgLocation + "bmc.png",
    openRegistration: true,
    linkBooklet: "https://bit.ly/GuidebookBusineesMasterClass",
    description:
      "The StudentsxCEOs International Summit Business Master Class is a <strong>one-hit competition free class</strong> specifically designed for 300 high school and college students who are eager to <strong>excel in business case and business plan competitions.</strong>" +
      "With its <strong>interactive masterclass with expert-led materials presentation , and practical experience, and networking opportunities</strong>  to equip students with the knowledge, skills, and strategies needed to excel in business competitions. This event series will be having further discussion on " +
      "<strong>“Elevate to Success: Mastering in Business Competition” as the grand theme.</strong>" +
      "</br></br><strong>Consists of two classes</strong>" +
      "</br></br>&emsp;<strong>1.&emsp;Business Plan Competition Class</strong>" +
      "</br>This session will specifically cover Business Plan Competition with <strong>two experienced speakers</strong>. There will be <strong>two different materials</strong>, with <strong>each speaker presenting one</strong>. At the end of the presentations, we will have <strong>a practical experience</strong> for business plan competition" +
      "</br></br>&emsp;<strong>2.&emsp;Business Case Competition Class</strong>" +
      "</br>This session will specifically cover Business Class Competition with <strong>two experienced speakers</strong>. There will be <strong>two different materials</strong>, with <strong>each speaker presenting one</strong>. At the end of the presentations, we will have <strong>a practical experience</strong> for business case competition" +
      "</br></br>" +
      "<strong>What You Will Get</strong>" +
      "</br>&emsp;1.&emsp;Insightful <strong>Competition Materials</strong>" +
      "</br>&emsp;2.&emsp;Practical experience with <strong>Hands-On Study Case</strong>" +
      "</br>&emsp;3.&emsp;<strong>Networking</strong> with <strong>High-Achieving Peers</strong>",
    timelineDesc: "",
    registerLink: `${BMC_REGIST}`,
    faq: [
      "What kind of business lessons will we learn in the Business Master Class?",
      "When will the Business Master Class be held?",
      "What are the benefits of joining a Business Master Class?",
    ],
    faqDesc: [
      "Participants will learn strategies to excel in business competitions and gain practical insights into mastering analysis and problem-solving in business case competitions.",
      "The Business Master Class will be held online on Saturday, September 21, 2024.",
      "Participants will gain valuable insights into business competitions from top-achieving speakers and acquire practical experience by solving case studies.",
    ],
    contactPerson: ["Kezia", "Naufal"],
    contactLink: [
      "https://wa.me/6281289550200",
      "https://wa.me/62895321468029",
    ],
    contactNumber: ["+6281289550200", "+62895321468029"],
    timelineData: [
      {
        title: "Open Registration",
        date: "1 - 18 September 2024 ",
        type: "register", // field type ini cmn buat conditional rendering mau ada button register atau ngga, bisa diisi asal / ga diisi
        link: `${BMC_REGIST}`,
      },
      {
        title: "D-Day",
        date: "21 September 2024",
        type: "meeting",
      },
    ],
  },

  comp_1: {
    title: "Future CEO",
    image: imgLocation + "fceo.png",
    openRegistration: true,
    linkBooklet:
      "https://drive.google.com/file/d/1Pbhq9gaN-Guztj4c866fWb3u9IY_UecN/view?usp=sharing",
    description:
      "<strong>Future CEO</strong> is <strong>a prestigious business plan competition</strong> exclusively <strong>for high school students</strong>, to showcase their entrepreneurial skills and business acumen with the grand theme <strong>“Shaping Future Pioneers: Embracing Strategic Innovation in Sustainable Digital Era”</strong>. Students are <strong>challenged to present their innovative business idea</strong> that can solve the problems around them." +
      "</br></br>" +
      "<strong>When</strong></br>" +
      "19 August - 1 December 2024" +
      "</br></br>" +
      "<strong>Consists of 3 Stages</strong>" +
      "</br><strong>&emsp;1.&emsp;Preliminary</strong>" +
      "</br>&emsp;&emsp;&emsp;Business Model Canvas Submission" +
      "</br>&emsp;&emsp;&emsp;20 August - 7 October 2024" +
      "</br><strong>&emsp;2.&emsp;Semifinal</strong>" +
      "</br>&emsp;&emsp;&emsp;Proposal Submission" +
      "</br>&emsp;&emsp;&emsp;14 October - 27 October 2024" +
      "</br><strong>&emsp;3.&emsp;Final</strong>" +
      "</br>&emsp;&emsp;&emsp;Deck Submission" +
      "</br>&emsp;&emsp;&emsp;8 November - 23 November 2024" +
      "</br>&emsp;&emsp;&emsp;Pitching Day" +
      "</br>&emsp;&emsp;&emsp;24 November 2024" +
      "</br></br>" +
      "<strong>What You Will Get</strong>" +
      "</br></br><strong>&emsp;&emsp;1.&emsp;Coaching Clinic 1</strong>" +
      "</br>&emsp;&emsp;<strong>Coaching Clinic 1</strong> is designed to equip <strong>aspiring high school entrepreneurs</strong> who have successfully <strong>qualified as Semi-Finalists</strong> with the skills needed to <strong>craft impactful business proposals</strong>. This session will cover the <strong>fundamentals of proposal writing</strong>, focusing on structure, content, and an in-depth review of each component. The program will place further emphasis on <strong>“Proposal Mastery: Crafting Sustainable and Impactful Business Plans“</strong>, including an in-depth description of key sections of the proposal (such as Marketing, Finance, and Operations) as well as <strong>tips and tricks for creating effective proposals</strong>." +
      "</br></br><strong>&emsp;&emsp;2.&emsp;Coaching Clinic 2</strong>" +
      "</br>&emsp;&emsp;<strong>Coaching Clinic 2</strong> is designed to empower <strong>aspiring high school entrepreneurs</strong> who have successfully <strong> qualified as Finalists</strong> with the skills to <strong> transform their innovative ideas into narratives</strong> that resonate with audiences. This session focuses on <strong>the art of pitching to create memorable and persuasive presentations</strong>. The program will focus on <strong>“Ignite Your Pitch: Turning Ideas into Powerful Hear Stories“</strong>, including an <strong>in-depth review of pitching techniques, guidance on creating outstanding decks,</strong> and <strong>tips and tricks for effective pitching.</strong>",
    timelineDesc: "",
    registerLink: `${FCEO_REGIST}`,
    //registerLink: `https://docs.google.com/forms/d/e/1FAIpQLScR5tita2B13cscxuF0QmN2kBfH2r1N28La8Pdgx3l2xu6zYA/viewform`,
    faq: [
      "Will this event be held online or offline?",
      "What topics are contested?",
      "Do all participants in a team have to be from the same school?",
    ],
    faqDesc: [
      "This event will be held fully online.",
      "There are 5 topics that will be competed, namely food and beverage, tourism and local culture, education, environment, and health.",
      "No, participants in a team are not required to be in the same school. The important thing is that they are still registered as high school students.",
    ],
    contactPerson: ["Primel", "Ell"],
    contactNumber: ["085156458584", "082258574505"],
    contactLink: ["https://wa.me/6285156458584", "https://wa.me/622258574505"],
    timelineData: [
      {
        title: "Open Registration",
        date: "20 August - 7 October 2024",
        type: "register",
        link: `${FCEO_REGIST}`,
      },
      {
        title: "Semifinalist Announcement",
        date: "14 October 2024",
        type: "meeting",
      },
      {
        title: "Finalist Announcement",
        date: "8 November 2024",
        type: "meeting",
      },
      {
        title: "Pitching Day",
        date: "24 November 2024",
        type: "submit",
      },
    ],
  },
  comp_2: {
    title: "SxC International Business Challenge: Business Case Competition",
    image: imgLocation + "ibc-bcc.png",
    openRegistration: true,
    linkBooklet: "https://bit.ly/SxCIBCC2024Booklet",
    description:
      "<strong>The SxC International Business Case Competition</strong> is a global event designed to challenge students to apply their analytical and problem-solving skills to real-world business scenarios. <strong>Each team will analyze complex case studies</strong> of business problems and develop strategic solutions. To ensure participants are well-prepared, there are <strong>2 coaching clinic sessions</strong> led by experienced mentors, guiding them through the <strong>Preliminary, Semi-Final, and Final stages.</strong>" +
      "</br></br>" +
      "<strong>When</strong></br>" +
      "9th September - 1st December 2024" +
      "</br></br>" +
      "<strong>Consists of 3 Stages</strong>" +
      "</br><strong>1.&emsp;Preliminary</strong>" +
      "</br>&emsp;&emsp;Case 1 Release: 13th October 2024" +
      "</br>&emsp;&emsp;Proposal Submission: 13th - 24th October 2024" +
      "</br>&emsp;&emsp;Scoring: 25th October - 4th November 2024" +
      "</br>&emsp;&emsp;Semi-Final Announcement: 5th November 2024" +
      "</br><strong>2.&emsp;Semifinal</strong>" +
      "</br>&emsp;&emsp;Submission: 5th - 18th November 2024" +
      "</br>&emsp;&emsp;Technical Meeting: 6th November 2024" +
      "</br>&emsp;&emsp;Coaching Clinic 1: 9th November 2024" +
      "</br>&emsp;&emsp;Scoring: 19th - 25th November 2024" +
      "</br>&emsp;&emsp;Finalist Announcement: 26th November 2024" +
      "</br><strong>3.&emsp;Final</strong>" +
      "</br>&emsp;&emsp;Technical Meeting: 27th November 2024" +
      "</br>&emsp;&emsp;Coaching Clinic 2: 28th November 2024" +
      "</br>&emsp;&emsp;Case Release for Finalist: 29th November 2024" +
      "</br>&emsp;&emsp;Deck Submission: 29th November 2024" +
      "</br>&emsp;&emsp;D-Day Final Pitch: 30th November 2024" +
      "</br>&emsp;&emsp;Winner Awarding: 1st December 2024" +
      "</br></br>" +
      "<strong>What You Will Get</strong>" +
      "</br></br><strong>&emsp;&emsp;1.&emsp;Coaching Clinic 1</strong>" +
      "</br>&emsp;&emsp;For Participants who have <strong>successfully advanced as semifinalists,</strong> This coaching session is designed to help participants <strong>develop a robust and strategic business proposal.</strong> The session will include a detailed presentation of essential materials and offer an interactive Q&A session, providing participants with the opportunity to clarify doubts and refine their proposal-building skills. The program will place further emphasis on <strong>“Creating a Compelling Pitch Deck: Strategies and Practical Tips.“</strong> The insights shared in this clinic will be instrumental in laying the foundation for a successful business proposal and setting the stage for the upcoming competition." +
      "</br></br><strong>&emsp;&emsp;2.&emsp;Coaching Clinic 2</strong>" +
      "</br>&emsp;&emsp;For participants who have<strong>successfully advanced through the final stage,</strong> This coaching clinic will focus on perfecting the art of pitching ideas to captivate judges and make a lasting impression. <strong>Participants will receive personalized mentoring in a group setting, where each team will be paired with a mentor.</strong>  The session will also include a review of participants' pitches, providing valuable feedback and tips for enhancement. This clinic is designed and will focus on <strong>“Mastering Case Solutions: Expert Time Management and Analytical Techniques“</strong> to help participants refine their delivery and content, ensuring they present their ideas with clarity and impact during the competition." +
      "</br></br><strong>&emsp;&emsp;3.&emsp;Networking Opportunities</strong>",
    timelineDesc:
      "Timeline details for SxC International Business Challenge: Business Case Competition",
    registerLink: `${IBCC_REGIST}`,
    //registerLink: `https://bit.ly/SxCIBCCRegistrationForm`,
    // faq: ["-"],
    // faq: ["How many and what is the format and structure of each stage?",
    //   "How and where do we register for the competition?",
    //   "Where is the venue or platform for the competition?"],
    // faqDesc: [""],
    // faqDesc: ["The competition has three stages. In the Preliminary Round, participants submit a proposal outlining their solution to the given case. In the Semifinal Round, they create a pitch deck based on their proposal and deliver a brief rocket pitch. The Final Round involves solving a new case within one day, creating a pitch deck, and presenting it the next day, testing their ability to deliver a well-structured solution under time pressure.",
    //   "Participants may register from our website www.something.com . The registration is open from 2nd September 2024 to 5th October 2024. Participants can register individually or in groups of maximum 3 people.",
    //   "The competition will be held online for the preliminary and semi final stages. The final stage will take place at a venue that will be announced soon."],
    contactPerson: ["Salsabila"],
    contactNumber: ["(+62) 85814703305"],
    contactLink: [],
    timelineData: [
      {
        title: "Open Registration",
        date: "9th September - 24th October 2024",
        type: "submit",
      },
      {
        title: "Preliminary Stages",
        date: "13th October - 5th November 2024",
        type: "register",
        link: ``,
      },
      {
        title: "Semi-Finalist Stages",
        date: "5th - 26th November 2024",
        type: "meeting",
      },
      {
        title: "Final Stages",
        date: "27th November - 1st December 2024",
        type: "progress",
      },
    ],
  },
  comp_3: {
    title: "SxC International Business Challenge: Business Plan Competition",
    image: imgLocation + "ibc-bpc.png",
    openRegistration: true,
    linkBooklet: "https://bit.ly/SxCIBPC2024Booklet",
    description:
      "<strong>The SxC International Business Plan Competition</strong> is a global event designed to foster entrepreneurial skills and innovation among students. <strong>Participants are encouraged to present their innovative business models,</strong> turning them into viable businesses. To ensure participants are well-prepared, there are <strong>2 coaching clinic sessions</strong> led by experienced mentors, guiding them through the <strong>Preliminary, Semi-Final, and Final stages.</strong>" +
      "</br></br>" +
      "<strong>When</strong></br>" +
      "9th September - 1st December 2024" +
      "</br></br>" +
      "<strong>Consists of 3 Stages</strong>" +
      "</br><strong>1.&emsp;Preliminary</strong>" +
      "</br>&emsp;&emsp;BMC+Executive Summary Submission" +
      "</br>&emsp;&emsp;Submission: 9th September - 22nd October 2024" +
      "</br>&emsp;&emsp;Scoring Phase: 23rd October - 3rd November 2024" +
      "</br>&emsp;&emsp;Semi-Finalist Announcement: 4th November 2024" +
      "</br><strong>2.&emsp;Semifinal</strong>" +
      "</br>&emsp;&emsp;Proposal Submission" +
      "</br>&emsp;&emsp;Submission Phase: 5th -14th November 2024" +
      "</br>&emsp;&emsp;Coaching Clinic 1: 9th November 2024" +
      "</br>&emsp;&emsp;Scoring Phase: 15th - 23rd November 2024" +
      "</br>&emsp;&emsp;Finalist Announcement: 24th November 2024" +
      "</br><strong>3.&emsp;Final</strong>" +
      "</br>&emsp;&emsp;Pitching Deck Submission & Offline Pitching" +
      "</br>&emsp;&emsp;Submission Phase: 24th - 30nd November 2024" +
      "</br>&emsp;&emsp;Technical Meeting: 25th November 2024" +
      "</br>&emsp;&emsp;Coaching Clinic 2: 28th November 2024" +
      "</br>&emsp;&emsp;Final Pitch: 30rd November 2024" +
      "</br>&emsp;&emsp;Winner Awarding: 1st December 2024" +
      "</br></br>" +
      "<strong>What You Will Get</strong>" +
      "</br></br><strong>&emsp;&emsp;1.&emsp;Coaching Clinic 1</strong>" +
      "</br>&emsp;&emsp;For Participants who have <strong>successfully advanced as semifinalists,</strong> This coaching session is designed to help participants <strong>develop a robust and strategic business proposal.</strong> The session will include a detailed presentation of essential materials and offer an interactive Q&A session, providing participants with the opportunity to clarify doubts and refine their proposal-building skills. The insights shared in this clinic will be instrumental in laying the foundation for a successful business proposal and setting the stage for the upcoming competition." +
      "</br></br><strong>&emsp;&emsp;2.&emsp;Coaching Clinic 2</strong>" +
      "</br>&emsp;&emsp;For participants who have<strong>successfully advanced through the final stage,</strong> This coaching clinic will focus on perfecting the art of pitching ideas to captivate judges and make a lasting impression. <strong>Participants will receive personalized mentoring in a group setting, where each team will be paired with a mentor.</strong>  The session will also include a review of participants' pitches, providing valuable feedback and tips for enhancement. This clinic is designed to help participants refine their delivery and content, ensuring they present their ideas with clarity and impact during the competition." +
      "</br></br><strong>&emsp;&emsp;3.&emsp;Scholarships Opportunities</strong>" +
      "</br></br><strong>&emsp;&emsp;4.&emsp;International Networking</strong>" +
      "</br></br><strong>&emsp;&emsp;5.&emsp;Funding Opportunities</strong>",
    timelineDesc:
      "Timeline details for SxC International Business Challenge: Business Plan Competition",
    registerLink: `${IBPC_REGIST}`,
    //registerLink: `https://bit.ly/SxCIBPCRegistrationForm`,
    // faq: ["Who can participate, and what are the eligibility criteria?",
    //   "How many stages does this business plan competition have?",
    //   "Is there any specific criteria/requirement regarding the business ideas?",
    //   "Will the competition be held offline or online?"],
    // faqDesc: ["Participants are an active undergraduate students/vocational students from all around the world with one team consist of maximum 3 people who can come from different institution.",
    //   "The competition will consist of three stages: the first stage involves the submission of a business model canvas and executive summary, the second stage requires a detailed business proposal, and the final stage includes a pitch deck assessment followed by an offline pitching event at a venue to be announced.",
    //   "There are no prerequisites regarding the business ideas; the competition welcomes business plans from diverse industries. The key to success in our competition is to simply demonstrate creativity, innovation, and a commitment to sustainable business practices.",
    //   "The competition will be held online for the preliminary and semi final stages. The final stage will take place offline at a venue that will be announced soon."],
    contactPerson: ["Aisha Inaya"],
    contactNumber: ["(+62) 81288480732"],
    contactLink: [],
    timelineData: [
      {
        title: "Open Registration",
        date: "9th September - 28th October 2024",
        type: "submit",
      },
      {
        title: "Preliminary Stage",
        date: "9th September - 4th November 2024",
        type: "register",
        link: ``,
      },
      {
        title: "Semi-Final Stage",
        date: "5th - 24th November 2024",
        type: "meeting",
      },
      {
        title: "Final Stage",
        date: "24th November - 1st December 2024",
        type: "progress",
      },
      // {
      //   title: "",
      //   date: "",
      //   type: "submit",
      // },
    ],
  },
  event_5: {
    title: "Chambers",
    image: imgLocation + "chambers.png",
    openRegistration: true,
    registerLink: `${CHAMBERS_REGIST}`,
    //registerLink: `https://docs.google.com/forms/d/e/1FAIpQLSdIGGuMZzQiJaU0nIz16ixVLLSXJ2M23bcjP9Eiew3O0TefYw/viewform`,
    description:
      "<strong>Chambers</strong> is an <strong>international webinar</strong> that promises to deliver <strong>captivating insights and experiences in the professional world.</strong> Centered around the theme <strong>“Innovative Career Paths: Beyond User-Centricity to Strategic Brilliance,“</strong> this event features distinguished speakers from leading companies. Over the webinar of <strong>two days, participants will explore four dynamic industries: Start-Up, FMCG, BUMN, and Consulting.</strong> Join us for this unique <strong>opportunity to enhance your career</strong> trejectory, <strong>gain valuable knowledge, and connect with industry experts</strong> who can help shape your <strong>professional journey.</strong>" +
      "</br></br>" +
      "<strong>When</strong></br>" +
      "26th - 27th October 2024" +
      "</br></br>" +
      "<strong>4 Industries:</strong>" +
      "</br><strong>1.&emsp;Start Up</strong>" +
      "</br>&emsp;&emsp;Gaining insight into building a career at a startup involves understanding the high growth potential and risk-taking nature. A fast-paced, collaborative culture encourages innovation and requires skills such as creative thinking and problem solving." +
      "</br><strong>2.&emsp;FMCG</strong>" +
      "</br>&emsp;&emsp;As the FMCG industry evolves, professionals must transition from user-centric roles to strategic leadership. This program offers valuable insights into navigating market dynamics and understanding consumer behavior while implementing effective strategic planning. Participants will learn to leverage data-driven decision-making and foster innovation, highlighting the importance of confident team leadership." +
      "</br><strong>3.&emsp;BUMN</strong>" +
      "</br>&emsp;&emsp;Explore the importance of understanding BUMN's mission, setting clear career objectives, and aligning personal ambitions with organizational strategies. Participants will learn practical techniques to overcome alignment challenges, utilize data-driven decision-making, and foster innovation and leadership within BUMN." +
      "</br><strong>4.&emsp;Consulting</strong>" +
      "</br>&emsp;&emsp;Gain valuable insights from some of the world's leading companies through training  webinars and hands-on projects. Many top consulting firms offer access to industry leaders and experts, providing opportunities to learn from real-world experiences.. This is a golden opportunity to grow and gain a deep understanding of the rapidly changing market dynamics." +
      "</br></br>" +
      "<strong>What Will You Get</strong></br>" +
      "</br></br><strong>&emsp;&emsp;1.&emsp;Virtual Job Fair</strong>" +
      "</br>&emsp;&emsp;The Virtual Job Fair is a key event that brings together students and professionals from around the world on an innovative virtual platform. This event aims to open job opportunities, build networks, and facilitate dialogue between enthusiastic young individuals and experienced industry leaders. It features major companies that will provide job opportunities for you in the future." +
      "</br></br><strong>&emsp;&emsp;2.&emsp;1 on 3 Season (Lucky Participant)</strong>" +
      "</br>&emsp;&emsp;1 on 3 Season is an engaging session where professionals gather to discuss and explore important topics. In this interactive setting, you'll have the chance to exchange ideas, share experiences, and gain valuable insights from industry experts. This session is designed to foster collaboration and innovation, allowing each participant to expand their knowledge and network." +
      "</br></br><strong>&emsp;&emsp;3.&emsp;CV Review (Lucky Participant)</strong>" +
      "</br>&emsp;&emsp;CV Review is a golden opportunity where you receive direct feedback from seasoned professionals in your field. In this session, you can discuss and analyze your CV in-depth, gaining insights that will enhance its appeal and effectiveness. With expert guidance, you'll learn how to highlight your skills and experiences, significantly increasing your chances of catching a recruiter’s attention." +
      "</br></br><strong>&emsp;&emsp;4.&emsp;Mock Up Interview (Lucky Participant)</strong>" +
      "</br>&emsp;&emsp;Mock Up Interview is an exciting opportunity where you can engage in simulated interviews guided by experienced professionals in your field. In this supportive environment, you'll practice your interviewing skills, receive constructive feedback, and learn effective techniques to present yourself confidently. This hands-on experience not only helps you refine your responses but also boosts your self-assurance, preparing you to tackle real interviews with ease." +
      "</br></br><strong>&emsp;&emsp;5.&emsp;Case Study Analysis (Lucky Participant)</strong>" +
      "</br>&emsp;&emsp;Case Study Analysis offers an exhilarating chance to dive deep into real-world business challenges, evaluated by seasoned professionals from leading companies. In this engaging session, you'll analyze complex scenarios, brainstorm innovative solutions, and present your findings, all while receiving invaluable feedback from industry experts. This hands-on experience not only sharpens your analytical and problem-solving skills but also provides insight into the decision-making processes of successful organizations. " +
      "</br></br><strong>&emsp;&emsp;6.&emsp;E-Certificate</strong>" +
      "</br></br><strong>&emsp;&emsp;7.&emsp;Networking with expert from top company</strong>",
    timelineDesc: "Timeline details for Chambers",
    faq: [
      "What is Chambers?",
      "Who can join Chambers?",
      "What are the benefits of joining Chambers?",
    ],
    faqDesc: [
      "The two-day expert talk show will provide valuable insights for career preparation across consulting, start-ups, FMCG, and BUMN industries while featuring unique sessions to enhance participants’ career readiness.",
      "Open for university students and fresh graduates.",
      "Valuable career insights, industry exposure, job opportunities, and personal growth with an exclusive opportunity to receive direct feedback and guidance from experts.",
    ],
    contactPerson: ["Audrey Putri"],
    contactNumber: ["085817600632"],
    contactLink: [],
    timelineData: [
      {
        title: "Start Up & FMCG",
        date: "26 October 2024",
        type: "register",
        link: ``,
      },
      {
        title: "Consulting & BUMN",
        date: "27 October 2024",
        type: "meeting",
      },
    ],
  },
  event_6: {
    title: "Company Visit",
    image: imgLocation + "comvis.png",
    openRegistration: true,
    description:
      "Company visit is <strong>an organized event to learn about a company's operations, culture, and career paths</strong> that includes <strong>office tours, discussions on work environments, and recruitment tips.</strong> The goal is to provide first-hand experience and networking opportunities to gain a deeper understanding of the industry and potential career paths."+
      "</br></br>" +
      "<strong>When and Where</strong></br>" +
      "<strong>OFFLINE</strong>" +
      "</br>1.&emsp;Bosch: Thursday, November 7th 2024" +
      "</br>&emsp;&emsp;10.00 - 13.30" +
      "</br>&emsp;&emsp;Arkadia Green Park - Tower G / Floor: 7, Jl. TB Simatupang No.88, Kebagusan, Ps. Minggu, Daerah Khusus Ibukota Jakarta 12520" +
      "</br>2.&emsp;BCA: Friday, November 15th 2024" +
      "</br>&emsp;&emsp;14.00 - 16.30" +
      "</br>&emsp;&emsp;Menara BCA Grand Indonesia, Jl. M.H. Thamrin No.1, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310" +
      "</br>3.&emsp;KPMG: Monday, November 18th 2024" +
      "</br>&emsp;&emsp;09.00 - 13.30" +
      "</br>&emsp;&emsp;Menara Astra, Jl. Jenderal Sudirman No.5-6 Lt 21, Karet Tengsin, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10220" +
      "</br>4.&emsp;Shopee: Friday, November 29th 2024" +
      "</br>&emsp;&emsp;09.30 - 11.45" +
      "</br>&emsp;&emsp;Gama Tower 8F, Jl. H. R. Rasuna Said No. 2, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12940" +
      "</br></br>" +
      "</br><strong>Participant Requirements:</strong>" +
      "</br>&emsp;&emsp;- <strong>Minimum Required Semester for Bosch</strong>: Final year students <strong>(above 5th semester).</strong>" +
      "</br>&emsp;&emsp;- <strong>Minimum Required Semester for BCA</strong>: Final year students <strong>(minimum 6th or 7th semester).</strong>" +
      "</br>&emsp;&emsp;- Registrants can only choose <strong>one company.</strong>" +
      "</br>&emsp;&emsp;- All participants are required to like, comment, and tag five people, as well as share the SxC Intersummit 2024 Company Visit poster on their Instagram story." +
      "</br></br>"+
      "<strong>What Will You Get from Offline Company Visit</strong></br>" +
      "&emsp;&emsp;- Insight into Career Pathways: Discover various career paths and opportunities within key industries such as banking, consulting, FMCG, and startups." +
      "</br>&emsp;&emsp;- Networking Opportunities: Connect directly with professionals and industry leaders, building valuable relationships that could benefit your future career." +
      "</br>&emsp;&emsp;- Knowledge of Current Industry Trends: Learn about the latest trends, technologies, and innovations shaping the industries you are interested in." +
      "</br>&emsp;&emsp;- Office Tour: Experience a guided tour of the company’s facilities, providing a real-world view of the work environment, culture, and operational practices." +
      "</br>&emsp;&emsp;- Mini Case Study Experience: Participate in a case study workshop where you can apply theoretical knowledge to real-life business challenges, enhancing your problem-solving and analytical skills." +
      "</br>&emsp;&emsp;- Networking Lunch: Enjoy a networking lunch with industry professionals, allowing for informal discussions and the chance to forge connections in a relaxed setting." +
      "</br>&emsp;&emsp;- Exclusive Behind-the-Scenes Access: Gain unique insights into company processes, strategies, and cultures that are not typically available to the public." +
      "</br>&emsp;&emsp;- Practical Understanding of Industry Practices: Observe firsthand how leading companies operate and implement best practices within their industries." +
      "</br></br>" +

      "<strong>ONLINE</strong>" +
      "</br>1.&emsp;FMCG Industry" +
      "</br>&emsp;&emsp;November 10th 2024" +
      "</br>&emsp;&emsp;Online Zoom Conference" +
      "</br>2.&emsp;Second Company TBA" +

      "</br><strong>Participant Requirements:</strong>" +
      "</br>&emsp;&emsp;Participants are required to like, comment, and tag five people, as well as share the SxC Intersummit 2024 Company Visit poster on their Instagram story." +
      "</br></br>" +
      "<strong>What Will You Get</strong></br>" +
      "&emsp;&emsp;- Insight into Career Pathways: Understand potential career paths and opportunities within various industries such as banking, consulting, FMCG, and startups." +
      "</br>&emsp;&emsp;- Networking Opportunities: Connect with professionals and industry leaders to build valuable relationships for future career opportunities." +
      "</br>&emsp;&emsp;- Knowledge of Current Industry Trends: Learn about the latest trends, technologies, and innovations driving the industries." +
      "</br>&emsp;&emsp;- Exposure to Real-World Industry Practices: Gain firsthand experience of the work environment and operational practices in leading industries." +
      "</br>&emsp;&emsp;- Exclusive Behind-the-Scenes Access: Gain a unique perspective on company culture, processes, and strategies not usually available to the public." +
      "</br>&emsp;&emsp;- CV Review: Receive personalised feedback on your CV from experienced professionals to help improve your job application success." +
      "</br>&emsp;&emsp;- Division Sharing Session: Participate in a session where different divisions share their insights, offering a deeper understanding of various roles within the company.",
    timelineDesc: "Timeline details for Company Visit",
    registerLink: `${COMPVIS_REGISTRATION}`,
    //registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSc_C3G8OFLFpq-fvjNM8YjcXKbbQcY0VYXiNRWXnVqnqsq8PA/viewform",
    faq: [
      "How many offline and online company visits will be held later ?",
      "What activities will be carried out on the offline company visit ?",
      "When will the company visit activity be held ?",
    ],
    faqDesc: [
      "2 company visits offline and 2 company visits online",
      "Workshop or sharing session about the company, work culture, internship opportunities and many more",
      "First week of november",
    ],
    contactPerson: ["Caryn Joy Angel (Offline Company Visit)", "Kiemas Arryasa (Online Company Visit)"],
    contactNumber: ["+6282177707575", "+6281289413552"],
    contactLink: [],
    timelineData: [
      {
        title: "Bosch",
        date: "Thursday, November 7th 2024",
        type: "register",
        link: ``,
      },
      {
        title: "BCA",
        date: "Friday, November 15th 2024",
        type: "meeting",
      },
      // {
      //   title: "Project Progress",
      //   date: "TBA",
      //   type: "progress",
      // },
      // {
      //   title: "Submit Project",
      //   date: "TBA",
      //   type: "submit",
      // },
    ],
  },
  event_7: {
    title: "The International Summit",
    image: imgLocation + "summit.png",
    openRegistration: true, //change this
    description:
      "The StudentsxCEOs International Summit is <strong>the peak event</strong> offering individuals <strong>present their perspectives on current economic trends and engage with leading economists and industry experts.</strong> This summit offers a platform for students to connect with leading economists and industry leaders." + 
      "</br></br>" +
      "The grand theme for this summit is <strong>“Pioneering Leadership in the Digital Economy: Strategies for Innovation and Growth from Industry Leaders' Perspective”.</strong> Participants will explore key insights and practical approaches to drive innovation and leadership in today’s fast-evolving digital economy." + 
      "</br></br>" +
      "<strong>The international summit consist of</strong>" +
      "</br></br><strong>&emsp;&emsp;1.&emsp;Prompt Presentation Session</strong>" +
      "</br>&emsp;&emsp;<strong>Session Title: “Strategic Growth in the Digital Age: Lessons from Industry Leaders”.</strong> </br>International speaker will present practical strategies to address the challenges of the digital economy. The session includes real-world examples of successful digital transformations and essential steps for effective leadership." +
      "</br></br><strong>&emsp;&emsp;2.&emsp;Panel Discussion Session</strong>" +
      "</br>&emsp;&emsp;<strong>Session Title: “Digital Leadership: Driving Innovation in the Modern Economy”.</strong></br>This panel will feature two national speakers who will dive into the crucial role of leadership in fostering innovation and leveraging technology for business growth. The session will end with a Q&A where participants can engage with the speakers on stage." +
      "</br></br><strong>&emsp;&emsp;3.&emsp;Career & Job Fair</strong>" +
      "</br>&emsp;&emsp;Participants will have <strong>access to numerous career opportunities,</strong> interact with company representatives at booths, explore potential job openings, and receive valuable career advice." +
      "</br></br><strong>&emsp;&emsp;4.&emsp;Best Participants & Competition Awarding</strong>" +
      "</br>&emsp;&emsp;Recognition of <strong>the most active participants and the announcement of the International Business Competition winners</strong> during a special awards ceremony." +
      "</br></br><strong>&emsp;&emsp;5.&emsp;Guest Star Performance</strong>" +
      "</br>&emsp;&emsp;Enjoy <strong>a closing performance by recognized  bands,</strong>  offering an exciting end to the summit." +
      "</br></br>" +

      "<strong>When and Where</strong></br>" +
      "Date : Sunday, 1st December 2024" +
      "</br>" +
      "Time : 10.00 AM - 03.15 PM" +
      "</br>" +
      "</br>" +
      "<strong>What Will You Get</strong>" +
      "</br>&emsp;&emsp;- Enhanced <strong>skills and knowledge</strong> in the digital economy" +
      "</br>&emsp;&emsp;- Expert perspectives from industry leaders in <strong>top multinational company</strong> during sessions" +
      "</br>&emsp;&emsp;- Interactive learning through discussions and Q&A" +
      "</br>&emsp;&emsp;- Emerging <strong>job opportunities</strong> at the career & job fair" +
      "</br>&emsp;&emsp;- <strong>Networking session</strong> with the top level speakers" +
      "</br>&emsp;&emsp;- E-Certificate for all participants" 
      ,
    timelineDesc: "Timeline details for Summit",
    registerLink: `${INTERSUMMIT_REGISTRATION}`,
    faq: [
      "Is the International Summit some kind of seminar event?",
      "When will the International Summit be held?",
      "What is the expected benefit of joining the summit?",
    ],
    faqDesc: [
      "The International Summit will be the pinnacle of our event series.This summit goes beyond a typical seminar; it features high-level conferences that present discussions on current economic trends and provide opportunities to engage with leading economists and industry experts. In addition to insightful dialogues, the summit will offer opportunities related to jobs and internships. It serves as a unique platform for everyone to connect directly with top economists and industry leaders",
      "The International Summit will be held offline in early December.",
      "Participants will gain a comprehensive understanding of current economic trends, benefit from the leading economists and industry experts, and access valuable networking opportunities. Also, the summit provides a chance to explore job and internship prospects, making it an essential event for anyone looking to advance their career and expand their professional network.",
    ],
    contactPerson: ["Secilia Deartha", "Angelika Delvia"],
    contactNumber: ["081385353064", "082114823962"],
    contactLink: [],
    timelineData: [
      {
        title: "D-Day",
        date: "1st December 2024",
        type: "register",
        link: `${INTERSUMMIT_REGISTRATION}`,
      },{
        title: "Place : Dinas Pendidikan Provinsi DKI Jakarta",
        date: "Address : Jl. Gatot Subroto No. Kav. 40-41, Kuningan"
      }
    ],
  },
};
