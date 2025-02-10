<template>
  <div class="flex max-w-screen-xl justify-center p-3 mx-auto md:p-12">
    <div
      class="bg-backgroundAccent border p-3 md:p-12 rounded w-full flex flex-col gap-4 lg:grid grid-cols-12"
    >
      <div class="col-span-7">
        <h6 class="text-2xl md:text-5xl font-extrabold text-primary">
          Get Your Game Noticed
        </h6>
        <br />
        <p>
          Advertise your game with {{ siteName }} and reach a community of
          people who know exactly what they're looking for:
        </p>
        <br />
        <p class="font-extrabold">Your game.</p>
      </div>
      <div class="col-span-5">
        <div class="grid grid-cols-2 gap-6">
          <div class="col-span-1 flex gap-1">
            <IconsFire color="#ffd131" />
            <p>Native & Banner Ad Spots</p>
          </div>
          <div class="col-span-1 flex gap-1">
            <IconsFire color="#ffd131" />
            <p>Multi-week Discounts</p>
          </div>
          <div class="col-span-1 flex gap-1">
            <IconsFire color="#ffd131" />
            <p>Game Launch Packages</p>
          </div>
          <div class="col-span-1 flex gap-1">
            <IconsFire color="#ffd131" />
            <p>Discounts for Indie Developers</p>
          </div>
          <div v-if="!isSubmitted" class="col-span-2 flex md:px-3 gap-2">
            <input
              type="text"
              v-model="email"
              placeholder="Enter your email..."
            />
            <button
              class="btn"
              :class="isDisabled && 'bg-gray-400'"
              :disabled="isDisabled"
              v-on:click="handleSubmitEmail"
            >
              Submit
            </button>
          </div>
          <div class="col-span-2" v-else>
            <p>Thanks! We'll be in touch soon.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import emailjs from "@emailjs/browser";
import useSnackbar from "~/composables/showSnackbar";
import { siteName } from "~/data";
const email = ref("");
const isSubmitted = ref(false);
const isDisabled = ref(false);

const handleSubmitEmail = () => {
  const templateParams = {
    website: "BoomerShooterAdvertising",
    email: email.value,
    comment: "I'm interested in advertising",
  };
  email.value = "";
  isDisabled.value = true;
  try {
    emailjs
      .send(
        "service_t1yo7dn",
        "template_pfang7n",
        templateParams,
        "aMDOy4kUud9rd0Yg9"
      )
      .then(function () {
        isSubmitted.value = true;
      });
  } catch (error) {
    useSnackbar(
      "Something went wrong. Please contact advertising@boomershooterdb.com for more information"
    );
  }
};
</script>

<style scoped></style>
