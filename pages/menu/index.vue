<template>
  <div>
    <LayoutPageHeader header="Menu" />
    <div class="max-w-screen-lg mx-auto px-3">
      <div class="flex flex-col md:flex-row gap-6 justify-around">
        <div>
          <h3 class="text-xl md:text-4xl font-bold uppercase mb-2">
            Charlottesville
          </h3>
          <p>1234 Fake St</p>
          <p>Richmond, VA 22901</p>
          <a class="link" href="tel:4348255038">
            <p>(434) 555-1234</p>
          </a>
          <div class="flex gap-3">
            <p class="btn mt-3">
              <a href="/menu/charlottesville">View Menu</a>
            </p>
            <p class="btn mt-3"><a href="/menu">Order Online</a></p>
          </div>
        </div>
        <div>
          <h3 class="text-xl md:text-4xl font-bold uppercase mb-2">Richmond</h3>
          <p>1234 Fake St</p>
          <p>Richmond, VA 22901</p>
          <a class="link" href="tel:4348255038">
            <p>(434) 555-1234</p>
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

<script setup></script>

<style lang="scss" scoped></style>
