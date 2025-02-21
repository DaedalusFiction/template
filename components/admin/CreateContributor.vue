<template>
  <div v-if="!submitted">
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input id="name" v-model="formData.name" required type="text" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="bio">
          Bio
        </label>
        <textarea id="bio" v-model="formData.bio" rows="4" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
          Select Image
        </label>
        <input
          required
          id="image"
          accept=".jpg,.jpeg,.webp"
          type="file"
          @change="handleSelectImage"
        />
        <p class="text-[var(--color-text-muted)] text-xs italic">
          File name must end in .jpg, .jpeg, or .webp
        </p>
      </div>

      <button class="btn" type="submit">Submit</button>
    </form>
  </div>
  <div class="" v-else>
    <h4>Contributor listing created!</h4>
  </div>
</template>

<script setup>
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ref as firebaseRef } from "firebase/storage";
import { db, storage } from "~/firebase.config";

const emptyForm = {
  name: "",
  bio: "",
};
const submitted = ref(false);
const formData = ref(emptyForm);

const imageFile = ref(null);

const handleSelectImage = (event) => {
  imageFile.value = event.target.files[0];
};
const submitForm = async () => {
  if (imageFile.value) {
    const imageFileRef = firebaseRef(
      storage,
      `contributors/${imageFile.value.name}`
    );

    const uploadImageTask = uploadBytesResumable(imageFileRef, imageFile.value);

    uploadImageTask.on(
      "state_changed",
      () => {},
      () => {},
      async () => {
        await getDownloadURL(uploadImageTask.snapshot.ref).then(
          async (imageDownloadURL) => {
            await addDoc(collection(db, "contributors"), {
              name: formData.value.name,
              bio: formData.value.bio,
              URLs: [imageDownloadURL],

              dateUploaded: Date.now(),
            });
            formData.value = emptyForm;
            submitted.value = true;
          }
        );
      }
    );
  }
};
</script>

<style scoped>
input[type="text"],
textarea {
  @apply block p-2.5 shadow w-full text-sm bg-gray-50 rounded-lg border;
}
</style>
