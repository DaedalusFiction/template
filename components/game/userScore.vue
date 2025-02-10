<template>
  <div class="flex gap-1">
    <div class="flex relative" @mouseleave="handleMouseLeave">
      <div
        v-for="index in 5"
        :key="index"
        @click="handleReviewGame(index)"
        @mouseover="handleMouseOver(index)"
      >
        <IconsStar
          color="white"
          class="z-10 cursor-pointer"
          :fill="
            hoveredStarIndex >= index || userScore >= index
              ? 'var(--color-primary)'
              : 'transparent'
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useSnackbar from "~/composables/showSnackbar";
import { db } from "~/firebase.config";

const props = defineProps(["game", "gameId"]);
const firebaseUser = useState("firebaseUser");
const firebaseID = useState("firebaseID");
const hoveredStarIndex = ref(null);
const userReview = ref(null);
const userScore = ref(0);

const handleMouseOver = (index) => {
  hoveredStarIndex.value = index;
};
const handleMouseLeave = () => {
  hoveredStarIndex.value = null;
};

watchEffect(async () => {
  if (firebaseUser.value) {
    try {
      const reviews = await getDocs(
        query(
          collection(db, "games", props.gameId, "reviews"),
          where("user", "==", firebaseID.value)
        )
      );
      userReview.value = reviews.docs[0];
      userScore.value = reviews.docs[0]?.data().score || 0;
    } catch (error) {
      useSnackbar("Something went wrong.");
    }
  }
}, [firebaseUser]);

const handleReviewGame = async (index) => {
  if (!firebaseID.value) {
    useSnackbar("Log in to use this feature.");
    return;
  }
  try {
    if (userReview.value) {
      const review = await updateDoc(
        doc(db, "games", props.gameId, "reviews", userReview.value.id),
        { score: index }
      );
      userScore.value = index;
      useSnackbar("Review Updated!");
    } else {
      const review = await addDoc(
        collection(db, "games", props.gameId, "reviews"),
        { user: firebaseID.value, score: index }
      );
      userScore.value = index;
      useSnackbar("Review Updated!");
    }
  } catch {
    useSnackbar("Something went wrong.");
  }
};
</script>

<style lang="scss" scoped></style>
