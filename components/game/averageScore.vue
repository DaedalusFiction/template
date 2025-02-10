<template>
  <div class="flex gap-1" :title="averageScore?.toFixed(1)">
    <div class="flex relative">
      <div v-for="index in 5" :key="index">
        <IconsStar color="white" class="z-10" fill="transparent" />
      </div>
      <div
        class="absolute top-0 left-0 h-full bg-primary"
        :style="`width: ${averageScore * 20}%`"
      />
    </div>
  </div>
</template>

<script setup>
import {
  average,
  collection,
  getAggregateFromServer,
} from "firebase/firestore";
import useSnackbar from "~/composables/showSnackbar";
import { db } from "~/firebase.config";
const route = useRoute();
const props = defineProps(["game"]);
const averageScore = ref(0);

onMounted(async () => {
  const reviewsRef = collection(db, "games", route.params.id, "reviews");
  const averageScoreFromServer = await getAggregateFromServer(reviewsRef, {
    score: average("score"),
  });
  try {
    averageScore.value = averageScoreFromServer.data().score;
  } catch (error) {
    useSnackbar("Something went wrong.");
  }
});
</script>

<style scoped></style>
