<template>
  <div class="navigationOptions">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      :stroke="props.color || currentColor"
      class="w-6 h-6 navigationOptions"
    >
      <path
        class="navigationOptions"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps(["color"]);
</script>

<style scoped></style>
