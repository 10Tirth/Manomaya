export const EVENT = {
  name: 'Mind Matters Fest 2026',
  shortName: 'Mind Matters',
  tagline: 'Breathe. Reflect. Bloom.',
  college: 'Your College Name',
  venue: 'Your College Campus',
  startDate: '2026-11-02',
  endDate: '2026-11-06',
  countdownTarget: '2026-11-02T10:00:00+05:30',
  contactEmail: 'mindmatters@yourcollege.edu',
  socials: { instagram: '', linkedin: '' },
  entryNote: 'Free for all students',
  registrationEndpoint: 'https://script.google.com/macros/s/AKfycbw3u8E6kO3COC2-PSzhGoy8XsV9axOZmXP5DIauKPnuR9vwyc9CjrvyjKrnPIkVJxQ/exec',
}

export const CATEGORIES = [
  { id: 'awareness', label: 'Awareness', color: 'sky', icon: 'Megaphone' },
  { id: 'mindfulness', label: 'Mindfulness', color: 'sage', icon: 'Leaf' },
  { id: 'creative', label: 'Creative', color: 'lavender', icon: 'Palette' },
  { id: 'support', label: 'Support', color: 'peach', icon: 'HeartHandshake' },
  { id: 'fun', label: 'Fun', color: 'butter', icon: 'Smile' },
]

export const DAYS = [
  { day: 1, date: '2026-11-02', theme: 'Open Up', blurb: 'Start the conversation.' },
  { day: 2, date: '2026-11-03', theme: 'Breathe', blurb: 'Slow down and reset.' },
  { day: 3, date: '2026-11-04', theme: 'Create', blurb: "Express what words can't." },
  { day: 4, date: '2026-11-05', theme: 'Connect', blurb: 'Listen, share, belong.' },
  { day: 5, date: '2026-11-06', theme: 'Celebrate', blurb: 'Joy is part of healing.' },
]

export const ACTIVITIES = [
  {
    id: 'a1', day: 1, start: '10:00', end: '10:45', category: 'awareness',
    title: 'Inauguration & Mind Matters Pledge', venue: 'Main Auditorium', dropIn: false,
    description: 'A warm welcome from faculty and the pledge that sets the tone for the week.',
  },
  {
    id: 'a2', day: 1, start: '11:00', end: '12:00', category: 'awareness',
    title: 'Keynote: Stress, Studies & Self', venue: 'Main Auditorium', dropIn: false,
    description: "A psychologist unpacks exam stress, burnout and the early signs it's time to ask for help, in plain language with live Q&A.",
  },
  {
    id: 'a3', day: 1, start: '12:30', end: '16:00', category: 'creative',
    title: 'Wall of Feelings', venue: 'Central Courtyard', dropIn: true,
    description: "Pin an anonymous sticky note: a worry, a win, a kind word. Read others' notes and remember you're not alone.",
  },
  {
    id: 'a4', day: 1, start: '16:00', end: '17:00', category: 'awareness',
    title: 'Campus Awareness Walk', venue: 'Main Gate', dropIn: true,
    description: 'Posters, placards and good company as we carry the conversation about mental health across campus.',
  },
  {
    id: 'a5', day: 2, start: '07:30', end: '08:30', category: 'mindfulness',
    title: 'Sunrise Yoga & Stretch', venue: 'Sports Ground', dropIn: false,
    description: 'Gentle, beginner-friendly yoga to wake up the body and settle the mind. Bring a mat or towel.',
  },
  {
    id: 'a6', day: 2, start: '11:00', end: '12:00', category: 'mindfulness',
    title: 'Breathwork & Guided Meditation', venue: 'Seminar Hall', dropIn: false,
    description: 'Learn three breathing techniques for before exams, interviews or whenever anxiety spikes.',
  },
  {
    id: 'a7', day: 2, start: '14:00', end: '15:00', category: 'mindfulness',
    title: 'Sound Bath & Music Therapy', venue: 'Seminar Hall', dropIn: false,
    description: 'Lie back as singing bowls and soft strings melt tension away. Eyes closed, phone away.',
  },
  {
    id: 'a8', day: 3, start: '10:30', end: '12:30', category: 'creative',
    title: 'Art Therapy Studio', venue: 'Art Room', dropIn: false,
    description: "Paint, doodle or colour your mood. No talent needed: it's about expressing, not impressing.",
  },
  {
    id: 'a9', day: 3, start: '14:00', end: '15:00', category: 'creative',
    title: 'Journaling & Gratitude Circle', venue: 'Library Lawn', dropIn: false,
    description: 'Guided prompts to put your thoughts on paper, a tiny habit with a big calming effect.',
  },
  {
    id: 'a10', day: 3, start: '16:00', end: '18:00', category: 'creative',
    title: 'Open Mic: Speak Your Heart', venue: 'Open Air Theatre', dropIn: false,
    description: 'Poetry, music, stories, stand-up: share your voice with a warm, judgement-free crowd.',
  },
  {
    id: 'a11', day: 4, start: '10:00', end: '12:00', category: 'support',
    title: 'Peer Support & Active Listening Workshop', venue: 'Seminar Hall', dropIn: false,
    description: 'Learn to listen without judging and to support a friend who is struggling: a skill for life.',
  },
  {
    id: 'a12', day: 4, start: '12:15', end: '13:15', category: 'fun',
    title: 'Digital Detox Challenge', venue: 'Main Foyer', dropIn: true,
    description: 'Lock your phone in a pouch for 45 minutes, enjoy real conversation and collect a calm-kit.',
  },
  {
    id: 'a13', day: 4, start: '13:30', end: '14:30', category: 'awareness',
    title: 'Panel: Break the Stigma', venue: 'Main Auditorium', dropIn: false,
    description: 'Students, counsellors and alumni talk openly about anxiety, loneliness and asking for help.',
  },
  {
    id: 'a14', day: 4, start: '15:00', end: '17:00', category: 'fun',
    title: 'Chill Zone: Board Games & Chai', venue: 'Student Lounge', dropIn: true,
    description: 'Bean bags, board games, colouring sheets and chai. Sometimes the best therapy is good company.',
  },
  {
    id: 'a15', day: 5, start: '09:30', end: '10:15', category: 'fun',
    title: 'Laughter Yoga', venue: 'Sports Ground', dropIn: false,
    description: 'Fake it till you make it: laughter exercises that turn into real giggles and a real mood lift.',
  },
  {
    id: 'a16', day: 5, start: '10:30', end: '16:00', category: 'support',
    title: 'Counsellor Connect: Free 1:1 Chats', venue: 'Counselling Cell', dropIn: true,
    description: 'Confidential 15-minute chats with trained counsellors. Reserve a slot or walk in: private, safe, judgement-free.',
  },
  {
    id: 'a17', day: 5, start: '11:00', end: '12:30', category: 'fun',
    title: 'Mind Matters Quiz', venue: 'Seminar Hall', dropIn: false,
    description: 'Teams bust myths about mental health in a fast, fun quiz that is surprisingly eye-opening.',
  },
  {
    id: 'a18', day: 5, start: '17:00', end: '19:00', category: 'fun',
    title: 'Silent Disco & Closing Circle', venue: 'Open Air Theatre', dropIn: false,
    description: 'End the week dancing it out with headphones on, followed by a closing circle and pledge renewal.',
  },
]

export const FAQS = [
  {
    q: 'Who can participate?',
    a: 'Every student at the college is welcome — freshers especially. No prior experience of any kind is needed for any activity.',
  },
  {
    q: 'Is it free?',
    a: "Entry is free for all students unless an activity's individual description says otherwise.",
  },
  {
    q: 'Do I need to register for every activity?',
    a: 'Only for the activities you want to attend. Registration helps us plan seats and materials so everyone gets the best experience.',
  },
  {
    q: 'Can I attend without registering?',
    a: 'Yes — drop-in activities are open to all without registration. For other activities, registered students get priority where space is limited.',
  },
  {
    q: 'How is my data used?',
    a: 'Your details are used only to organise this event and are stored in a private spreadsheet accessible only to the organising team.',
  },
  {
    q: 'What should I bring?',
    a: 'Yourself, a water bottle and an open mind. Bring a yoga mat or towel for the Sunrise Yoga session.',
  },
]

export const SUPPORT = {
  helplines: [
    { label: 'Tele-MANAS (India, free, 24x7)', value: '14416', href: 'tel:14416' },
    { label: 'Emergency services (India)', value: '112', href: 'tel:112' },
  ],
  campus: { label: 'Campus Counselling Cell', value: '', href: '' },
}
