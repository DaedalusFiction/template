<template>
  <h2 class="page-header">
    About <span class="text-secondary">MetroidvaniaDB</span
    ><span class="text-primary">DB</span>
  </h2>
  <div class="details">
    <div class="col-span-6">
      <h3 class="page-subheader">What is a Metroidvania?</h3>
    </div>
    <div class="col-span-6">
      <p>
        A metroidvania is subgenre of video games characterized by an emphasis
        on skill-gated exploration, character progression, and oftentimes
        platforming puzzles. It is most commonly applied to 2D sidescrollilng
        games, though some have expanded their understanding of the genre to
        include games that have managed to capture the mysterious spirit of the
        original metroidvanias.
      </p>
      <br />
      <p>
        While the exact definition of the term is still debated, we have decided
        to include any games that fit what we consdier to be the spirit of the
        Metroidvania. For this reason, we have opted to include titles such as
        those in the Dark Souls franchise and other non-2D games that capture
        the essence of the metroidvania.
      </p>
      <br />
      <p></p>
    </div>
    <div class="col-span-6">
      <h3 class="page-subheader">About this site</h3>
    </div>
    <div class="col-span-6">
      <p>
        {{ siteName }} is a wiki-style database for metroidvania video games. We
        allow and encourage users to submit their own game listings as well as
        edit existing ones.
      </p>
    </div>

    <div class="col-span-6">
      <h3 class="page-subheader">List of Properties</h3>
    </div>
    <div class="col-span-6">
      <ul>
        <li v-for="option in propertyOptions" :key="option">
          <p>
            {{ option }}
          </p>
        </li>
      </ul>
    </div>
    <div class="col-span-6">
      <h3 class="page-subheader">List of Tags</h3>
    </div>
    <div class="col-span-6">
      <ul>
        <li v-for="option in tagOptions" :key="option">
          <p class="hover:text-primary">
            <NuxtLink :to="`/search?tag=` + option">{{ option }}</NuxtLink>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { propertyOptions, siteName, tagOptions } from "~/data";
</script>

<style scoped></style>
