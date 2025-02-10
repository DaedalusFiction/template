<template>
  <div v-for="(game, index) in games" :key="index" class="flex gap-2">
    <div class="grow">
      <div>
        <p class="link">
          <NuxtLink :href="`/games/${game.id}`">{{
            game.data().title
          }}</NuxtLink>
        </p>
      </div>
    </div>
    <IconsCancelCircle
      color="var(--color-secondary)"
      class="cursor-pointer transition hover:rotate-90 mt-2"
      @click="handleRemoveFromList(game.id)"
    />
  </div>
</template>

<script setup>
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import useRefreshUser from "~/composables/refreshUser";
import { db } from "~/firebase.config";

const { list, listName } = defineProps(["list", "listName"]);

const firebaseUser = useState("firebaseUser");
const firebaseID = useState("firebaseID");
const games = ref([]);

const handleRemoveFromList = async (gameId) => {
  const docRef = doc(db, "users", firebaseID.value);
  await updateDoc(docRef, { [listName]: arrayRemove(gameId) });
  await useRefreshUser();
  await getGames();
};

const getGames = async () => {
  let fetchedGames = [];
  await Promise.all(
    list.map(async (gameID) => {
      const game = await getDoc(doc(db, "games", gameID));
      if (game.exists()) {
        fetchedGames.push(game);
      }
    })
  );
  games.value = fetchedGames;
};

onMounted(async () => {
  if (firebaseUser.value) {
    await getGames();
  }
});
</script>

<style scoped></style>
