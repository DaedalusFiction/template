const proteins = [
  {
    name: "Chicken Katsu",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description:
      "Chicken breast medallions breaded in panko and deep fried. Served with katsu sauce, which is a Japanese BBQ sauce.",
  },
  {
    name: "Mochiko Chicken",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description:
      "Nuggets of dark meat chicken marinated in garlic, ginger, soy*, and mochiko (rice) flour, then deep fried. Served with Mochiko sauce, which is similar to yum yum sauce.",
  },
  {
    name: "Hawaiian BBQ Chicken",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description:
      "Charbroiled chicken thighs marinated in our homemade teriyaki BBQ sauce (G/F). Served with extra teriyaki BBQ sauce on the side.",
  },
  {
    name: "Teriyaki Beef",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description:
      "Grilled tender thinly-sliced beef marinated in our tangy teriyaki* BBQ sauce. Served with extra teriyaki BBQ sauce on the side.",
  },
  {
    name: "Tempura Shrimp",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description:
      "Panko-crusted, deep-fried shrimp. Served with tempura dipping sauce.",
  },
  {
    name: "Asian Kale Quinoa Patties",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description:
      "Grilled quinoa cakes with kale, scallions, and a touch of sesame oil. Served with Mochiko sauce.",
  },
  {
    name: "Teriyaki Tofu",
    allergens: [""],
    isRaw: false,
    isVegan: true,
    description:
      "Extra-firm tofu, grilled and glazed with our homemade teriyaki* sauce. Served with extra sauce on the side.",
  },
];

const rices = [
  { name: "White", allergens: [""], isRaw: false, isVegan: false },
  { name: "Brown", allergens: [""], isRaw: false, isVegan: false },
  { name: "Fried", allergens: [""], isRaw: false, isVegan: false },
];

const sides = [
  {
    name: "Hawaiian Macaroni Salad",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
  {
    name: "Sesame Green Beans",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
  {
    name: "Spicy Garlic Green Beans",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
  {
    name: "Soba Noodle Salad",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
  {
    name: "Asian Slaw",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
  {
    name: "Cucumber Kimchi",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
  {
    name: "Watercress & Sesame Salad",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
  {
    name: "Edamame (shelled)",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
  {
    name: "Just Corn",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
];

const addons = [
  {
    name: "Tempura Shrimp",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
  {
    name: "Ahi Tuna Poke",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
  {
    name: "Japanese Curry Sauce",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
  {
    name: "Furikake Rice Seasoning",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
  {
    name: "Extra Sauces",
    allergens: [""],
    isRaw: false,
    isVegan: false,
  },
];
const pokeBowls = [
  {
    header: "Dragon Bowl",
    ingredients: [
      "Tuna Poke",
      "White rice",
      "Cucumber kimchee",
      "Sriracha Mayo",
    ],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/poke8.webp", alt: "poke" },

    text: "Chicken breast medallions breaded in panko, and deep fried. Served with white rice, and Japanese curry sauce on the side. ",
    href: "/menu",
  },
  {
    header: "Crunchy Tuna Poke Bowl",
    ingredients: [
      "Tuna Poke",
      "White rice",
      "Edamame",
      "Crunchy onion topping",
    ],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/poke9.webp", alt: "poke" },
    text: "Chicken breast medallions breaded in panko, and deep fried. Served with white rice, and Japanese curry sauce on the side. ",
    href: "/menu",
  },
  {
    ingredients: [
      "Tuna Poke",
      "White rice",
      "Cucumber kimchee",
      "Sriracha mayo",
    ],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/poke10.webp", alt: "poke" },
    header: "Poke Bowl Deluxe",
    text: "Chicken breast medallions breaded in panko, and deep fried. Served with white rice, and Japanese curry sauce on the side. ",
    href: "/menu",
  },
  {
    header: "Just Poke and Rice",
    ingredients: ["Tuna Poke", "White rice"],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/poke11.webp", alt: "poke" },
    text: "Chicken breast medallions breaded in panko, and deep fried. Served with white rice, and Japanese curry sauce on the side. ",
    href: "/menu",
  },
];
const kidsMeals = [
  {
    header: "Mochiko Chicken",
    allergens: [""],
    image: { src: "/images/poke11.webp", alt: "poke" },
    text: "Chicken breast medallions breaded in panko, and deep fried. Served with white rice, and Japanese curry sauce on the side. ",
    href: "/menu",
    isRaw: false,
    isVegan: false,
  },
  {
    header: "Chicken Katsu",
    allergens: [""],
    image: { src: "/images/poke11.webp", alt: "poke" },
    text: "Chicken breast medallions breaded in panko, and deep fried. Served with white rice, and Japanese curry sauce on the side. ",
    href: "/menu",
    isRaw: false,
    isVegan: false,
  },
  {
    header: "Hawaiian BBQ Chicken",
    allergens: [""],
    image: { src: "/images/poke11.webp", alt: "poke" },
    text: "Chicken breast medallions breaded in panko, and deep fried. Served with white rice, and Japanese curry sauce on the side. ",
    href: "/menu",
    isRaw: false,
    isVegan: false,
  },
  {
    header: "Teriyaki Beef",
    allergens: [""],
    image: { src: "/images/poke11.webp", alt: "poke" },
    text: "Chicken breast medallions breaded in panko, and deep fried. Served with white rice, and Japanese curry sauce on the side. ",
    href: "/menu",
    isRaw: false,
    isVegan: false,
  },
  {
    header: "Teriyaki Tofu",
    allergens: [""],
    image: { src: "/images/poke11.webp", alt: "poke" },
    text: "Chicken breast medallions breaded in panko, and deep fried. Served with white rice, and Japanese curry sauce on the side. ",
    href: "/menu",
    isRaw: false,
    isVegan: false,
  },
];
const desserts = [
  {
    header: "Lilikoi Meringue Pie",
    allergens: [""],
    image: { src: "/images/poke11.webp", alt: "poke" },
    text: "Chicken breast medallions breaded in panko, and deep fried. Served with white rice, and Japanese curry sauce on the side. ",
    href: "/menu",
    isRaw: false,
    isVegan: false,
  },
  {
    header: "Chocolate/Coconut Cream Pie",
    allergens: [""],
    image: { src: "/images/poke11.webp", alt: "poke" },
    text: "Chicken breast medallions breaded in panko, and deep fried. Served with white rice, and Japanese curry sauce on the side. ",
    href: "/menu",
    isRaw: false,
    isVegan: false,
  },
  {
    header: "Lilikoi Short Bread",
    allergens: [""],
    image: { src: "/images/poke11.webp", alt: "poke" },
    text: "Chicken breast medallions breaded in panko, and deep fried. Served with white rice, and Japanese curry sauce on the side. ",
    href: "/menu",
    isRaw: false,
    isVegan: false,
  },
];

export { proteins, rices, sides, addons, pokeBowls, kidsMeals, desserts };
