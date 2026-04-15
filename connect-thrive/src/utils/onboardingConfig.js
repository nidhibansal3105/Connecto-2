// ─────────────────────────────────────────────────────────────
//  onboardingConfig.js
//  Central config for all onboarding steps, options & metadata.
//  Edit this file to add/remove questions without touching UI.
// ─────────────────────────────────────────────────────────────

export const STEPS = [
  {
    id: "basics",
    name: "About You",
    icon: "👤",
    title: "A bit about you",
    subtitle:
      "Help us understand who you are so we can find the right people.",
    type: "basics",
  },
  {
    id: "field",
    name: "Interests",
    icon: "🎯",
    title: "What fields excite you?",
    subtitle: "Pick the areas you're most passionate about.",
    type: "multiselect",
    stateKey: "fieldPref",
    max: 5,
    accentClass: "chip-cyan",
    options: [
      "Software Dev", "AI & ML", "Entrepreneurship", "Research",
      "Design & UX", "Finance & Banking", "Product Management",
      "Consulting", "Gaming", "Content Creation", "Law & Policy",
      "Healthcare", "Teaching", "Marketing", "DevOps & Cloud", "Robotics",
    ],
  },
  {
    id: "personality",
    name: "Your Vibe",
    icon: "✨",
    title: "Your vibe & personality",
    subtitle: "Helps match you with people who complement or share your energy.",
    type: "personality",
    stateKey: "personality",
    weekendKey: "weekendPref",
    max: 3,
    vibes: [
      { icon: "🦋", label: "Extrovert", value: "E" },
      { icon: "🌙", label: "Introvert", value: "I" },
      { icon: "⚡", label: "Ambivert",  value: "A" },
    ],
    weekendOptions: [
      "Go out & explore", "Binge shows at home", "Hit the gym",
      "Study & upskill", "Travel somewhere", "Attend events",
      "Cook & chill", "Sports & games",
    ],
  },
  {
    id: "travel",
    name: "Travel",
    icon: "✈️",
    title: "Where does your heart wander?",
    subtitle: "Find travel buddies who share your explorer spirit.",
    type: "multiselect",
    stateKey: "placePref",
    max: 99,
    accentClass: "chip-green",
    options: [
      "Mountains & Trekking", "Beach & Coastal", "Historical & Heritage",
      "Cities & Urban", "Forests & Wildlife", "Deserts & Offbeat",
      "Spiritual & Religious", "Adventure Parks", "Road Trips",
      "International Travel",
    ],
  },
  {
    id: "sports",
    name: "Sports",
    icon: "🏅",
    title: "Sports & fitness",
    subtitle: "Find gym partners, match players, or just someone to cheer with.",
    type: "multiselect",
    stateKey: "sports",
    max: 99,
    accentClass: "chip-orange",
    options: [
      "Cricket", "Football", "Basketball", "Badminton", "Tennis",
      "Volleyball", "Chess", "Table Tennis", "Swimming", "Athletics",
      "Gym & Fitness", "Yoga", "Cycling", "Martial Arts", "E-Sports",
      "No sports for me",
    ],
  },
  {
    id: "food",
    name: "Food & Hobbies",
    icon: "🍜",
    title: "Food & lifestyle",
    subtitle: "Foodies find their people faster. What's your plate like?",
    type: "food_hobbies",
    foodKey: "food",
    hobbiesKey: "hobbies",
    maxHobbies: 6,
    foodOptions: [
      "North Indian", "South Indian", "Street Food", "Chinese",
      "Italian", "Continental", "Vegan", "Vegetarian",
      "Junk Food Lover", "Healthy Eater", "Baker & Cooker", "Midnight Snacker",
    ],
    hobbyOptions: [
      "Reading", "Photography", "Music", "Gaming", "Coding",
      "Painting & Art", "Dancing", "Singing", "Writing", "Cooking",
      "Podcasts", "Movies & OTT", "Anime", "Memes & Reels",
      "Volunteering", "Gardening",
    ],
  },
  {
    id: "summary",
    name: "Done!",
    icon: "🚀",
    title: "You're all set!",
    subtitle: "Here's your profile snapshot. Hit Finish to find your people.",
    type: "summary",
  },
];

export const YEAR_OPTIONS = [
  "1st Year", "2nd Year", "3rd Year", "4th Year", "Postgrad / M.Tech", "PhD",
];

export const DEPT_OPTIONS = [
  "Computer Science", "Electronics & Comm.", "Mechanical", "Civil",
  "Electrical", "Chemical", "Mathematics", "Physics", "Management",
];

export const GENDER_OPTIONS = [
  { icon: "♂", label: "Male",           value: "M" },
  { icon: "♀", label: "Female",         value: "F" },
  { icon: "⚧", label: "Non-binary",     value: "NB" },
  { icon: "🔒", label: "Prefer not to say", value: "X" },
];

export const INITIAL_STATE = {
  gender: "",
  year: "",
  dept: "",
  fieldPref: [],
  placePref: [],
  sports: [],
  food: [],
  hobbies: [],
  personality: "",
  weekendPref: [],
};