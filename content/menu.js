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
    description:
      "Cold macaroni salad with shredded carrots, in a creamy mayo dressing",
  },
  {
    name: "Sesame Green Beans",
    allergens: [""],
    isRaw: false,
    isVegan: true,
    description: "Blanched green beans tossed in soy, mirin, and sesame",
  },
  {
    name: "Spicy Garlic Green Beans",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description:
      "Blanched green beans tossed with our homemade spicy garlic sauce",
  },
  {
    name: "Soba Noodle Salad",
    allergens: [""],
    isRaw: false,
    isVegan: true,
    description:
      "Soba (buckwheat) noodles tossed in our house yuzu citrus vinaigrette",
  },
  {
    name: "Asian Slaw",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description:
      "Shredded cabbage, carrots, kale, tossed in our house creamy sesame dressing",
  },
  {
    name: "Cucumber Kimchi",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description:
      "Fresh cucumbers marinated in a spicy and tangy kimchee sauce (contains anchovy)",
  },
  {
    name: "Watercress & Sesame Salad",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description:
      "Blanched watercress seasoned with sesame oil and toasted sesame seeds",
  },
  {
    name: "Edamame (shelled)",
    allergens: [""],
    isRaw: false,
    isVegan: true,
    description: "",
  },
  {
    name: "Just Corn",
    allergens: [""],
    isRaw: false,
    isVegan: true,
    description: "",
  },
];

const addons = [
  {
    name: "Tempura Shrimp",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description:
      "Panko-crusted deep fried shrimp. Served with tempura dipping sauce",
  },
  {
    name: "Ahi Tuna Poke",
    allergens: [""],
    isRaw: true,
    isVegan: false,
    description: "Sushi-grade tuna marinated in soy, sesame oil, and scallions",
  },
  {
    name: "Japanese Curry Sauce",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description: "",
  },
  {
    name: "Furikake Rice Seasoning",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description: "",
  },
  {
    name: "Extra Sauces",
    allergens: [""],
    isRaw: false,
    isVegan: false,
    description: "",
  },
];
const pokeBowls = [
  {
    header: "Item One",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains2.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Two",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains3.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Three",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains4.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Four",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
];
const kidsMeals = [
  {
    header: "Item One",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains2.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Two",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains3.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Three",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains4.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Four",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
];
const desserts = [
  {
    header: "Item One",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains2.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Two",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains3.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Three",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains4.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Four",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
];
const extras = [
  {
    header: "Item One",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains2.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Two",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains3.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Three",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains4.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Four",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
];

const menuPreview = [
  {
    header: "Item One",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains2.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Two",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains3.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Three",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains4.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
  {
    header: "Item Four",
    ingredients: [],
    allergens: [""],
    isRaw: true,
    isVegan: false,
    image: { src: "/images/mountains.webp", alt: "mountains" },

    description: "This is the description",
    href: "/menu",
  },
];

export {
  proteins,
  rices,
  sides,
  addons,
  pokeBowls,
  kidsMeals,
  desserts,
  extras,
  menuPreview,
};
