<template>
  <div></div>
</template>

<script setup>
import { siteName, siteURL } from "~/data";

const { games } = defineProps(["games"]);

useJsonld({
  "@context": "https://schema.org",
  "@type": "Thing",
  name: "static json",
});

const itemList = games.map((game) => ({
  "@type": "VideoGame",
  name: game.data().title,
  description: game.data().synopsis || game.data().description || "",
  url: `https://www.${siteURL}/games/${game.id}`,
  image: game.data().images[0],
  publisher: {
    "@type": "Organization",
    name: game.data().publisher,
  },
  genre: ["First-Person Shooter"],
  keywords: game.data()._tags,
}));

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  description:
    "Comprehensive online database for metroidvania video games. Search by game properties, tags, or developer to find the perfect game to play.",
  url: `https://www.${siteURL}`,
  image: `https://www.${siteURL}/images/mvdblogo.webp`,
  publisher: {
    "@type": "Organization",
    name: "Fictional Web, LLC",
    url: "https://www.fictionalweb.com",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `https://www.${siteURL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: itemList,
  },
  hasPart: [
    {
      "@type": "WebPage",
      name: "Games",
      description: "Browse metroidvania video games",
      url: `https://www.${siteURL}/games`,
    },
    {
      "@type": "WebPage",
      name: "Search",
      description:
        "Search for metroidvania video games by name, tag, property, or developer",
      url: `https://www.${siteURL}/search`,
    },
    {
      "@type": "WebPage",
      name: "About",
      description: "Information about the website",
      url: `https://www.${siteURL}/about`,
    },
    {
      "@type": "WebPage",
      name: "Contributions",
      description: "Contribute new games to the database",
      url: `https://www.${siteURL}/contribute`,
    },
    {
      "@type": "WebPage",
      name: "User Accounts",
      description:
        "Create an account to manage your game collection and wishlist",
      url: `https://www.${siteURL}/account`,
    },
    {
      "@type": "WebPage",
      name: "Terms of Service",
      description: "View our Terms of Service",
      url: `https://www.${siteURL}/terms-of-service`,
    },
    {
      "@type": "WebPage",
      name: "Privacy Policy",
      description: "View our Privacy Policy",
      url: `https://www.${siteURL}/privacy-policy`,
    },
    {
      "@type": "WebPage",
      name: "My Lists",
      description: "View your collection and wishlist",
      url: `https://www.${siteURL}/my-lists`,
    },
    {
      "@type": "WebPage",
      name: "Leaderboard",
      description: "View leaderboard of user contributions",
      url: `https://www.${siteURL}/leaderboard`,
    },
  ],
};
useJsonld(() => structuredData);
</script>

<style scoped></style>
