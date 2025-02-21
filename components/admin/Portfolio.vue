<template>
  <div>
    <h1>Create Book Listing</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="title"> Title </label>
        <input id="title" v-model="formData.title" required type="text" />
      </div>
      <div class="mb-4">
        <label for="author"> Author </label>
        <input id="author" v-model="formData.author" required type="text" />
      </div>
      <div class="mb-4">
        <label for="publisher">Publisher</label>
        <input
          id="publisher"
          v-model="formData.publisher"
          required
          type="text"
        />
      </div>
      <div class="mb-4">
        <label for="yearPublished">Year Published</label>
        <input
          id="yearPublished"
          v-model="formData.yearPublished"
          required
          type="text"
        />
      </div>
      <div class="mb-4">
        <label for="genre">Genre</label>
        <input id="genre" v-model="formData.genre" required type="text" />
      </div>
      <div class="mb-4">
        <label for="href">Purchase Link</label>
        <input
          id="href"
          v-model="formData.href"
          required
          type="text"
          placeholder="https://"
        />
      </div>
      <div class="mb-4">
        <label for="text">Description</label>
        <textarea
          id="description"
          v-model="formData.description"
          rows="4"
          class="block p-2.5 w-full bg-gray-50 shadow rounded-lg border"
        />
      </div>

      <div class="mb-4 flex flex-col sm:flex-row gap-3">
        <div class="w-32">
          <img
            v-if="imageFilePreview"
            :src="imageFilePreview"
            class="image-container"
            alt=""
          />
          <div v-else class="bg-gray-300 border flex h-full items-center p-2">
            <p class="text-center">No Image Selected</p>
          </div>
        </div>
        <div>
          <label class="block font-bold mb-2" for="image"> Select Image </label>
          <input
            required
            id="image"
            accept=".jpg,.jpeg,.webp"
            type="file"
            @change="handleSelectImage"
          />
          <p class="text-[var(--color-text-muted)] text-xs italic">
            File name must end in .jpg, .jpeg, or .webp. Maximum file size: 1MB
          </p>
        </div>
      </div>

      <button class="btn" type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ref as firebaseRef } from "firebase/storage";
import useSnackbar from "~/composables/showSnackbar";
import { db, storage } from "~/firebase.config";
const emptyForm = {
  title: "",
  author: "",
  alt: "",
  description: "",
  publisher: "",
  yearPublished: "",
  href: "",
};
const formData = ref(emptyForm);
const imageFile = ref(null);
const imageFilePreview = ref(null);

const handleSelectImage = (event) => {
  imageFile.value = event.target.files[0];
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      //$('#blah').attr('src', e.target.result);
      imageFilePreview.value = e.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
  } else {
    imageFilePreview.value = null;
  }
};
const submitForm = async () => {
  if (imageFile.value) {
    const imageFileRef = firebaseRef(
      storage,
      `portfolio/${Date.now() + imageFile.value.name}`
    );

    const uploadImageTask = uploadBytesResumable(imageFileRef, imageFile.value);

    //TODO: Fix this so that it awaits the image upload before uploading md file

    uploadImageTask.on(
      "state_changed",
      () => {},
      () => {},
      async () => {
        await getDownloadURL(uploadImageTask.snapshot.ref).then(
          async (imageDownloadURL) => {
            await addDoc(collection(db, "portfolio"), {
              description: formData.value.description,
              title: formData.value.title,
              publisher: formData.value.publisher,
              yearPublished: formData.value.yearPublished,
              author: formData.value.author,
              href: formData.value.href,
              image: { src: imageDownloadURL, alt: formData.value.alt },
              dateUploaded: Date.now(),
            });
            formData.value = emptyForm;
            useSnackbar("Book Listing Created!");
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

label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
