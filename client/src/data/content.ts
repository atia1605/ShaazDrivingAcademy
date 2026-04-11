export const faqItems = [
  {
    q: "How do I get a driving instructor and schedule in car lessons?",
    a: "On your final day of in-class instruction, you will receive an in-car instructor's name and number. You will then contact the instructor and book appointments based on availability.",
  },
  {
    q: "How do I book my road test?",
    aHtml:
      'Log on to <a href="https://www.drivetest.ca" target="_blank" rel="noopener noreferrer">www.drivetest.ca</a>, fill in your information and book your road test for the next available date at a DriveTest centre near you.',
  },
  {
    q: "Can I do a course without G1?",
    a: "In-class can be done without the G1 license. G1 license is required for in-car instruction.",
  },
  {
    q: "How can I pay the balance?",
    a: "Balance of payment can be paid by cash or cheque at our driving school location.",
  },
  {
    q: "Do I need to bring my certificate to the road test?",
    a: "A paper copy is required for the road test day. You are certified electronically through the MTO system.",
  },
] as const;

export const testimonials = [
  {
    quote:
      '"Thank u for being the best instructor ever! With your guidance and patience, u taught me the skills to become a safe driver. Also Shohan thank u for helping me to overcome my nervousness. Your lessons were informative. I definitely recommend u to my friends. I-have passed my G exam and truly enjoyed entire experience of learning."',
    author: "Melinda David",
  },
  {
    quote:
      "I had zero driving experience and was extremely nervous about learning to drive as a newcomer to Canada. Shuhan from Shaaz driving academy was incredibly patient, supportive and knowledgeable. He helped me build confidence step by step and prepared me thoroughly for driving. He made each lessons enjoyable and stress-free. Thanks to his exceptional guidance and motivation , I passed G2 test on my first try today in Toronto's busy area ! I highly recommend Shuhan from Shaaz academy to anyone looking for an amazing driving instructor.",
    author: "Rubaia Morshed",
  },
  {
    quote:
      "Best driving instructor! He helped my cousin get his G2 . My cousin is new to Canada , and has a language barrier. We've worked with other driving instructors but Shohan walked him through the rules and provided great help explaining the criteria for his exam. If you've recently obtained your G1 and your looking for an educational instructor- Shaaz Driving Academy is the best!",
    author: "Stephanie Anton",
  },
] as const;

export const bdePackages = [
  {
    title: "Package 1",
    items: [
      "10 Hours Of In-Car Training",
      "20 Hours Of In-class Sessions",
      "Certification with The Ministry of Transportation",
      "10 hours homelink",
    ],
  },
  {
    title: "Package 2",
    items: [
      "11 Hours Of In-Car Training",
      "20 Hours Of In-Class Sessions",
      "Certification With Ministry of Transportation",
      "10 hours homelink",
      "Use of an Instructor car for local G2 Road Test",
      "We will also book your Road Test",
    ],
  },
  {
    title: "Package 3",
    items: [
      "15 Hours Of In-Car Training",
      "20 Hours Of In-Class Sessions",
      "Certification With Ministry of Transportation",
      "10 hours homelink",
      "Use of an Instructor's car For local G2 Road Test",
      "We will also book your Road Test",
    ],
  },
] as const;

export const g1g2Packages = [
  { label: "5 hours of lessons", price: "$250 + HST", id: "g1g2-5" },
  { label: "10 hours of lessons", price: "$490 + HST", id: "g1g2-10" },
  { label: "1 Hour and Road Test (in town)", price: "$195 + HST", id: "g1g2-1rt" },
  { label: "3 Hours and Road Test mini package (in town)", price: "$300 + HST", id: "g1g2-3rt" },
  { label: "5 Hours and Road Test (in town)", price: "$390 + HST", id: "g1g2-5rt" },
  { label: "10 Hours and Road Test (in town)", price: "$625 + HST", id: "g1g2-10rt" },
] as const;

export const g2gPackages = [
  { label: "5 hours of lessons", price: "$300 + HST", id: "g2g-5" },
  { label: "10 hours of lessons", price: "$590 + HST", id: "g2g-10" },
  { label: "1 Hour and Road Test (in town)", price: "$220 + HST", id: "g2g-1rt" },
  { label: "3 Hours and Road Test mini package (in town)", price: "$340 + HST", id: "g2g-3rt" },
  { label: "5 Hours and Road Test (in town)", price: "$475 + HST", id: "g2g-5rt" },
  { label: "10 Hours and Road Test (in town)", price: "$750 + HST", id: "g2g-10rt" },
] as const;

export const courseTypes = [
  { value: "", label: "Select a course (optional)" },
  { value: "bde-package", label: "BDE certification package" },
  { value: "individual-g1g2", label: "Individual lessons (G1 → G2)" },
  { value: "individual-g2g", label: "Individual lessons (G2 → G)" },
  { value: "classroom", label: "Classroom / digital classroom" },
  { value: "senior", label: "Courses for seniors" },
  { value: "immigrant", label: "Courses for new immigrants" },
  { value: "ptc", label: "Vehicle for hire (PTC)" },
  { value: "other", label: "Other / not sure" },
] as const;

/** In-class, in-car, and digital / homelink — used on Courses page */
export const classroomModes = [
  {
    title: "In-class instruction",
    lead:
      "Build a strong theory foundation in a structured classroom with a qualified instructor — rules of the road, signs, defensive driving, and how to handle real situations before you get behind the wheel.",
    bullets: [
      "MTO-aligned curriculum for Beginner Driver Education (BDE)",
      "Discussion and Q&A so concepts stick — not just memorization",
      "You can often start in-class before your G1; check with us when you book",
    ],
  },
  {
    title: "In-car training",
    lead:
      "Hands-on driving in a dual-controlled vehicle with a licensed instructor. Each lesson builds on the last, from basics to test-ready skills on routes you will actually use.",
    bullets: [
      "Parking, intersections, lane changes, highway practice, and road-test preparation",
      "Clear feedback after every session so you know what to improve",
      "A valid G1 (or appropriate licence) is required for in-car lessons",
    ],
  },
  {
    title: "Digital & homelink",
    lead:
      "Flexible online classroom components and homelink hours let you review on your own time and stay on track between in-person sessions.",
    bullets: [
      "Digital options where offered — learn in the format that fits your schedule",
      "Homelink work complements in-class and in-car training for a complete BDE record",
      "Revisit material anytime so you are confident for tests and real-world driving",
    ],
  },
] as const;

export const seniorCoursesContent = {
  intro:
    "Returning after a break, refreshing for a renewal, or simply want more confidence on busier roads? We offer patient, respectful instruction tailored to experienced drivers — at your pace, with clear communication.",
  highlights: [
    "Refresher lessons: highways, night driving, winter conditions, and complex intersections",
    "Updates on Ontario traffic laws, signage, and right-of-way in today’s traffic",
    "Stress-free practice — we explain modern vehicle tech and road layouts step by step",
    "Flexible scheduling and lesson plans built around your goals, not a one-size-fits-all package",
  ],
  closing: "Tell us what you would like to achieve and we will recommend a plan that fits.",
} as const;

export const immigrantCoursesContent = {
  intro:
    "New to Canada? We help you turn your experience into safe driving here — from Ontario’s graduated licensing system to reading signs, handling Toronto-area traffic, and preparing for your road test.",
  highlights: [
    "Guidance whether you are starting fresh or exchanging an international licence — your path depends on the MTO and your background; we help you understand the next steps",
    "Clear explanations of school zones, transit lanes, winter driving, and unwritten “local” habits on busy streets",
    "Practice on routes and scenarios similar to your test centre so nothing feels unfamiliar",
    "Patient instructors who take extra time when English is a second language — we repeat and demonstrate until you are comfortable",
  ],
  closing: "Share your situation by phone or email and we will outline the best program for you.",
} as const;
