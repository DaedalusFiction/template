<template>
  <div class="max-w-screen-2xl mx-auto">
    <LayoutParallax />

    <section
      class="bg-background px-3 dark:bg-backgroundDarkMode py-8 md:py-24"
    >
      <div class="max-w-screen-xl mx-auto">
        <h2
          class="mb-3 text-2xl md:text-5xl text-darkMuted dark:text-lightMuted"
        >
          Header Two
        </h2>
        <div class="md:grid grid-cols-12 gap-6">
          <div
            v-for="(card, index) in menuPreview"
            :key="index"
            v-scroll-animation="{
              duration: 1.2,
              delay: 0.1 * (index + 1),
              translateY: 25,
            }"
            class="col-span-3"
          >
            <LayoutCard :card="card" />
          </div>
        </div>

        <div class="flex justify-end">
          <p>
            <NuxtLink class="link" to="/menu"
              >Explore <span class="text-2xl">&rarr;</span></NuxtLink
            >
          </p>
        </div>
      </div>
    </section>
    <section class="pt-12">
      <h3
        v-scroll-animation="{
          duration: 1.2,
          delay: 0.2,
          translateX: 25,
        }"
        class="text-3xl md:text-5xl mb-6 text-center"
      >
        Header three
      </h3>
      <div
        class="max-w-screen-lg mx-auto px-3 flex flex-col md:grid grid-cols-12 gap-6"
      >
        <div
          v-scroll-animation="{
            duration: 1.2,
            delay: 0.2,
          }"
          class="col-span-6 bg-white dark:bg-backgroundAccentDarkMode border rounded-md"
        >
          <div class="flex flex-col justify-between h-full p-3">
            <div>
              <div
                class="image-container hover:brightness-110 transition cursor-pointer h-56"
              >
                <img src="/public/images/mountains5.webp" alt="" />
              </div>
              <div class="">
                <h3 class="text-3xl my-2">Subheader one</h3>
                <ul class="list-disc dark:marker:text-light">
                  <li><p>Lorem, ipsum dolor.</p></li>
                  <li><p>Lorem ipsum dolor sit amet.</p></li>
                  <li>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
                  </li>
                  <li><p>Lorem ipsum dolor sit.</p></li>
                </ul>
              </div>
            </div>

            <NuxtLink class="btn w-full max-w-full mt-3">Button</NuxtLink>
          </div>
        </div>
        <div
          v-scroll-animation="{
            duration: 1.2,
            delay: 0.3,
          }"
          class="col-span-6 bg-white dark:bg-backgroundAccentDarkMode border rounded-md"
        >
          <div class="flex flex-col justify-between h-full p-3">
            <div>
              <div
                class="image-container hover:brightness-110 transition cursor-pointer h-56"
              >
                <img src="/public/images/mountains5.webp" alt="" />
              </div>
              <div class="">
                <h3 class="text-3xl my-2">Subheader Two</h3>
                <ul class="list-disc dark:marker:text-light">
                  <li><p>Lorem, ipsum dolor.</p></li>
                  <li>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Aliquam repellat fugiat ipsa!
                    </p>
                  </li>
                  <li>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
                  </li>
                  <li><p>Lorem ipsum dolor sit.</p></li>
                </ul>
              </div>
            </div>

            <NuxtLink class="btn w-full max-w-full mt-3">Button</NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div
        class="md:grid gap-12 grid-cols-12 max-w-screen-xl mx-auto px-3 py-16 md:py-32"
      >
        <div class="col-span-6">
          <h4
            v-scroll-animation="{
              duration: 1.2,
              delay: 0.3,
              translateX: 25,
            }"
            class="text-3xl md:text-5xl"
          >
            Header Four
          </h4>
        </div>
        <div
          v-scroll-animation="{
            duration: 1.2,
            delay: 0.3,
          }"
          class="col-span-6"
        >
          <p class="md:text-2xl md:pt-16">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            quas neque cupiditate tempora in explicabo earum quidem quo. Facere,
            aut?
          </p>
          <br />
          <NuxtLink class="btn" to="/">Button</NuxtLink>
        </div>
      </div>
    </section>
    <section>
      <div
        v-scroll-animation="{
          duration: 1.2,
          delay: 0.3,
          translateY: 25,
        }"
        class="md:grid grid-cols-12 md:px-6 my-8"
      >
        <div class="col-span-7 image-container h-72 md:h-full">
          <img src="/public/images/mountains2.webp" alt="alt text" />
        </div>
        <div
          class="col-span-5 bg-backgroundAccent dark:bg-secondary px-3 py-6 md:p-12 flex flex-col gap-6 md:gap-12 justify-between"
        >
          <hh5 class="font-bold">Header Five</hh5>
          <p class="md:text-4xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
            labore! Consequatur incidunt quia eveniet totam?
          </p>
          <NuxtLink class="btn" to="/">Button</NuxtLink>
        </div>
      </div>
    </section>
    <section>
      <div
        v-scroll-animation="{
          duration: 1.2,
          delay: 0.3,
          translateY: 25,
        }"
        class="flex flex-col-reverse md:grid grid-cols-12 md:px-6 my-8"
      >
        <div
          class="col-span-5 bg-backgroundAccent dark:bg-secondary px-3 py-6 md:p-12 flex flex-col gap-6 md:gap-12 justify-between"
        >
          <h6 class="font-bold">Header Six</h6>
          <p class="md:text-4xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
            neque nemo ipsum?
          </p>
          <NuxtLink class="btn" to="/">Button</NuxtLink>
        </div>
        <div class="col-span-7 image-container h-72 md:h-full">
          <img src="/public/images/mountains3.webp" alt="alt text" />
        </div>
      </div>
    </section>
    <!-- <section>
      <div
        v-scroll-animation="{
          duration: 1.2,
          delay: 0.3,
          translateY: 25,
        }"
        class="md:grid grid-cols-12 md:px-6 my-8"
      >
        <div class="col-span-7 image-container h-72 md:h-full">
          <img src="/public/images/mountains4.webp" alt="alt text" />
        </div>
        <div
          class="col-span-5 bg-backgroundAccent dark:bg-secondary px-3 py-6 md:p-12 flex flex-col gap-6 md:gap-12 justify-between"
        >
          <h6 class="font-bold">Header Six</h6>
          <p class="md:text-4xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            mollitia minima sed!
          </p>
          <NuxtLink class="btn" to="/">Button</NuxtLink>
        </div>
      </div>
    </section> -->
    <section class="max-w-screen-2xl mt-24 mb-16">
      <p
        v-scroll-animation="{
          duration: 1.2,
          delay: 0.3,
        }"
        class="text-4xl text-center max-w-[35ch] mx-auto px-3"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </p>
      <br />
      <div
        v-scroll-animation="{
          duration: 1.2,
          delay: 0.3,
        }"
        class="flex justify-center mx-auto"
      >
        <NuxtLink class="btn" to="/">Button</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { menuPreview } from "~/content/menu";
</script>

<style scoped></style>
