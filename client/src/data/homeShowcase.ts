/** Sample “lesson report” slides — illustrative only; not a real student record. */
export const lessonReportSlides = [
  {
    title: "G2 prep — session overview",
    meta: "Sample skills tracker · In-car lesson focus",
    rows: [
      { topic: "Three-point turn & tight spaces", grade: "9", tone: "green" as const },
      { topic: "Right-of-way at complex intersections", grade: "8", tone: "purple" as const },
      { topic: "Highway merge & lane discipline", grade: "7", tone: "orange" as const },
    ],
    notes:
      "Next session: mock road-test route near your DriveTest centre, plus parallel parking on a busier street. Ask your instructor to log any habits you want to polish before booking your test.",
  },
  {
    title: "BDE classroom — module wrap-up",
    meta: "Theory progress · Sample summary",
    rows: [
      { topic: "Rules of the road & signage review", grade: "10", tone: "green" as const },
      { topic: "Defensive driving scenarios", grade: "9", tone: "green" as const },
      { topic: "Homelink self-study completion", grade: "8", tone: "purple" as const },
    ],
    notes:
      "Keep linking classroom ideas to what you see on the road. When you finish in-class, you will receive your in-car instructor contact to schedule behind-the-wheel time.",
  },
  {
    title: "Road test readiness — checklist",
    meta: "Pre-test habits · Sample checklist",
    rows: [
      { topic: "Observation & shoulder checks", grade: "9", tone: "green" as const },
      { topic: "Speed control in school zones", grade: "8", tone: "purple" as const },
      { topic: "Parking & exit strategy", grade: "8", tone: "orange" as const },
    ],
    notes:
      "Bring your certificate (paper copy) and licence on test day. Confirm your appointment time and route with your instructor the lesson before.",
  },
] as const;

/** Trust carousel — marketing highlights (swipe / dots on the home page). */
export const trustHighlightSlides = [
  {
    headline: "Among the GTA's best",
    sub: "A driving school families choose for clear teaching, patience, and real results on the road.",
    source: "Shaaz Driving Academy",
  },
  {
    headline: "Friendly instructors",
    sub: "Learn in a calm, encouraging car — ask questions anytime and never feel rushed.",
    source: "Supportive driver training",
  },
  {
    headline: "Step by step",
    sub: "Every skill is broken into simple stages so driving feels manageable from day one.",
    source: "Structured lesson plans",
  },
  {
    headline: "Hands-on coaching",
    sub: "Side-by-side guidance in the vehicle until maneuvers, observation, and habits feel natural.",
    source: "In-car instruction",
  },
  {
    headline: "Experienced team",
    sub: "Instructors who know GTA traffic, examiner expectations, and how different students learn best.",
    source: "Licensed professionals",
  },
  {
    headline: "Road-test focused",
    sub: "Lessons emphasize what DriveTest looks for — many students see strong outcomes when they follow the plan.",
    source: "Test-day preparation",
  },
  {
    headline: "Right test centre for you",
    sub: "We help you understand which DriveTest location, timing, and route practice may suit you best.",
    source: "Local knowledge · GTA",
  },
  {
    headline: "MTO-approved BDE",
    sub: "Beginner Driver Education with classroom, in-car, and digital components — fully recognized in Ontario.",
    source: "Ministry of Transportation",
  },
  {
    headline: "20+ years in the GTA",
    sub: "Toronto, Scarborough, and surrounding areas — one trusted team for G1 through full G.",
    source: "Shaaz Driving Academy",
  },
  {
    headline: "Multilingual support",
    sub: "Bangla, English, Urdu, Hindi, Arabic, Sylheti, Chittagong — learn in the language that helps you most.",
    source: "When it helps you learn",
  },
] as const;
