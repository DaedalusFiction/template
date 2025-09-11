<template>
  <div class="card">
    <div class="mb-4">
      <label for="title"> Title </label>
      <input id="title" v-model="formData.title" required type="text" />
    </div>
    <div class="mb-4">
      <label for="url"> YouTube URL </label>
      <input id="url" v-model="formData.url" required type="text" />
    </div>

    <div class="flex gap-2">
      <ButtonConfirm
        @confirm="submitForm"
        title="Submit"
        text="Are you sure you want to create this item?"
      />
      <ButtonConfirm
        v-if="video"
        @confirm="handleDeleteDocument"
        title="Delete"
        text="Are you sure you want to delete this item?"
      />
    </div>
  </div>
</template>

<script setup>
import { deleteDoc, doc } from "firebase/firestore";
const emit = defineEmits(["update"]);
import useUploadDocument from "~/composables/admin/uploadDocument";
import useUpdateDocument from "~/composables/admin/updateDocument";
import useSnackbar from "~/composables/showSnackbar";
import { db } from "~/firebase.config";
const { video } = defineProps(["video"]);
const emptyForm = {
  title: "",
  url: "",
};
const formData = ref(emptyForm);
const imageFile = ref(null);

onMounted(() => {
  if (video) {
    formData.value = {
      title: video.data().title || "",
      url: video.data().url || "",
    };
  }
});

const submitForm = async () => {
  if (formData.value.url) {
    try {
      const convertedLink = getYouTubeEmbedUrl(formData.value.url);
      console.log("converted Link: ", convertedLink);
      if (video) {
        await useUpdateDocument(
          "videos",
          { title: formData.value.title, url: convertedLink },
          imageFile.value,
          video.id
        );
        emit("update");
      } else {
        console.log("Hi");
        await useUploadDocument("videos", {
          title: formData.value.title,
          url: convertedLink,
        });
        emit("update");
      }
    } catch {
      useSnackbar("Error converting URL to embedded format. Please try again.");
    }
  }
};
const handleDeleteDocument = async () => {
  try {
    await deleteDoc(doc(db, "videos", video.id));
    useSnackbar("Document successfully deleted");
    emit("update");
  } catch {
    useSnackbar("Error deleting document");
  }
};

function getYouTubeEmbedUrl(url) {
  let videoId;

  const watchUrlPattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;

  const shortsUrlPattern = /youtube\.com\/shorts\/([^&\n?#]+)/;

  const watchMatch = url.match(watchUrlPattern);
  const shortsMatch = url.match(shortsUrlPattern);

  if (watchMatch) {
    videoId = watchMatch[1];
  } else if (shortsMatch) {
    videoId = shortsMatch[1];
  } else {
    throw new Error("Invalid YouTube URL");
  }

  return `https://www.youtube.com/embed/${videoId}`;
}
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
