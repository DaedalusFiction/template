<template>
  <div>
    <LayoutPageHeader header="Articles" />

    <div class="md:grid grid-cols-12 max-w-screen-2xl gap-3 px-3 mx-auto pt-3">
      <div
        v-for="(article, index) in articles"
        :key="index"
        class="col-span-3 mb-6"
      >
        <LayoutArticlePreview :article="article" />
      </div>
    </div>
    <!-- <div class="md:grid grid-cols-12 max-w-screen-2xl gap-3 px-3 mx-auto pt-3">
        <div v-for="(card, index) in cards" :key="index" class="col-span-3 mb-6">
          <LayoutCard :card="card" />
          
        </div>
      </div> -->
  </div>
</template>

<script setup>
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "~/firebase.config";

const articles = ref([]);

const articlesRef = collection(db, "articles");
onMounted(async () => {
  const articlesQuery = query(articlesRef, orderBy("dateUploaded", "desc"));
  const snapshot = await getDocs(articlesQuery);
  articles.value = snapshot.docs;
  console.log(articles.value[0].data().title);
});
const cards = [
  {
    image: { src: "images/mountains.webp", alt: "Mountains" },
    header: "Item One",
    text: "This is the first item's text",
    href: "/",
  },
  {
    image: { src: "images/mountains2.webp", alt: "Mountains" },
    header: "Item Two",
    text: "This is the second item's text",
    href: "/",
  },
  {
    image: { src: "images/mountains3.webp", alt: "Mountains" },
    header: "Item Three",
    text: "This is the third item's text",
    href: "/",
  },
  {
    image: { src: "images/mountains.webp", alt: "Mountains" },
    header: "Item One",
    text: "This is the first item's text",
    href: "/",
  },
  {
    image: { src: "images/mountains2.webp", alt: "Mountains" },
    header: "Item Two",
    text: "This is the second item's text",
    href: "/",
  },
  {
    image: { src: "images/mountains3.webp", alt: "Mountains" },
    header: "Item Three",
    text: "This is the third item's text",
    href: "/",
  },
  {
    image: { src: "images/mountains.webp", alt: "Mountains" },
    header: "Item One",
    text: "This is the first item's text",
    href: "/",
  },
  {
    image: { src: "images/mountains2.webp", alt: "Mountains" },
    header: "Item Two",
    text: "This is the second item's text",
    href: "/",
  },
  {
    image: { src: "images/mountains3.webp", alt: "Mountains" },
    header: "Item Three",
    text: "This is the third item's text",
    href: "/",
  },
  {
    image: { src: "images/mountains.webp", alt: "Mountains" },
    header: "Item One",
    text: "This is the first item's text",
    href: "/",
  },
  {
    image: { src: "images/mountains2.webp", alt: "Mountains" },
    header: "Item Two",
    text: "This is the second item's text",
    href: "/",
  },
  {
    image: { src: "images/mountains3.webp", alt: "Mountains" },
    header: "Item Three",
    text: "This is the third item's text",
    href: "/",
  },
];
</script>

<style lang="scss" scoped></style>
