const siteName = "MetroidvaniaDB";
const siteURL = "metroidvaniadb.com";
const siteDescription = "Metroidvania video game database";
const GTag = "G-E4YC14RF1L";

const filters = {
  images: [],
  platforms: [],
  _tags: [],
  properties: [],
};

const emptyForm = {
  ...filters,
  description: "",
  synopsis: "",
  title: "",
  developer: "",
  publisher: "",
  releaseDate: "",
  rating: "",
};

const propertyOptions = [
  "Physical Release",
  "Multiple Difficulties",
  "Has DLC",
  "Endless mode",
  "Boss Rush Mode",
  "Equipment System",
  "Custom Controls",
  "In-Game Map",
  "Local Multiplayer",
  "Online Multiplayer",
  "Online Leaderboards",
  "Speedrun Options",
];

const platformOptions = [
  "Nintendo Entertainment System (NES)",
  "Super Nintendo Entertainment System (SNES)",
  "Game Boy",
  "Game Boy Color",
  "Game Boy Advance",
  "Nintendo 64",
  "Nintendo GameCube",
  "Nintendo DS",
  "Nintendo 3DS",
  "Nintendo Wii",
  "Nintendo Wii U",
  "Nintendo Switch",
  "Nintendo Virtual Console",
  "PlayStation",
  "PlayStation 2",
  "PlayStation 3",
  "PlayStation 4",
  "PlayStation 5",
  "PlayStation Portable (PSP)",
  "PlayStation Vita",
  "Xbox",
  "Xbox 360",
  "Xbox One",
  "Xbox Series X|S",
  "Sega Genesis",
  "Sega Dreamcast",
  "Sega Game Gear",
  "PC",
  "other",
];

const tagOptions = [
  "ability absorption",
  "aerial combat",
  "bestiary",
  "bright visuals",
  "challenging",
  "claustrophobic",
  "collectibles",
  "corpse runs",
  "crafting",
  "dark",
  "dash",
  "dimension shifting",
  "double jump",
  "environmental puzzles",
  "environmental storytelling",
  "fantasy",
  "grappling hook",
  "grindy",
  "gritty",
  "hidden areas",
  "hand-drawn art",
  "horror",
  "igavania",
  "interconnected world",
  "melancholy",
  "minimalist narrative",
  "multiple playable characters",
  "mysterious",
  "permadeath",
  "physics-based",
  "pixel art",
  "platformer",
  "post-apocalyptic",
  "resource management",
  "rocket jump",
  "roguelike elements",
  "sci-fi",
  "sequence breaking",
  "shape-shifting",
  "shooter",
  "silent protagonist",
  "skill tree",
  "souls-like",
  "survival",
  "teleport mechanics",
  "time travel mechanics",
  "varied biomes",
  "wall jump",
];

const ratingOptions = ["E", "E10+", "T", "M", "AO", "RP", "other"];
const statusOptions = [
  "Released",
  "Early Access",
  "In Development",
  "Cancelled",
  "Unknown",
];

const externalSites = ["GamersGate", "Other"];

const primaryPerspectiveOptions = [
  "first-person",
  "third-person",
  "isometric",
  "over-the-shoulder",
  "side-scroller",
  "top-down",
  "other",
];

export {
  primaryPerspectiveOptions,
  GTag,
  siteName,
  siteDescription,
  siteURL,
  filters,
  emptyForm,
  platformOptions,
  propertyOptions,
  ratingOptions,
  tagOptions,
  statusOptions,
  externalSites,
};
