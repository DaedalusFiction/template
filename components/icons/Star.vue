<template>
  <div class="relative">
    <!-- two svgs, to change responsive background -->
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="w-6 h-6 scale-105 hidden md:flex"
      viewBox="0 0 400 400"
      enable-background="new 0 0 400 400"
      xml:space="preserve"
    >
      <path
        fill="var(--color-background-accent)"
        d="M4,5v391h391V5H4z M291.703,327.4L199.5,260.414l-92.204,66.991l35.219-108.403L50.312,152h113.97L199.5,43.608L234.719,152h113.97l-92.204,67.003L291.703,327.4z"
      />
    </svg>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="w-6 h-6 scale-105 md:hidden"
      viewBox="0 0 400 400"
      enable-background="new 0 0 400 400"
      xml:space="preserve"
    >
      <path
        fill="var(--color-background)"
        d="M4,5v391h391V5H4z M291.703,327.4L199.5,260.414l-92.204,66.991l35.219-108.403L50.312,152h113.97L199.5,43.608L234.719,152h113.97l-92.204,67.003L291.703,327.4z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :fill="fill"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="white"
      class="size-6 absolute bottom-[1px] left-0 scale-[90%]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps(["color", "fill"]);
</script>

<style scoped></style>
