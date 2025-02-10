<template>
  <NuxtLink :to="`/games/${props.game.data().gameID}`">
    <div
      class="p-3 border md:p-6 mb-16 min-h-[60vh] bg-cover bg-center flex items-end hover:brightness-110 transition rounded-sm"
      :style="{
        backgroundImage: `linear-gradient(to bottom, rgba(17, 13, 23, 0.1), rgba(17, 13, 23, 0.3), rgba(17, 13, 23, 1)), url(${backgroundImage})`,
      }"
    >
      <div class="flex justify-between gap-4 items-end w-full">
        <div>
          <p class="text-xs">[featured game]</p>
          <h2 class="mb-3">{{ props.game.data().title }}</h2>
          <p class="line-clamp-3">
            {{
              props.game.data().synopsis ||
              props.game.data().description ||
              "No synopsis available."
            }}
          </p>
        </div>
        <p class="link pointer hidden md:block">View Page &rsaquo;</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps(["game"]);
const backgroundImage = props.game.data().images[0];
</script>

<style scoped>
h2,
p {
  animation: fade-in-from-right 1.5s ease-in-out;
  animation-delay: 1.5s;
  animation-fill-mode: backwards;
}
h2 {
  @apply text-xl sm:text-3xl md:text-5xl;
  animation-delay: 1s;
}

@keyframes fade-in-from-right {
  from {
    transform: translateX(25px);
    opacity: 0;
  }
  to {
    opacity: 100%;
    transform: translateX(0);
  }
}
</style>
