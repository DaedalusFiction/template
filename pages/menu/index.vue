<template>
  <div>
    <LayoutPageHeader header="Menu" />
    <div class="max-w-screen-lg mx-auto px-3">
      <p class="bold text-center max-w-full mb-8">Select your location</p>
      <div class="md:flex px-3 justify-around">
        <div>
          <p class="text-center text-xl md:text-4xl border-b mb-2">
            Charlottesville
          </p>
          <p>365 Merchant Walk Sq Unit 300</p>
          <p>Charlottesville, VA 22902</p>
          <a class="link" :href="`tel:` + telephone">
            <p>{{ useFormatTelephone(telephone) }}</p>
          </a>
          <div class="flex gap-3">
            <p class="btn mt-3">
              <a href="/menu/charlottesville">View Menu</a>
            </p>
            <p class="btn mt-3"><a href="/menu">Order Online</a></p>
          </div>
        </div>
        <div>
          <p class="text-center text-xl md:text-4xl border-b mb-2">Richmond</p>
          <p>1234 Fake St</p>
          <p>Richmond, VA 22901</p>
          <a class="link" :href="`tel:` + telephone">
            <p>{{ useFormatTelephone(telephone) }}</p>
          </a>
          <div class="flex gap-3">
            <p class="btn mt-3"><a href="/menu/richmond">View Menu</a></p>
            <p class="btn mt-3"><a href="/menu">Order Online</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useFormatTelephone from "~/composables/formatting/formatTelephone";
import { telephone } from "~/data";
</script>

<style lang="scss" scoped></style>
