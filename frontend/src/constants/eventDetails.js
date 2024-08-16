import { FCEO_REGIST, BMC_REGIST } from "./routes";

export const eventDetails = {
  event_1: {
    title: "Business Master Class",
    description: "The StudentsxCEOs International Summit Business Master Class is a one-hit competition free class specifically designed for 300 high school and college students who are eager to excel in business case and business plan competitions. With its interactive masterclass with expert-led materials presentation , and practical experience, and networking opportunities to equip students with the knowledge, skills, and strategies needed to excel in business competitions. This event series will be having further discussion on “Elevate to Success: Mastering in Business Competition” as the grand theme.",
    timelineDesc: "Timeline details for BMC",
    registerLink: `${BMC_REGIST}`,
    faq: ["What kind of business lessons will we learn in the Business Master Class?", 
      "When will the Business Master Class be held?", 
      "What are the benefits of joining a Business Master Class?"],
    faqDesc: ["Participants will learn strategies to excel in business competitions and gain practical insights into mastering analysis and problem-solving in business case competitions.",
      "The Business Master Class will be held online on Saturday, September 21, 2024.", 
      "Participants will gain valuable insights into business competitions from top-achieving speakers and acquire practical experience by solving case studies."],
    contactPerson: [
      "Diandra Chandra Kusuma",
      "Orang Satu Lagi",
      "lagi-lagi orang",
    ],
    contactNumber: [
      "(+62) 85123 4567 890",
      "(+62) 37128 2831 202",
      "(+62) 0987 6789 990",
    ],
    timelineData: [
      {
        title: "Open Registration",
        date: "15 July 2024 - 19 July 2024",
        type: "register", // field type ini cmn buat conditional rendering mau ada button register atau ngga, bisa diisi asal / ga diisi
        link: `${BMC_REGIST}`,
      },
      {
        title: "Technical Meeting",
        date: "20 July 2024",
        type: "meeting",
      },
      {
        title: "Project Progress",
        date: "21 July 2024 - 30 July 2024",
        type: "progress",
      },
      {
        title: "Submit Project",
        date: "31 July 2024",
        type: "submit",
      },
    ],
  },

  comp_1: {
    title: "Future CEO",
    description: "<strong>Future CEO</strong> is <strong>a prestigious business plan competition</strong> exclusively <strong>for high school students</strong>, to showcase their entrepreneurial skills and business acumen with the grand theme <strong>“Shaping Future Pioneers: Embracing Strategic Innovation in Sustainable Digital Era”</strong>. Students are <strong>challenged to present their innovative business idea</strong> that can solve the problems around them." +
    "</br></br>" +
    "<strong>When</strong></br>" +
    "19 August - 1st December 2024" +
    "</br></br>" +
    "<strong>Consists of 3 Stages</strong>" +
    "</br><strong>&emsp;1.&emsp;Preliminary:</strong>" +
    "</br>&emsp;&emsp;&emsp;Business Model Canvas Submission" +
    "</br>&emsp;&emsp;&emsp;19th August - 29th September 2024" +
    "</br><strong>&emsp;2.&emsp;Semifinal:</strong>" +
    "</br>&emsp;&emsp;&emsp;Proposal Submission" +
    "</br>&emsp;&emsp;&emsp;1st October - 22nd October 2024" +
    "</br><strong>&emsp;3.&emsp;Final:</strong>" +
    "</br>&emsp;&emsp;&emsp;Deck Submission" +
    "</br>&emsp;&emsp;&emsp;5th November - 23rd November 2024" +
    "</br>&emsp;&emsp;&emsp;Pitching Day" +
    "</br>&emsp;&emsp;&emsp;24th November 2024" +
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
      "There are 5 topics that will be competed, namely food and beverage, tourism and local culture, education, renewable energy, and health.", 
      "No, participants in a team are not required to be in the same school. The important thing is that they are still registered as high school students."],
    contactPerson: ["Primel", "Ell"],
    contactNumber: ["085156458584", "082258574505"],
    timelineData: [
      {
        title: "Open Registration",
        date: "15 July 2024 - 19 July 2024",
        type: "register",
        link: `${FCEO_REGIST}`,
      },
      {
        title: "Technical Meeting",
        date: "20 July 2024",
        type: "meeting",
      },
      {
        title: "Project Progress",
        date: "21 July 2024 - 30 July 2024",
        type: "progress",
      },
      {
        title: "Submit Project",
        date: "31 July 2024",
        type: "submit",
      },
    ],
  },
  comp_2: {
    title: "SxC International Business Challenge: Business Case Competition",
    description:
      "Challenges college students to apply their business acumen and strategic thinking to real-world scenarios through complex business problems analysis and develop innovative solution",
    timelineDesc:
      "Timeline details for SxC International Business Challenge: Business Case Competition",
    registerLink: ``,
    faq: ["How many and what is the format and structure of each stage?", 
      "How and where do we register for the competition?", 
      "Where is the venue or platform for the competition?"],
    faqDesc: ["The competition has three stages. In the Preliminary Round, participants submit a proposal outlining their solution to the given case. In the Semifinal Round, they create a pitch deck based on their proposal and deliver a brief rocket pitch. The Final Round involves solving a new case within one day, creating a pitch deck, and presenting it the next day, testing their ability to deliver a well-structured solution under time pressure.", 
      "Participants may register from our website www.something.com . The registration is open from 2nd September 2024 to 5th October 2024. Participants can register individually or in groups of maximum 3 people.", 
      "The competition will be held online for the preliminary and semi final stages. The final stage will take place at a venue that will be announced soon."],
    contactPerson: ["Diandra Chandra Kusuma", "Orang Satu Lagi"],
    contactNumber: ["(+62) 85123 4567 890", "(+62) 37128 2831 202"],
    timelineData: [
      {
        title: "Open Registration",
        date: "15 July 2024 - 19 July 2024",
        type: "register",
        link: ``,
      },
      {
        title: "Technical Meeting",
        date: "20 July 2024",
        type: "meeting",
      },
      {
        title: "Project Progress",
        date: "21 July 2024 - 30 July 2024",
        type: "progress",
      },
      {
        title: "Submit Project",
        date: "31 July 2024",
        type: "submit",
      },
    ],
  },
  comp_3: {
    title: "SxC International Business Challenge: Business Plan Competition",
    description:
      "Cultivate entrepreneurial skills through their business ideas in a simulated real-world environment, showcasing their creativity, strategic thinking, and ability to execute viable business plans.",
    timelineDesc:
      "Timeline details for SxC International Business Challenge: Business Plan Competition",
    registerLink: ``,
    faq: ["Who can participate, and what are the eligibility criteria?",
      "How many stages does this business plan competition have?", 
      "Is there any specific criteria/requirement regarding the business ideas?", 
      "Will the competition be held offline or online?"],
    faqDesc: ["Participants are an active undergraduate students/vocational students from all around the world with one team consist of maximum 3 people who can come from different institution.",
      "The competition will consist of three stages: the first stage involves the submission of a business model canvas and executive summary, the second stage requires a detailed business proposal, and the final stage includes a pitch deck assessment followed by an offline pitching event at a venue to be announced.", 
      "There are no prerequisites regarding the business ideas; the competition welcomes business plans from diverse industries. The key to success in our competition is to simply demonstrate creativity, innovation, and a commitment to sustainable business practices.", 
      "The competition will be held online for the preliminary and semi final stages. The final stage will take place offline at a venue that will be announced soon."],
    contactPerson: ["Diandra Chandra Kusuma", "Orang Satu Lagi"],
    contactNumber: ["(+62) 85123 4567 890", "(+62) 37128 2831 202"],
    timelineData: [
      {
        title: "Open Registration",
        date: "15 July 2024 - 19 July 2024",
        type: "register",
        link: ``,
      },
      {
        title: "Technical Meeting",
        date: "20 July 2024",
        type: "meeting",
      },
      {
        title: "Project Progress",
        date: "21 July 2024 - 30 July 2024",
        type: "progress",
      },
      {
        title: "Submit Project",
        date: "31 July 2024",
        type: "submit",
      },
    ],
  },
  event_5: {
    title: "Chambers",
    description: "Two-days online expert sessions which will share experiences, recruitment tips, job opportunities, and material related to job vacancies in four industries (Consulting, Start-Up, BUMN, and FMCG).",
    timelineDesc: "Timeline details for Chambers",
    registerLink: ``,
    faq: ["What is Chambers?",
      "Who can join Chambers?", 
      "What are the benefits of joining Chambers?"],
    faqDesc: ["The two-day expert talk show will provide valuable insights for career preparation across consulting, start-ups, FMCG, and BUMN industries while featuring unique sessions to enhance participants’ career readiness.",
      "Open for university students and fresh graduates.", 
      "Valuable career insights, industry exposure, job opportunities, and personal growth with an exclusive opportunity to receive direct feedback and guidance from experts."],
    contactPerson: ["Diandra Chandra Kusuma", "Orang Satu Lagi"],
    contactNumber: ["(+62) 85123 4567 890", "(+62) 37128 2831 202"],
    timelineData: [
      {
        title: "Open Registration",
        date: "15 July 2024 - 19 July 2024",
        type: "register",
        link: ``,
      },
      {
        title: "Technical Meeting",
        date: "20 July 2024",
        type: "meeting",
      },
      {
        title: "Project Progress",
        date: "21 July 2024 - 30 July 2024",
        type: "progress",
      },
      {
        title: "Submit Project",
        date: "31 July 2024",
        type: "submit",
      },
    ],
  },
  event_6: {
    title: "Company Visit",
    description: "Hands-on experience collaborating with company partners to conduct offline and online office tour and talkshow about sustainable work environments and recruitment tips.",
    timelineDesc: "Timeline details for Company Visit",
    registerLink: ``,
    faq: ["How many offline and online company visits will be held later ?", 
      "What activities will be carried out on the offline company visit ?", 
      "When will the company visit activity be held ?"],
    faqDesc: ["2 company visits offline and 2 company visits online", 
      "Workshop or sharing session about the company, work culture, internship opportunities and many more", 
      "First week of november"],
    contactPerson: ["Diandra Chandra Kusuma", "Orang Satu Lagi"],
    contactNumber: ["(+62) 85123 4567 890", "(+62) 37128 2831 202"],
    timelineData: [
      {
        title: "Open Registration",
        date: "15 July 2024 - 19 July 2024",
        type: "register",
        link: ``,
      },
      {
        title: "Technical Meeting",
        date: "20 July 2024",
        type: "meeting",
      },
      {
        title: "Project Progress",
        date: "21 July 2024 - 30 July 2024",
        type: "progress",
      },
      {
        title: "Submit Project",
        date: "31 July 2024",
        type: "submit",
      },
    ],
  },
  event_7: {
    title: "Summit",
    description: "SxC International Summit is a peak event that provides an opportunity for individuals from all backgrounds to present their perspectives on current economic trends and engage with leading economists and industry experts.",
    timelineDesc: "Timeline details for Summit",
    registerLink: ``,
    faq: ["Is the International Summit some kind of seminar event?",
      "When will the International Summit be held?", 
      "What is the expected benefit of joining the summit?"],
    faqDesc: ["The International Summit will be the pinnacle of our event series.This summit goes beyond a typical seminar; it features high-level conferences that present discussions on current economic trends and provide opportunities to engage with leading economists and industry experts. In addition to insightful dialogues, the summit will offer opportunities related to jobs and internships. It serves as a unique platform for everyone to connect directly with top economists and industry leaders",
      "The International Summit will be held offline in early December.", 
      "Participants will gain a comprehensive understanding of current economic trends, benefit from the leading economists and industry experts, and access valuable networking opportunities. Also, the summit provides a chance to explore job and internship prospects, making it an essential event for anyone looking to advance their career and expand their professional network."],
    contactPerson: ["Diandra Chandra Kusuma", "Orang Satu Lagi"],
    contactNumber: ["(+62) 85123 4567 890", "(+62) 37128 2831 202"],
    timelineData: [
      {
        title: "Open Registration",
        date: "15 July 2024 - 19 July 2024",
        type: "register",
        link: ``,
      },
      {
        title: "Technical Meeting",
        date: "20 July 2024",
        type: "meeting",
      },
      {
        title: "Project Progress",
        date: "21 July 2024 - 30 July 2024",
        type: "progress",
      },
      {
        title: "Submit Project",
        date: "31 July 2024",
        type: "submit",
      },
    ],
  },
};
