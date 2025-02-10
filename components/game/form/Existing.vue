<template>
  <InputDropdownListWrapper :title="game.title">
    <div class="flex flex-col gap-2">
      <div v-if="admin">
        <GameInputImage
          v-if="props.collection === 'games'"
          :game="game"
          :gameID="gameID"
        />
        <GameInputExternalLink
          v-if="props.collection === 'games'"
          @update="handleUpdateDocs"
          :game="game"
          :gameID="gameID"
        />
      </div>
      <GameInputFields :formData="formData" :admin="admin" />
      <div class="flex gap-2 justify-end">
        <ButtonConfirm
          @confirm="handleUpdateDoc"
          title="Update"
          :critical="true"
          text="Update this game listing?"
        />
        <ButtonConfirm
          v-if="admin"
          @confirm="handleDeleteDoc"
          title="Delete"
          :critical="true"
          text="Delete this game listing?"
        />
        <ButtonConfirm
          v-if="admin"
          @confirm="handleSetAsHero"
          title="Set as Hero"
          :critical="true"
          text="Set as Hero?"
        />
        <ButtonConfirm
          v-if="admin"
          @confirm="handleSetAsFeaturedSuggestion"
          title="Set as Featured Suggestion"
          :critical="true"
          text="Set as Featured Suggestion?"
        />
        <ButtonConfirm
          v-if="props.collection === 'contributions'"
          @confirm="handlePublishDoc"
          title="Publish"
          :critical="true"
          text="Publish this contribution?"
        />
      </div>
    </div>
  </InputDropdownListWrapper>
</template>

<script setup>
import { ref } from "vue";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "~/firebase.config";
import useSnackbar from "~/composables/showSnackbar";

const props = defineProps(["game", "collection", "gameID", "admin"]);
const emit = defineEmits(["update"]);
const formData = ref({});
const docRef = doc(db, props.collection, props.gameID);

onMounted(() => {
  formData.value = props.game;
});

const handleDeleteDoc = async () => {
  await deleteDoc(docRef);
  emit("update");
};

const handleSetAsHero = async () => {
  const folderRef = doc(db, "featuredGames", "hero");
  const setTask = setDoc(folderRef, { ...props.game, gameID: props.gameID });
  useSnackbar("Hero set!");
};
const handleSetAsFeaturedSuggestion = async () => {
  const folderRef = doc(db, "featuredGames", "suggested");
  const setTask = setDoc(folderRef, { ...props.game, gameID: props.gameID });
  useSnackbar("Featured Suggestion Set!");
};

const handleUpdateDoc = async () => {
  await updateDoc(docRef, formData.value);
  useSnackbar("Game Updated!");
  emit("update");
};

const handleUpdateDocs = async () => {
  emit("update");
};

const handlePublishDoc = async () => {
  await addDoc(collection(db, "games"), formData.value);
  emit("update");
};
</script>

<style scoped>
h4 {
  @apply my-0;
}
.options button,
.options a {
  @apply border-slate-200 brightness-105 border rounded-sm py-1 px-2 transition bg-backgroundAccent hover:bg-white;
}

.field {
  @apply md:grid grid-cols-12 gap-4 mb-2;
}

input[type="checkbox"] {
  @apply w-4 h-4 text-white bg-gray-100 border-gray-300 rounded focus:ring-[var(--color-dark-muted)] focus:ring-2;
  accent-color: var(--color-primary);
}
</style>
