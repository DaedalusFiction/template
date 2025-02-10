<template>
  <div class="max-w-screen-2xl mx-auto">
    <MetaStructuredData :games="games" />
    <GameHero v-if="hero" :game="hero" />
    <p v-else class="min-h-[68vh]">Loading</p>

    <div class="flex justify-between">
      <h4>Upcoming Titles</h4>
      <NuxtLink to="/games?order=dateUploaded-desc"
        ><p class="link">Browse &rsaquo;</p></NuxtLink
      >
    </div>
    <hr />
    <div class="games-grid">
      <div class="col-span-3" v-for="game in gameDocs.upcoming" :key="game.id">
        <GamePreview :game="game" />
      </div>
    </div>
    <div class="flex justify-between">
      <h4>New Releases</h4>
      <NuxtLink to="/games?order=releaseDate-desc"
        ><p class="link">Browse &rsaquo;</p></NuxtLink
      >
    </div>
    <hr />
    <div class="games-grid">
      <div
        class="col-span-3"
        v-for="game in gameDocs.latestReleased"
        :key="game.id"
      >
        <GamePreview :game="game" />
      </div>
    </div>
    <div class="flex justify-between">
      <h4>Gritty</h4>
      <NuxtLink :to="`/search?tag=gritty`"
        ><p class="link">Browse &rsaquo;</p></NuxtLink
      >
    </div>
    <hr />
    <div class="games-grid">
      <div class="col-span-3" v-for="game in gameDocs.gritty" :key="game.id">
        <GamePreview :game="game" />
      </div>
    </div>
    <div class="flex justify-between">
      <h4>Challenging</h4>
      <NuxtLink :to="`/search?tag=challenging`"
        ><p class="link">Browse &rsaquo;</p></NuxtLink
      >
    </div>
    <hr />
    <div class="games-grid">
      <div
        class="col-span-3"
        v-for="game in gameDocs.challenging"
        :key="game.id"
      >
        <GamePreview :game="game" />
      </div>
    </div>
    <div class="flex justify-between">
      <h4>grindy</h4>
      <NuxtLink :to="`/search?tag=grindy`"
        ><p class="link">Browse &rsaquo;</p></NuxtLink
      >
    </div>
    <hr />
    <div class="games-grid">
      <div class="col-span-3" v-for="game in gameDocs.grindy" :key="game.id">
        <GamePreview :game="game" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import useGetGames from "~/composables/getGames";
import { db } from "~/firebase.config";

const gamesRef = collection(db, "games");

const gameDocs = ref({
  upcoming: [],
  latestReleased: [],
  gritty: [],
  challenging: [],
  grindy: [],
});

const hero = await getDoc(doc(db, "featuredGames", "hero"));

const games = computed(() => [
  ...gameDocs.value.upcoming,
  ...gameDocs.value.latestReleased,
  ...gameDocs.value.gritty,
  ...gameDocs.value.challenging,
  ...gameDocs.value.grindy,
]);

const upcoming = await getDocs(
  query(
    gamesRef,
    orderBy("dateUploaded", "desc"),
    where("status", "in", ["In Development", "Early Access"]),
    limit(4)
  )
);
gameDocs.value.upcoming = upcoming.docs;

const latestReleased = await getDocs(
  query(
    gamesRef,
    orderBy("releaseDate", "desc"),
    where("status", "==", "Released"),
    limit(4)
  )
);
gameDocs.value.latestReleased = latestReleased.docs;

const gritty = await getDocs(
  query(gamesRef, where("_tags", "array-contains", "gritty"), limit(4))
);
gameDocs.value.gritty = gritty.docs;

const grindy = await getDocs(
  query(gamesRef, where("_tags", "array-contains", "grindy"), limit(4))
);
gameDocs.value.grindy = grindy.docs;

const challenging = await getDocs(
  query(gamesRef, where("_tags", "array-contains", "challenging"), limit(4))
);
gameDocs.value.challenging = challenging.docs;
</script>

<style scoped>
h4 {
  @apply text-[var(--color-text-muted)];
}
</style>
