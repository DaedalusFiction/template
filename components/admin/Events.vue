<template>
  <div>
    <h2 class="mb-2">Create Event</h2>
    <form class="card" @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="" for="title">Title</label>
        <input id="title" v-model="formData.title" required type="text" />
      </div>
      <div class="mb-4">
        <label class="" for="date"> Date </label>
        <input
          class="p-2"
          id="date"
          v-model="formData.date"
          required
          type="date"
        />
      </div>
      <div class="mb-4">
        <label class="" for="time"> Time </label>
        <input id="time" v-model="formData.time" required type="text" />
      </div>
      <div class="mb-4">
        <label class="" for="location"> Location </label>
        <input id="location" v-model="formData.location" required type="text" />
      </div>
      <div class="mb-4">
        <label class="" for="href"> Link </label>
        <input
          id="href"
          v-model="formData.href"
          required
          type="text"
          placeholder="https://"
        />
      </div>
      <div class="mb-4">
        <label class="" for="description"> Description </label>
        <textarea
          id="description"
          v-model="formData.description"
          rows="4"
          class=""
        />
      </div>

      <button class="btn" type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { addDoc, collection } from "firebase/firestore";
import { db } from "~/firebase.config";
const upcomingEvents = [
  {
    title: "Event One",
    description:
      "This is the event's description. It will be a very fun event.",
    date: "March 4, 2025",
    time: "9pm",
    location: "1234 Fake Street",
    href: "/",
  },
  {
    title: "Event Two",
    description:
      "This is the event's description. It will be a very fun event, much better than the last.",
    date: "March 5, 2025",
    time: "9pm",
    location: "1234 Fake Street",
    href: "/",
  },
  {
    title: "Event Three",
    description:
      "This is the event's description. It will be a very fun event, the best of the three, by",
    date: "April 24, 2025",
    time: "9pm",
    location: "1234 Fake Street",
    href: "/",
  },
];
const emptyForm = {
  title: "",
  description: "",
  date: null,
  href: "",
  location: "",
  time: "",
};
const submitted = ref(false);
const formData = ref(emptyForm);

const submitForm = async () => {
  await addDoc(collection(db, "events"), {
    ...formData.value,
    dateUploaded: Date.now(),
  });
  formData.value = emptyForm;
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
