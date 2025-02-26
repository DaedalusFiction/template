<template>
  <div>
    <LayoutPageHeader header="Catering" />
    <p class="text-center mx-auto px-3 mb-6">
      We would love to help you plan and cater your next event or office lunch.
      Please fill out the form below and we will be in touch!
    </p>
    <div class="max-w-screen-md mx-auto px-3">
      <div
        class="border rounded-md p-3 bg-white dark:bg-backgroundAccentDarkMode"
      >
        <div v-if="!isContactFormSubmitted" class="flex flex-col gap-2">
          <label class="hidden" for="name">Name (required)</label>
          <input
            v-model="name"
            placeholder="Name"
            id="name"
            required
            type="text"
            class="placeholder-dark dark:placeholder-light bg-inherit"
          />
          <label class="hidden" for="email">Email</label>
          <input
            v-model="email"
            type="text"
            placeholder="Email (required)"
            id="email"
            required
            class="placeholder-dark dark:placeholder-light bg-inherit"
          />
          <label class="hidden" for="numberOfPersons">Number of Persons</label>
          <input
            v-model="numberOfPersons"
            type="text"
            placeholder="Approx. Number of Persons"
            id="numberOfPersons"
            required
            class="placeholder-dark dark:placeholder-light bg-inherit"
          />
          <label class="hidden" for="cateringType">Catering Type</label>
          <select
            name="cateringType"
            id="cateringType"
            class="px-0"
            v-model="cateringType"
          >
            <option value="Catering">Catering</option>
            <option value="Group Order">Group Order</option>
          </select>
          <label class="hidden" for="comment">comment</label>
          <textarea
            placeholder="Additional information"
            v-model="comment"
            class="placeholder-dark border px-2 my-3"
            id="comment"
          />
          <div class="flex gap-3">
            <label for="eventDate"><p>Date of Event:</p></label>
            <input
              type="date"
              class="border rounded-md p-2"
              v-model="eventDate"
            />
          </div>
          <button
            @click="handleSubmitContactForm"
            :disabled="isButtonDisabled"
            class="btn w-full"
          >
            Submit
          </button>
        </div>
        <p v-else>Thank you! We'll be in touch soon</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const isContactFormSubmitted = ref(false);
const cateringType = ref("Catering");
import emailjs from "@emailjs/browser";
const isButtonDisabled = ref(false);
const eventDate = ref("");
const numberOfPersons = ref("");
import { siteName } from "~/data";

const handleSubmitContactForm = () => {
  isButtonDisabled.value = true;
  const templateParams = {
    website: siteName,
    name: name.value,
    email: email.value,
    cateringType: cateringType.value,
    comment: comment.value,
  };
  email.value = "";
  try {
    emailjs
      .send(
        "service_t1yo7dn",
        "template_pfang7n",
        templateParams,
        "aMDOy4kUud9rd0Yg9"
      )
      .then(function () {
        isContactFormSubmitted.value = true;
      });
  } catch (error) {
    console.log(error.message);
  }
};
</script>

<style scoped></style>
