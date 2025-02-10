<template>
  <div v-if="snackbarShowing" class="snackbar">
    {{ snackbarMessage }}
  </div>
</template>

<script setup>
const snackbarMessage = useState("snackbarMessage");
const snackbarShowing = useState("snackbarShowing");
</script>

<style scoped>
.snackbar {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-secondary);
  color: white;
  padding: 16px;
  border-radius: 4px;
  z-index: 1;
}
</style>
