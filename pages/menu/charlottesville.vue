<template>
  <div>
    <LayoutPageHeader header="Charlottesville" />
    <div class="max-w-screen-xl mx-auto px-3">
      <h3 class="text-3xl">Entrees</h3>
      <p class="italic">Served with rice</p>
      <br />
      <div class="flex flex-col md:grid grid-cols-9 lg:grid-cols-12 gap-3">
        <div
          class="col-span-3"
          v-for="(item, index) in menuPreview"
          :key="index"
        >
          <LayoutCard :card="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { menuPreview } from "~/content/home";
</script>

<style scoped></style>
