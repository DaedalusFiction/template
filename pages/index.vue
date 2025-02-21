<template>
  <div class="max-w-screen-2xl mx-auto">
    <section>
      <div
        class="px-3 py-8 border md:p-12 mb-16 min-h-[75vh] bg-cover bg-center flex items-end"
        :class="'bg-[linear-gradient(to_bottom,rgba(17,13,23,0),rgba(17,13,23,0)),url(~/public/images/mountains.webp)]'"
      >
        <div class="px-3">
          <h1 class="text-light text-5xl md:text-7xl font-bold">Header One</h1>
          <p class="text-lightMuted">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
            consequatur ducimus eum repellendus? Eligendi porro earum vel nobis
            aliquam qui quas autem expedita eum adipisci quis culpa repudiandae
            mollitia, sed eveniet ad sint sapiente cumque velit! Laborum
            aspernatur quidem at?
          </p>
          <div class="pt-3 flex gap-3">
            <button class="btn">Button One</button>
            <button class="btn">Button Two</button>
          </div>
        </div>
      </div>
    </section>
    <!-- Three Image Panel -->
    <section>
      <div class="px-3 md:px-6">
        <h2 class="mb-3 md:text-5xl text-darkMuted dark:text-lightMuted">
          Header Two
        </h2>
        <div class="md:grid grid-cols-12 gap-6">
          <div
            v-for="(card, index) in threeCardPanel"
            :key="index"
            class="col-span-4 pb-6"
          >
            <LayoutCard :card="card" />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div
        class="md:grid gap-12 grid-cols-12 max-w-screen-xl mx-auto px-3 py-16 md:py-32"
      >
        <div class="col-span-6">
          <h3 class="text-3xl md:text-5xl font-medium">
            {{ textPanelOne.header }}
          </h3>
        </div>
        <div class="col-span-6">
          <p class="md:text-2xl md:pt-16">
            {{ textPanelOne.text }}
          </p>
          <br />
          <button class="btn">Button</button>
        </div>
      </div>
    </section>
    <section>
      <div class="md:grid grid-cols-12 md:px-6 my-8">
        <div class="col-span-7 image-container h-72 md:h-full">
          <img :src="largePanelOne.image.src" :alt="largePanelOne.image.alt" />
        </div>
        <div
          class="col-span-5 bg-backgroundAccent dark:bg-secondary px-3 py-6 md:p-12 flex flex-col gap-6 md:gap-12 justify-between"
        >
          <h4>{{ largePanelOne.header }}</h4>
          <p class="md:text-5xl">{{ largePanelOne.text }}</p>
          <NuxtLink to="/"><button class="btn">Button</button></NuxtLink>
        </div>
      </div>
    </section>
    <section>
      <div class="flex flex-col-reverse md:grid grid-cols-12 md:px-6 my-8">
        <div
          class="col-span-5 bg-backgroundAccent dark:bg-secondary px-3 py-6 md:p-12 flex flex-col gap-6 md:gap-12 justify-between"
        >
          <h5>{{ largePanelTwo.header }}</h5>
          <p class="md:text-5xl">{{ largePanelTwo.text }}</p>
          <NuxtLink to="/"><button class="btn">Button</button></NuxtLink>
        </div>
        <div class="col-span-7 image-container h-72 md:h-full">
          <img :src="largePanelTwo.image.src" :alt="largePanelTwo.image.alt" />
        </div>
      </div>
    </section>
    <section>
      <div class="md:grid grid-cols-12 md:px-6 my-8">
        <div class="col-span-7 image-container h-72 md:h-full">
          <img
            :src="largePanelThree.image.src"
            :alt="largePanelThree.image.alt"
          />
        </div>
        <div
          class="col-span-5 bg-backgroundAccent dark:bg-secondary px-3 py-6 md:p-12 flex flex-col gap-6 md:gap-12 justify-between"
        >
          <h6>{{ largePanelThree.header }}</h6>
          <p class="md:text-5xl">{{ largePanelThree.text }}</p>
          <NuxtLink to="/"><button class="btn">Button</button></NuxtLink>
        </div>
      </div>
    </section>
    <section class="max-w-screen-2xl mt-24 mb-16">
      <p class="text-5xl text-center max-w-[35ch] mx-auto px-3">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </p>
      <br />
      <div class="flex justify-center"><button class="btn">Button</button></div>
    </section>
  </div>
</template>

<script setup>
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  largePanelOne,
  largePanelThree,
  largePanelTwo,
  textPanelOne,
  threeCardPanel,
} from "~/content/home";
</script>

<style scoped></style>
