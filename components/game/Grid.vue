<template>
  <div>
    <h2 class="page-header">{{ status }}</h2>
    <MetaStructuredData v-if="games && games.length > 0" :games="games" />
    <div class="flex flex-wrap-reverse md:grid grid-cols-12 gap-4">
      <div class="col-span-9 grow">
        <div class="grid grid-cols-12 gap-3">
          <div
            class="col-span-12 sm:col-span-6 lg:col-span-4"
            v-for="game in games"
            :key="game.id"
          >
            <GamePreview :game="game" />
          </div>
          <div class="col-span-12 flex justify-center">
            <button
              v-if="gamesShown < totalDocs"
              @click="handleLoadMoreGames"
              class="btn w-full"
            >
              More Games
            </button>
            <p v-else>
              Don't see your game listed?
              <NuxtLink href="/search" class="link underline">Search</NuxtLink>
              or fill out our
              <NuxtLink class="link underline" href="/contribute"
                >Contribution Form</NuxtLink
              >
            </p>
          </div>
        </div>
      </div>
      <div class="col-span-3 relative w-full">
        <div class="card sticky top-36">
          <div>
            <label for="sort-dropdown"><p class="mb-2">Sort By:</p></label>
            <select id="sort-dropdown" v-model="selectedOption">
              <option
                v-for="option in sortOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
          <br />
          <NuxtLink to="/search"
            ><p class="link underline">Advanced Search</p></NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "~/firebase.config";
const { status } = defineProps(["status"]);
const route = useRoute();
const orderQuery = route.query.order;

const sortOptions = [
  { name: "Alphabetical (a-z)", value: "title-asc" },
  { name: "Alphabetical (z-a)", value: "title-desc" },
  { name: "Uploaded (newest first)", value: "dateUploaded-desc" },
  { name: "Uploaded (oldest first)", value: "dateUploaded-asc" },
  { name: "Release Date (newest first)", value: "releaseDate-desc" },
  {
    name: "Release Date (oldest first)",
    value: "releaseDate-asc",
  },
];

const orderQueryOption = sortOptions.find(
  (option) => orderQuery === option.value
);

const selectedOption = ref(orderQueryOption?.value || sortOptions[2].value);
const gamesShown = ref(12);
const totalDocs = ref(0);
const games = ref([]);

const getGames = async (sortOption) => {
  const sortOptionArray = sortOption.split("-");
  const collectionRef = collection(db, "games");
  let gamesQuery, totalQuery;
  if (status === "upcoming") {
    gamesQuery = query(
      collectionRef,
      where("status", "in", ["In Development", "Early Access"]),
      orderBy(sortOptionArray[0], sortOptionArray[1]),
      limit(gamesShown.value)
    );
    totalQuery = query(
      collectionRef,
      where("status", "in", ["In Development", "Early Access"]),
      orderBy(sortOptionArray[0], sortOptionArray[1])
    );
  } else {
    gamesQuery = query(
      collectionRef,
      // where("status", "not-in", ["In Development", "Early Access"]),
      orderBy(sortOptionArray[0], sortOptionArray[1]),
      limit(gamesShown.value)
    );
    totalQuery = query(
      collectionRef,
      // where("status", "not-in", ["In Development", "Early Access"]),
      orderBy(sortOptionArray[0], sortOptionArray[1])
    );
  }
  const gamesSnapshot = await getDocs(gamesQuery);
  games.value = gamesSnapshot.docs;
  const countSnapshot = await getCountFromServer(totalQuery);
  totalDocs.value = countSnapshot.data().count;
  console.log(countSnapshot.data().count);
};

const handleLoadMoreGames = () => {
  gamesShown.value += 12;
};

watch(selectedOption, () => {
  window.scrollTo(0, 0);
  gamesShown.value = 12;
  getGames(selectedOption.value);
});
watch(gamesShown, () => {
  getGames(selectedOption.value);
});
getGames(selectedOption.value);
</script>

<style scoped></style>
