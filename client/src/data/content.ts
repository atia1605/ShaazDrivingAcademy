/** First three topics for the home page FAQ teaser (plain text answers) */
export const homeFaqTeaserItems = [
  {
    q: "How do I get a driving instructor and schedule in car lessons?",
    a: "On your last day of in-class instruction you receive your in-car instructor's name and number, then you book appointments based on availability.",
  },
  {
    q: "How do I book my road test?",
    a: "Book online at DriveTest — choose a date and DriveTest centre that works for you.",
  },
  {
    q: "Can I do a course without G1?",
    a: "You can start in-class without a G1. You need a valid G1 before any in-car training.",
  },
] as const;

/**
 * Embedded on the home page for general Ontario licensing information.
 * Hosted on YouTube; not produced by Shaaz Driving Academy — see disclaimer in the section.
 */
export const homeYoutubeVideos = [
  {
    youtubeId: "iTw0Ohi8_7c",
    title: "G1, G2 & full G — how Ontario licensing works",
    caption: "Explains the graduated system, from the knowledge test to G2 and full G road tests.",
    tag: "G1 · G2 · G",
  },
  {
    youtubeId: "klAItlQNNXg",
    title: "G1, G2 & G — what’s the difference?",
    caption: "Clarifies each level, restrictions, and why the steps exist before you book lessons.",
    tag: "Levels & rules",
  },
  {
    youtubeId: "TQpLFMrmehI",
    title: "G1 knowledge test — study orientation",
    caption: "Extra practice mindset for the written test; always follow the official MTO handbook.",
    tag: "G1 prep",
  },
] as const;

/** Official MTO / DriveTest links plus optional third-party practice sites (see UI disclaimer). */
export const g1PracticeLinks = [
  {
    label: "New drivers — get a G licence (Ontario.ca)",
    href: "https://www.ontario.ca/page/get-g-drivers-licence-new-drivers",
    kind: "official" as const,
  },
  {
    label: "Official MTO Driver's Handbook",
    href: "https://www.ontario.ca/document/official-mto-drivers-handbook",
    kind: "official" as const,
  },
  {
    label: "DriveTest — knowledge tests & fees",
    href: "https://www.drivetest.ca/tests/knowledge-tests/",
    kind: "official" as const,
  },
  {
    label: "Find a DriveTest centre (search)",
    href: "https://www.drivetest.ca/drivetest-centre-search/",
    kind: "official" as const,
  },
  {
    label: "Practice questions — G1.ca (unofficial)",
    href: "https://www.g1.ca/",
    kind: "practice" as const,
  },
] as const;

/** Toronto-area DriveTest centres where G1 knowledge tests are offered — confirm hours on drivetest.ca. */
export const torontoG1DriveTestCentres = [
  {
    name: "Toronto Downsview",
    address: "37 Carl Hall Rd, North York, ON M3K 2E2",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=DriveTest+Toronto+Downsview+37+Carl+Hall+Rd",
  },
  {
    name: "Toronto Etobicoke",
    address: "5555 Eglinton Ave W, Etobicoke, ON M9C 5M1",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=DriveTest+5555+Eglinton+Ave+W+Etobicoke",
  },
  {
    name: "Toronto Metro East",
    address: "1448 Lawrence Ave E, North York, ON M4A 2V6",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=DriveTest+1448+Lawrence+Ave+E+Toronto",
  },
  {
    name: "Toronto Port Union",
    address: "91 Rylander Blvd, Scarborough, ON M1B 5M5",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=DriveTest+91+Rylander+Blvd+Scarborough",
  },
] as const;

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
  {
    q: "I have a driver's licence from another country. How do I apply in Ontario and what tests do I need?",
    aHtml: `<p>When you move to Ontario, you may use a valid foreign licence for <strong>60 days</strong>. After that you must apply for an Ontario licence. Whether you can <strong>exchange</strong> your licence or must take <strong>knowledge and/or road tests</strong> depends on your country (Ontario has exchange agreements with some countries only), how long you have been driving, and the class of licence you hold.</p><p>You usually apply <strong>in person</strong> at a <a href="https://www.drivetest.ca/drivetest-centre-search/" target="_blank" rel="noopener noreferrer">DriveTest centre</a> (or certain ServiceOntario locations). Bring <strong>original</strong> identity documents, your foreign licence, and any proof of driving experience. For more than one year of experience credit you may need an official letter from the licensing authority. Expect a <strong>vision test</strong>; you may also need <strong>G1 knowledge</strong> and <strong>road test(s)</strong> depending on your case.</p><p>Read the official steps here: <a href="https://www.ontario.ca/page/exchange-out-province-drivers-licence" target="_blank" rel="noopener noreferrer">Exchange an out-of-province or foreign licence (Ontario.ca)</a> and <a href="https://drivetest.ca/licences/exchanges-foreign-licences/" target="_blank" rel="noopener noreferrer">Exchanges &amp; foreign licences (DriveTest)</a>. Shaaz can help with <strong>lessons and road-test preparation</strong> once you know what Ontario requires for you — <a href="/contact">contact us</a> with your country and licence type.</p>`,
  },
] as const;

/**
 * Home testimonials — text transcribed from public Google Maps reviews (and earlier featured quotes).
 * Optional `avatarSrc` = single-reviewer headshot under `public/` when you have permission (avoid using multi-review screenshots as avatars).
 */
export type TestimonialEntry = { quote: string; author: string; avatarSrc?: string };

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
  {
    quote:
      "If you want to pass your test in one go then you have to go with Sohan. He is professional and is in depth with his teaching but at the same time tells you funny story to keep you relax and calm during the lessons as well as before the test. Really motivating and friendly person to learn driving from.",
    author: "Vedant Goswami",
  },
  {
    quote:
      "I passed my G driving test today on my 1st try because of Shohan. He was such an incredible instructor. He was professional, easy going and made learning driving more fun. He gave some great tips which really helped me improve my driving skills. He made sure that I was very comfortable and prepared for my test; I was very confident during my test day. I would recommend anyone looking to learn to drive to choose this school and ask for Shohan, you will be in really great hands!!!",
    author: "Manu Jeevan Prakash",
  },
  {
    quote:
      "Shohan is an amazing Instructor. He is definitely strict and that is his quality that he will make sure you learn the rules right and follow it rigorously. He teaches all the minor details not just to pass the test but will also help you forever in your driving. Whether it is G or G2, he is highly recommend for all 10/10. He will not only teaches you the driving but he is very very cool and makes you very much comfortable during driving and specially before your exam. Thank you so much Shohan for all your help and support in getting me license here in Canada.",
    author: "Miten Soni",
  },
  {
    quote:
      "The best learning experience. I passed my G2 today!! Shohan gives a lot of tips and feedback while learning how to drive and on the day of the exam. He will make sure he takes you on the exam when you are ready. I would definitely recommend Shohan as your driver instructor!!!",
    author: "Rexhina Malo",
  },
  {
    quote:
      "Shohan was an excellent instructor. I was a complete novice with barely any experience, and his guidance helped me pass my G2 road test in one attempt. Shohan put me at ease and helped me learn right from the basics while making the classes entertaining and upbeat. Highly recommend Shohan and Shaaz Academy for their professionalism, patience, and knowledge (Also great food recommendations haha)",
    author: "Vinita Kumar",
  },
  {
    quote:
      "Passed my G2 today and it was my first attempt. Shohan is a good driving instructor and he made me feel comfortable while learning how to drive. I will definitely recommend if anyone is now learning to drive. He's the best.",
    author: "Teneisha Frederick",
  },
  {
    quote:
      "This is one of Toronto's best driving schools, and I highly recommend it! Shohan was my instructor, and he was a true professional who was always punctual and friendly. He made sure I understood all driving techniques (parallel parking, lane switching, front and reverse parking, etc.) and used his strategies to make learning a breeze; he genuinely made driving fun. As a consequence, I was able to earn my G2. Thanks, Shohan!",
    author: "Tanvir N Hasan",
  },
] as readonly TestimonialEntry[];

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
    "Multilingual explanations when helpful — Bangla, English, Urdu, Hindi, Arabic, Sylheti, and Chittagong",
  ],
  closing: "Share your situation by phone or email and we will outline the best program for you.",
} as const;
