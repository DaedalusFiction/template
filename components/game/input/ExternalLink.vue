<template>
  <div class="col-span-4">
    <p>Add External Link</p>
  </div>
  <div
    class="flex justify-between gap-4"
    v-for="(externalLink, index) in game.externalLinks"
    :key="index"
  >
    <p>{{ externalLink.externalSite }}</p>
    <IconsCancelCircle
      @click="handleRemoveExternalLink(externalLink)"
      class="hover:rotate-90 transition cursor-pointer"
      color="white"
    />
  </div>
  <div class="col-span-8">
    <select class="my-3" name="" id="" v-model="externalSite">
      <option
        v-for="(externalSiteOption, index) in externalSites"
        :key="index"
        :value="externalSiteOption"
      >
        {{ externalSiteOption }}
      </option>
    </select>
    <input
      class="mb-3"
      type="text"
      v-model="externalLink"
      placeholder="Add URL..."
    />
    <ButtonConfirm
      @confirm="handleAddExternalLink"
      :critical="true"
      text="Add URL?"
      title="Add"
    />
  </div>
</template>

<script setup>
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { externalSites } from "~/data";
import { db } from "~/firebase.config";
const props = defineProps(["game", "gameID"]);
const emit = defineEmits(["update"]);
const externalSite = ref(externalSites[0]);
const externalLink = ref("");
const docRef = doc(db, "games", props.gameID);

const handleAddExternalLink = async () => {
  console.log(props.game.externalLinks);
  const update = {
    externalSite: externalSite.value,
    externalLink: externalLink.value,
  };
  if (props.game.externalLinks) {
    console.log("Updating Existing");
    await updateDoc(docRef, {
      externalLinks: arrayUnion(update),
    });
  } else {
    console.log("Creating New");
    await updateDoc(docRef, {
      externalLinks: [update],
    });
  }
  externalLink.value = "";
  emit("update");
};

const handleRemoveExternalLink = async (externalLink) => {
  await updateDoc(docRef, {
    externalLinks: arrayRemove({
      externalSite: externalLink.externalSite,
      externalLink: externalLink.externalLink,
    }),
  });
};
</script>

<style scoped></style>
