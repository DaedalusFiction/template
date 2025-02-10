<template>
  <h2 class="page-header">Contribute</h2>
  <br />
  <div class="flex flex-wrap-reverse md:grid grid-cols-12 gap-12">
    <div class="col-span-7 w-full py-4 bg-backgroundAccent border rounded-md">
      <div v-if="!submitted && formData">
        <GameFormNew
          collection="contributions"
          @update="
            () => {
              submitted = true;
            }
          "
        />
      </div>
      <div class="p-3 flex flex-col items-center justify-center h-full" v-else>
        <h4 class="text-center mb-4">Thank you for your contribution!</h4>

        <button class="btn" @click="handleReset">Submit another entry</button>
      </div>
    </div>
    <div class="col-span-5">
      <div>
        <hr />
        <h3>New entries</h3>
        <p>
          If you'd like to submit a game, just fill out the form. We'll review
          it and let you know when it goes live.
        </p>
        <br />
        <hr />
        <h3>Existing entries</h3>
        <p>
          If you've noticed something incorrect about one of our current
          listings, please sign in and use the edit feature on the game page to
          correct the information.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { emptyForm } from "~/data";

const submitted = ref(false);
const formData = ref({ ...emptyForm });

const handleReset = () => {
  submitted.value = false;
};
</script>

<style scoped></style>
