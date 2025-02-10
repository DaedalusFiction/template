<template>
  <div class="grid grid-cols-12">
    <div class="col-span-4">
      <p>Add Images</p>
    </div>
    <div class="col-span-8">
      <input
        type="file"
        required
        @change="handleFileChange"
        style="color: white"
        id="screenshots"
      />
      <div class="flex flex-col gap-2">
        <img class="my-2" :src="previewUrl" alt="" />
        <div class="flex justify-end">
          <ButtonConfirm
            v-if="previewUrl"
            @confirm="handleAddImages"
            :critical="true"
            title="Add Image"
            text="Add this image to the game listing?"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["game", "gameID"]);
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "~/firebase.config";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref as sRef,
} from "firebase/storage";
const previewUrl = ref(null);
const images = ref([]);

const handleFileChange = (e) => {
  images.value = [e.target.files[0]];
  if (e.target.files[0]) {
    previewUrl.value = URL.createObjectURL(e.target.files[0]);
  } else {
    previewUrl.value = null;
  }
};

const handleAddImages = async () => {
  const downloadURLs = [];
  const docRef = doc(db, "games", props.gameID);

  for (const image of images.value) {
    const storageRef = sRef(storage, `images/${image.name}`);

    const uploadTask = uploadBytesResumable(storageRef, image);
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          downloadURLs.push(downloadURL);
          resolve();
        }
      );
    });
  }
  await updateDoc(docRef, {
    images: arrayUnion(downloadURLs[0]),
  });
  images.value = [];
  previewUrl.value = null;
  document.getElementById("screenshots").value = null;
};
</script>

<style scoped></style>
