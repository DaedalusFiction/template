<template>
  <div
    class="mb-8 md:mb-12 flex flex-col justify-between h-full overflow-hidden"
  >
    <div class="">
      <div
        @mouseenter="setHovering(true)"
        @mouseleave="setHovering(false)"
        class="border rounded"
      >
        <NuxtLink :to="`/games/${game.data().gameID || game.id}`">
          <div
            class="transition hover:brightness-110 image-container rounded-t h-56"
          >
            <img :src="displayedImage" alt="game.data().title" />
          </div>
        </NuxtLink>
        <div class="bg-backgroundAccent rounded-b">
          <div
            class="bg-backgroundAccent flex items-center rounded-b min-h-[4rem]"
          >
            <h3
              :class="hovering && 'translate-x-2'"
              class="transition text-base px-3 py-2 mb-0 uppercase"
            >
              <NuxtLink :to="`/games/${game.data().gameID || game.id}`">
                {{ game.data().title }}
              </NuxtLink>
            </h3>
          </div>
        </div>
      </div>
      <br />
      <div
        class="flex tags flex-wrap gap-3 justify-start"
        v-if="game.data()._tags && game.data()._tags.length > 0"
      >
        <div v-for="tag in game.data()._tags.slice(0, 4)" :key="tag" class="">
          <p class="italic text-sm leading-3 link">
            <NuxtLink :to="`/search?tag=${tag}`">{{ tag }}</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["game"]);
const hovering = ref(false);
const displayedImage = ref(
  props.game.data().images[0] || "~/assets/images/mvdblogo.webp"
);
const setHovering = (isHovering) => {
  hovering.value = !hovering.value;
  if (isHovering && props.game.data().images.length > 1) {
    displayedImage.value = props.game.data().images[1];
  } else if (!isHovering) {
    displayedImage.value = props.game.data().images[0];
  }
};
</script>

<style scoped>
.image-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.image-container img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  width: auto;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
}
</style>
