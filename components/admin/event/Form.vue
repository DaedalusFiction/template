<template>
  <div class="card">
    <div class="mb-4">
      <label for="title"> Title </label>
      <input id="title" v-model="formData.title" required type="text" />
    </div>
    <div class="mb-4">
      <label for="time"> Time </label>
      <input id="time" v-model="formData.time" required type="text" />
    </div>
    <div class="mb-4">
      <label for="date"> Date </label>
      <input
        id="date"
        class="p-2 rounded cursor-pointer"
        v-model="formData.date"
        required
        type="date"
      />
    </div>
    <div class="mb-4">
      <label for="description"> Description </label>
      <textarea id="description" v-model="formData.description" rows="4" />
    </div>

    <AdminImageSelector v-model:model-value="imageFile" />

    <div class="mb-4">
      <label for="alt"> Image Alternate Text </label>
      <input
        id="alt"
        v-model="formData.alt"
        type="text"
        placeholder="e.g. The Blue Ridge Mountains"
      />
    </div>
    <div class="flex gap-2">
      <button class="btn" @click="submitForm">
        {{ event ? "Update" : "Submit" }}
      </button>
      <button v-if="event" class="btn" @click="handleDeleteDocument">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { deleteDoc, doc } from "firebase/firestore";
const emit = defineEmits(["update"]);
import useUploadDocument from "~/composables/admin/uploadDocument";
import useUpdateDocument from "~/composables/admin/useUpdateDocument";
import useSnackbar from "~/composables/showSnackbar";
import { db } from "~/firebase.config";
const { event } = defineProps(["event"]);
const emptyForm = {
  title: "",
  location: "",
  time: "",
  date: "",
  description: "",
};
const formData = ref(emptyForm);
const imageFile = ref(null);

onMounted(() => {
  console.log(event);
  if (event) {
    formData.value = {
      title: event.data().title,
      location: event.data().location,
      time: event.data().time,
      date: event.data().date,
      description: event.data().description,
    };
  }
});

const submitForm = async () => {
  if (event) {
    await useUpdateDocument(
      "events",
      formData.value,
      imageFile.value,
      event.id
    );
    emit("update");
  } else {
    await useUploadDocument("events", formData.value, imageFile.value);
    emit("update");
  }
};
const handleDeleteDocument = async () => {
  try {
    await deleteDoc(doc(db, "events", event.id));
    useSnackbar("Document successfully deleted");
    emit("update");
  } catch {
    useSnackbar("Error deleting document");
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
