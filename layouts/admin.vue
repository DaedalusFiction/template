<template>
  <div class="max-w-screen-2xl mx-auto p-3">
    <div class="flex justify-between flex-wrap">
      <h1 class="mb-3">Admin</h1>
      <NuxtLink class="link" to="/">Main Site</NuxtLink>
    </div>
    <slot />
    <FeedbackSnackBar />
  </div>
</template>

<script setup></script>

<style scoped></style>
