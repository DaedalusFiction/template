<template>
  <div>
    <LayoutPageHeader header="Take Ten"
      ><p class="mx-auto text-center px-3 dark:text-dark">
        Take ten is a series of ten minute reminders of hope peppered with
        encouragement for living a life worth truly living.
      </p>
      <br />
      <p class="mx-auto text-center px-3 dark:text-dark">
        based wholly on biblical truths & the promises of Jesus, take ten is
        quite simply an arrow to point fellow life travelers to the source of
        True peace. a dose of strength to encourage your heart Giving Hope its
        wings to soar.
      </p>
      <br />
      <p class="mx-auto text-center px-3 dark:text-dark">
        You are warmly invited to sink into a comfy chair, grab a coffee or tea
        and take ten minutes to turn up the quiet and turn down the chaos.
      </p>
      <br />
      <p class="text-center mx-auto px-3 italic dark:text-dark">
        “Those who hope in Me will not be disappointed.”
      </p>
      <p class="text-center mx-auto px-3 dark:text-dark">
        [From your loving Heavenly Father]
      </p>

      <p class="italic text-center mx-auto px-3 dark:text-dark">Isaiah 49:23</p>
    </LayoutPageHeader>

    <div class="max-w-screen-lg mt-12 px-4 mx-auto md:grid grid-cols-12 gap-6">
      <div
        class="col-span-6 lg:col-span-4"
        v-for="(video, index) in videos"
        :key="index"
      >
        <iframe
          class="youtube-video mb-3 rounded-xl"
          :src="video.data().url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <h3 class="link">
          <NuxtLink :to="`/videos/${video.id}`">{{
            video.data().title
          }}</NuxtLink>
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "~/firebase.config";

const videos = ref([]);

onMounted(async () => {
  const videosRef = collection(db, "videos");
  const videosQuery = query(videosRef, orderBy("dateUploaded", "desc"));
  //sort by latest uploaded
  const videosSnapshot = await getDocs(videosQuery);
  videos.value = videosSnapshot.docs;
});
</script>

<style scoped>
.youtube-video {
  aspect-ratio: 16 / 9;
  width: 100%;
}
.widescreen {
  aspect-ratio: 20 / 9;
}
</style>
