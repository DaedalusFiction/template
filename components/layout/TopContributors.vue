<template>
  <div class="w-full mx-auto">
    <div class="flex justify-between max-w-prose w-full ml-5">
      <h3 class="text-lg">Username</h3>
      <h3 class="text-lg">Total Contributions</h3>
    </div>
    <ol class="list-decimal">
      <li v-for="(contributor, index) in contributors.docs" :key="index">
        <div class="flex justify-between">
          <p>{{ contributor.data().displayName }}</p>
          <p>{{ contributor.data().contributions }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "~/firebase.config";

const contributors = await getDocs(
  query(collection(db, "users"), orderBy("contributions", "desc"), limit(25))
);
</script>

<style scoped></style>
