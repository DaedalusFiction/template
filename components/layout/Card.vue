<template>
  <NuxtLink :href="card.href">
    <div>
      <div class="image-container h-72 hover:brightness-105 transition">
        <img :src="card.image.src" alt="" />
      </div>
      <p class="text-3xl font-header font-bold pt-2">
        {{ card.header }}
      </p>
      <div>
        <p class="text-darkMuted dark:text-lightMuted">
          {{ card.text }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const { card } = defineProps(["card"]);
</script>

<style scoped></style>
