import { FCEO_REGIST, BMC_REGIST, IBCC_REGIST, IBPC_REGIST } from "./routes";

const imgLocation = "/images/programs/";

export const eventDetails = {
  event_1: {
    title: "Business Master Class",
    image: imgLocation + "bmc.png",
    openRegistration: true,
    linkBooklet: "https://bit.ly/GuidebookBusineesMasterClass",
    description: "The StudentsxCEOs International Summit Business Master Class is a <strong>one-hit competition free class</strong> specifically designed for 300 high school and college students who are eager to <strong>excel in business case and business plan competitions.</strong>" +
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
    faq: ["What kind of business lessons will we learn in the Business Master Class?", 
      "When will the Business Master Class be held?", 
      "What are the benefits of joining a Business Master Class?"],
    faqDesc: ["Participants will learn strategies to excel in business competitions and gain practical insights into mastering analysis and problem-solving in business case competitions.",
      "The Business Master Class will be held online on Saturday, September 21, 2024.", 
      "Participants will gain valuable insights into business competitions from top-achieving speakers and acquire practical experience by solving case studies."],
    contactPerson: [
      "Kezia", "Naufal"
    ],
    contactLink: [
      "https://wa.me/6281289550200", 
      "https://wa.me/62895321468029"
    ],
    contactNumber: [
      "+6281289550200", "+62895321468029",
    ],
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
    linkBooklet: "https://drive.google.com/file/d/1Pbhq9gaN-Guztj4c866fWb3u9IY_UecN/view?usp=sharing",
    description: "<strong>Future CEO</strong> is <strong>a prestigious business plan competition</strong> exclusively <strong>for high school students</strong>, to showcase their entrepreneurial skills and business acumen with the grand theme <strong>“Shaping Future Pioneers: Embracing Strategic Innovation in Sustainable Digital Era”</strong>. Students are <strong>challenged to present their innovative business idea</strong> that can solve the problems around them." +
    "</br></br>" +
    "<strong>When</strong></br>" +
    "19 August - 1 December 2024" +
    "</br></br>" +
    "<strong>Consists of 3 Stages</strong>" +
    "</br><strong>&emsp;1.&emsp;Preliminary</strong>" +
    "</br>&emsp;&emsp;&emsp;Business Model Canvas Submission" +
    "</br>&emsp;&emsp;&emsp;20 August - 22 September 2024" +
    "</br><strong>&emsp;2.&emsp;Semifinal</strong>" +
    "</br>&emsp;&emsp;&emsp;Proposal Submission" +
    "</br>&emsp;&emsp;&emsp;1 October - 22 October 2024" +
    "</br><strong>&emsp;3.&emsp;Final</strong>" +
    "</br>&emsp;&emsp;&emsp;Deck Submission" +
    "</br>&emsp;&emsp;&emsp;5 November - 23 November 2024" +
    "</br>&emsp;&emsp;&emsp;Pitching Day" +
    "</br>&emsp;&emsp;&emsp;24 November 2024" +
    "</br></br>" +
    "<strong>What You Will Get</strong>" +
    "</br></br><strong>&emsp;&emsp;1.&emsp;Coaching Clinic 1</strong>" +
    "</br>&emsp;&emsp;<strong>Coaching Clinic 1</strong> is designed to equip <strong>aspiring high school entrepreneurs</strong> who have successfully <strong>qualified as Semi-Finalists</strong> with the skills needed to <strong>craft impactful business proposals</strong>. This session will cover the <strong>fundamentals of proposal writing</strong>, focusing on structure, content, and an in-depth review of each component. The program will place further emphasis on <strong>“Proposal Mastery: Crafting Sustainable and Impactful Business Plans“</strong>, including an in-depth description of key sections of the proposal (such as Marketing, Finance, and Operations) as well as <strong>tips and tricks for creating effective proposals</strong>." +
    "</br></br><strong>&emsp;&emsp;2.&emsp;Coaching Clinic 2</strong>" +
    "</br>&emsp;&emsp;<strong>Coaching Clinic 2</strong> is designed to empower <strong>aspiring high school entrepreneurs</strong> who have successfully <strong> qualified as Finalists</strong> with the skills to <strong> transform their innovative ideas into narratives</strong> that resonate with audiences. This session focuses on <strong>the art of pitching to create memorable and persuasive presentations</strong>. The program will focus on <strong>“Ignite Your Pitch: Turning Ideas into Powerful Hear Stories“</strong>, including an <strong>in-depth review of pitching techniques, guidance on creating outstanding decks,</strong> and <strong>tips and tricks for effective pitching.</strong>"
    ,
    timelineDesc: "",
    registerLink: `${FCEO_REGIST}`,
    faq: ["Will this event be held online or offline?", 
      "What topics are contested?", 
      "Do all participants in a team have to be from the same school?"],
    faqDesc: ["This event will be held fully online.", 
      "There are 5 topics that will be competed, namely food and beverage, tourism and local culture, education, environment, and health.", 
      "No, participants in a team are not required to be in the same school. The important thing is that they are still registered as high school students."],
    contactPerson: ["Primel", "Ell"],
    contactNumber: ["085156458584", "082258574505"],
    contactLink: ["https://wa.me/6285156458584",
      "https://wa.me/622258574505"
    ],
    timelineData: [
      {
        title: "Open Registration",
        date: "20 August - 22 September 2024",
        type: "register",
        link: `${FCEO_REGIST}`,
      },
      {
        title: "Semifinalist Announcement",
        date: "20 September 2024",
        type: "meeting",
      },
      {
        title: "Finalist Announcement",
        date: "4 November 2024",
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
    "</br><strong>&emsp;1.&emsp;Preliminary</strong>" +
    "</br>&emsp;&emsp;&emsp;Case 1 Release: 13rd October 2024" +
    "</br>&emsp;&emsp;&emsp;Proposal Submission Phase: 13rd - 24th October 2024" +
    "</br>&emsp;&emsp;&emsp;Scoring Proposal Phase: 25th October - 4th November 2024" +
    "</br>&emsp;&emsp;&emsp;Semi-Finalist Announcement: 5th November 2024" +
    "</br><strong>&emsp;2.&emsp;Semifinal</strong>" +
    "</br>&emsp;&emsp;&emsp;Deck & Video Submission Phase: 5th - 18th November 2024" +
    "</br>&emsp;&emsp;&emsp;Technical Meeting: 6th November 2024" +
    "</br>&emsp;&emsp;&emsp;Coaching Clinic 1: 9th November 2024" +
    "</br>&emsp;&emsp;&emsp;Scoring Deck & Video Phase: 19th - 25th November 2024" +
    "</br>&emsp;&emsp;&emsp;Finalist Announcement: 26th November 2024" +
    "</br><strong>&emsp;3.&emsp;Final</strong>" +
    "</br>&emsp;&emsp;&emsp;Technical Meeting for Final Stage: 27th November 2024" +
    "</br>&emsp;&emsp;&emsp;Coaching Clinic 2: 28th November 2024" +
    "</br>&emsp;&emsp;&emsp;Case Release for Finalist: 29th November 2024" +
    "</br>&emsp;&emsp;&emsp;Deck Submission: 29th November 2024" +
    "</br>&emsp;&emsp;&emsp;D-Day Final Pitch: 30th November 2024" +
    "</br>&emsp;&emsp;&emsp;Winner Awarding: 1st December 2024" +
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
    faq: ["How many and what is the format and structure of each stage?", 
      "How and where do we register for the competition?", 
      "Where is the venue or platform for the competition?"],
    faq: ["How many and what is the format and structure of each stage?", 
      "How and where do we register for the competition?", 
      "Where is the venue or platform for the competition?"],
    faqDesc: ["The competition has three stages. In the Preliminary Round, participants submit a proposal outlining their solution to the given case. In the Semifinal Round, they create a pitch deck based on their proposal and deliver a brief rocket pitch. The Final Round involves solving a new case within one day, creating a pitch deck, and presenting it the next day, testing their ability to deliver a well-structured solution under time pressure.", 
      "Participants may register from our website www.something.com . The registration is open from 2nd September 2024 to 5th October 2024. Participants can register individually or in groups of maximum 3 people.", 
      "The competition will be held online for the preliminary and semi final stages. The final stage will take place at a venue that will be announced soon."],
    contactPerson: ["Salsabila"],
    contactNumber: ["(+62) 85814703305"],
    contactLink: [],
    timelineData: [
      {
        title: "Preliminary Stages",
        date: "13rd October - 5th November 2024",
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
      // {
      //   title: "Submit Project",
      //   date: "TBA",
      //   type: "submit",
      // },
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
    "</br><strong>&emsp;1.&emsp;Preliminary</strong>" +
    "</br>&emsp;&emsp;&emsp;BMC+Executive Summary Submission" +
    "</br>&emsp;&emsp;&emsp;Submission Phase: 9th September - 6th October 2024" +
    "</br>&emsp;&emsp;&emsp;Scoring Phase: 7th - 18th October 2024" +
    "</br>&emsp;&emsp;&emsp;Semi-Finalist Announcement: 19th October 2024" +
    "</br><strong>&emsp;2.&emsp;Semifinal</strong>" +
    "</br>&emsp;&emsp;&emsp;Proposal Submission" +
    "</br>&emsp;&emsp;&emsp;Submission Phase: 20th - 31th October 2024" +
    "</br>&emsp;&emsp;&emsp;Coaching Clinic 1: 26th October 2024" +
    "</br>&emsp;&emsp;&emsp;Topic: Blueprint for Success: Crafting a Strategic Business Proposal" +
    "</br>&emsp;&emsp;&emsp;Scoring Phase: 1st - 9th November 2024" +
    "</br>&emsp;&emsp;&emsp;Finalist Announcement: 10th November 2024" +
    "</br><strong>&emsp;3.&emsp;Final</strong>" +
    "</br>&emsp;&emsp;&emsp;Pitching Deck Submission & Offline Pitching" +
    "</br>&emsp;&emsp;&emsp;Submission Phase: 11th - 22nd November 2024" +
    "</br>&emsp;&emsp;&emsp;Technical Meeting: 15th November 2024" +
    "</br>&emsp;&emsp;&emsp;Coaching Clinic 2: 16th November 2024" +
    "</br>&emsp;&emsp;&emsp;Topic: Pitch Perfect: Captivate the Judges with Your Ideas" +
    "</br>&emsp;&emsp;&emsp;Final Pitch: 23rd November 2024" +
    "</br>&emsp;&emsp;&emsp;Winner Awarding: 1st December 2024" +
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
    faq: ["Who can participate, and what are the eligibility criteria?",
      "How many stages does this business plan competition have?", 
      "Is there any specific criteria/requirement regarding the business ideas?", 
      "Will the competition be held offline or online?"],
    faqDesc: ["Participants are an active undergraduate students/vocational students from all around the world with one team consist of maximum 3 people who can come from different institution.",
      "The competition will consist of three stages: the first stage involves the submission of a business model canvas and executive summary, the second stage requires a detailed business proposal, and the final stage includes a pitch deck assessment followed by an offline pitching event at a venue to be announced.", 
      "There are no prerequisites regarding the business ideas; the competition welcomes business plans from diverse industries. The key to success in our competition is to simply demonstrate creativity, innovation, and a commitment to sustainable business practices.", 
      "The competition will be held online for the preliminary and semi final stages. The final stage will take place offline at a venue that will be announced soon."],
    contactPerson: ["Aisha Inaya"],
    contactNumber: ["(+62) 81288480732"],
    contactLink: [],
    timelineData: [
      {
        title: "Preliminary Stage",
        date: "9th September - 19th October 2024",
        type: "register",
        link: ``,
      },
      {
        title: "Semi-Final Stage",
        date: "20th October - 10th November 2024",
        type: "meeting",
      },
      {
        title: "Final Stage",
        date: "11st November - 1st December 2024",
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
    openRegistration: false,
    description: "Two-days online expert sessions which will share experiences, recruitment tips, job opportunities, and material related to job vacancies in four industries (Consulting, Start-Up, BUMN, and FMCG).",
    timelineDesc: "Timeline details for Chambers",
    registerLink: ``,
    faq: ["What is Chambers?",
      "Who can join Chambers?", 
      "What are the benefits of joining Chambers?"],
    faqDesc: ["The two-day expert talk show will provide valuable insights for career preparation across consulting, start-ups, FMCG, and BUMN industries while featuring unique sessions to enhance participants’ career readiness.",
      "Open for university students and fresh graduates.", 
      "Valuable career insights, industry exposure, job opportunities, and personal growth with an exclusive opportunity to receive direct feedback and guidance from experts."],
    contactPerson: ["TBA"],
    contactNumber: ["-"],
    contactLink: [],
    timelineData: [
      {
        title: "Open Registration",
        date: "TBA",
        type: "register",
        link: ``,
      },
      {
        title: "Technical Meeting",
        date: "TBA",
        type: "meeting",
      },
      {
        title: "Project Progress",
        date: "TBA",
        type: "progress",
      },
      {
        title: "Submit Project",
        date: "TBA",
        type: "submit",
      },
    ],
  },
  event_6: {
    title: "Company Visit",
    image: imgLocation + "comvis.png",
    openRegistration: false,
    description: "Hands-on experience collaborating with company partners to conduct offline and online office tour and talkshow about sustainable work environments and recruitment tips.",
    timelineDesc: "Timeline details for Company Visit",
    registerLink: ``,
    faq: ["How many offline and online company visits will be held later ?", 
      "What activities will be carried out on the offline company visit ?", 
      "When will the company visit activity be held ?"],
    faqDesc: ["2 company visits offline and 2 company visits online", 
      "Workshop or sharing session about the company, work culture, internship opportunities and many more", 
      "First week of november"],
    contactPerson: ["TBA"],
    contactNumber: ["-"],
    contactLink: [],
    timelineData: [
      {
        title: "Open Registration",
        date: "TBA",
        type: "register",
        link: ``,
      },
      {
        title: "Technical Meeting",
        date: "TBA",
        type: "meeting",
      },
      {
        title: "Project Progress",
        date: "TBA",
        type: "progress",
      },
      {
        title: "Submit Project",
        date: "TBA",
        type: "submit",
      },
    ],
  },
  event_7: {
    title: "Summit",
    image: imgLocation + "summit.png",
    openRegistration: false,
    description: "SxC International Summit is a peak event that provides an opportunity for individuals from all backgrounds to present their perspectives on current economic trends and engage with leading economists and industry experts.",
    timelineDesc: "Timeline details for Summit",
    registerLink: ``,
    faq: ["Is the International Summit some kind of seminar event?",
      "When will the International Summit be held?", 
      "What is the expected benefit of joining the summit?"],
    faqDesc: ["The International Summit will be the pinnacle of our event series.This summit goes beyond a typical seminar; it features high-level conferences that present discussions on current economic trends and provide opportunities to engage with leading economists and industry experts. In addition to insightful dialogues, the summit will offer opportunities related to jobs and internships. It serves as a unique platform for everyone to connect directly with top economists and industry leaders",
      "The International Summit will be held offline in early December.", 
      "Participants will gain a comprehensive understanding of current economic trends, benefit from the leading economists and industry experts, and access valuable networking opportunities. Also, the summit provides a chance to explore job and internship prospects, making it an essential event for anyone looking to advance their career and expand their professional network."],
    contactPerson: ["TBA"],
    contactNumber: ["-"],
    contactLink: [],
    timelineData: [
      {
        title: "Open Registration",
        date: "TBA",
        type: "register",
        link: ``,
      },
      {
        title: "Technical Meeting",
        date: "TBA",
        type: "meeting",
      },
      {
        title: "Project Progress",
        date: "TBA",
        type: "progress",
      },
      {
        title: "Submit Project",
        date: "TBA",
        type: "submit",
      },
    ],
  },
};
