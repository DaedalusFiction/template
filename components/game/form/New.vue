<template>
  <div class="flex flex-col gap-2 mx-5 mb-3">
    <GameInputFields :formData="formData" :admin="true" />
    <div class="flex gap-2 justify-end">
      <ButtonConfirm
        @confirm="handleSubmitDoc"
        title="Submit"
        text="Submit this game listing?"
        :critical="true"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { addDoc, collection } from "firebase/firestore";
import { db } from "~/firebase.config";

import { emptyForm } from "~/data";
import useSnackbar from "~/composables/showSnackbar";

const props = defineProps(["collection"]);
const emit = defineEmits(["update"]);
const formData = ref({});

onMounted(() => {
  formData.value = { ...emptyForm };
});

const handleSubmitDoc = async () => {
  await addDoc(collection(db, props.collection), {
    ...formData.value,
    dateUploaded: Date.now(),
    lastModified: Date.now(),
  });
  emit("update");
  formData.value = { ...emptyForm };
  useSnackbar("Game Created!");
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
  @apply w-4 h-4 text-white bg-gray-100 border-gray-300 rounded focus:ring-darkMuted focus:ring-2;
  accent-color: var(--color-primary);
}
</style>
