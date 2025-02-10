<template>
  <div class="border-b my-3">
    <h4>You may also like...</h4>
  </div>
  <div class="md:grid grid-cols-12 gap-4">
    <div class="col-span-3">
      <GamePreview v-if="featuredSuggestion" :game="featuredSuggestion" />
    </div>
    <div
      v-for="(game, index) in suggestedGames.slice(0, 3)"
      :key="index"
      class="col-span-3"
    >
      <GamePreview :game="game" />
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
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "~/firebase.config";

const { game } = defineProps(["game"]);
const suggestedGames = ref([]);

const featuredSuggestionTask = await getDoc(
  doc(db, "featuredGames", "suggested")
);
const featuredSuggestion = ref(featuredSuggestionTask);

const games = await getDocs(
  query(
    collection(db, "games"),
    where("_tags", "array-contains", game.data()._tags[0] || "dark"),
    orderBy("dateUploaded", "desc"),
    startAfter(game),
    limit(3)
  )
);
suggestedGames.value = games.docs;
if (games.docs.length < 4) {
  const additionalSuggestions = await getDocs(
    query(
      collection(db, "games"),
      where("status", "in", ["Released"]),
      orderBy("dateUploaded", "desc"),
      limit(4)
    )
  );
  suggestedGames.value = [
    ...suggestedGames.value,
    ...additionalSuggestions.docs,
  ];
}
</script>

<style scoped></style>
