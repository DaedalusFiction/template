<template>
  <header class="fixed w-full top-0 z-20">
    <div
      class="transition duration-300 bg-backgroundAccent md:bg-transparent hover:bg-backgroundAccent"
      :class="{
        scrolled: isScrolled,
      }"
    >
      <div class="hidden xl:grid grid-cols-12 px-4 py-2 mx-auto">
        <div class="col-span-7 flex gap-4 items-center">
          <NuxtLink to="/">
            <div class="flex items-center gap-3">
              <img
                src="~/assets/images/mvdblogo-cropped.png"
                height="50"
                width="50"
              />
              <h1 class="whitespace-nowrap font-sans uppercase">
                <span class="text-primary">Metroidvania</span>
                <span class="font-extrabold text-secondary">DB</span>
              </h1>
            </div>
          </NuxtLink>
          <p v-for="item in pages" :key="item" class="">
            <NuxtLink class="link" :href="item.href">{{ item.text }}</NuxtLink>
          </p>
        </div>
        <div class="col-span-5 flex gap-3 items-center justify-end">
          <div>
            <InputSearchBar class="searchBar" />
          </div>
          <div class="profileOptions cursor-pointer" v-if="googleUser">
            <img
              class="profileOptions rounded-full h-8 w-8 cursor-pointer"
              :src="
                googleUser.photoURL || '~/assets/images/mvdblogo-cropped.png'
              "
              @click="handleExpandProfileOptions"
            />
          </div>
          <div
            v-else
            @click="handleExpandProfileOptions"
            class="profileOptions cursor-pointer"
          >
            <IconsUserLoggedOut
              class="profileOptions text-[var(--color-text)]"
            />
          </div>
        </div>
      </div>
      <div class="p-2 mx-auto flex xl:hidden justify-between items-center">
        <button
          class="navigationOptions text-2xl font-extrabold text-white"
          @click="handleExpandNavigation"
        >
          <IconsHamburger class="navigationOptions" color="white" />
        </button>
        <NuxtLink to="/" class="link flex gap-2 items-center">
          <img
            src="~/assets/images/mvdblogo-cropped.png"
            height="40"
            width="40"
          />
          <h1 class="whitespace-nowrap font-sans">
            <span class="text-secondary">BS</span>
            <span class="font-extrabold text-primary">DB</span>
          </h1></NuxtLink
        >
        <div class="flex gap-2 items-center">
          <IconsSearch
            color="white"
            class="searchBar"
            @click="handleExpandSearch"
          />
          <div class="profileOptions cursor-pointer" v-if="googleUser">
            <img
              class="profileOptions rounded-full h-8 w-8 cursor-pointer"
              :src="
                googleUser.photoURL || '~/assets/images/mvdblogo-cropped.png'
              "
              @click="handleExpandProfileOptions"
            />
          </div>
          <div
            v-else
            @click="handleExpandProfileOptions"
            class="profileOptions cursor-pointer"
          >
            <IconsUserLoggedOut
              class="profileOptions text-[var(--color-text)]"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex xl:hidden p-3 transition searchBar"
      :class="searchExpanded && 'bg-backgroundAccent'"
    >
      <InputMobileSearchBar
        class="searchBar"
        :searchExpanded="searchExpanded"
      />
    </div>
  </header>

  <Transition>
    <nav
      v-if="navigationExpanded"
      class="fixed top-14 rounded border bg-transparent transition-colors duration-50 min-w-40 flex items-center py-4 z-10"
      :class="navigationExpanded && 'navigationExpanded'"
    >
      <ul class="">
        <li class="my-2" v-for="item in pages" :key="item.href">
          <NuxtLink :to="item.href" @click="handleExpandNavigation">{{
            item.text
          }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </Transition>
  <Transition>
    <nav
      v-if="profileOptionsExpanded"
      class="profileOptions fixed top-14 right-0 rounded border bg-transparent transition-colors duration-50 min-w-40 flex items-center py-4 z-10"
      :class="profileOptionsExpanded && 'profileOptionsExpanded'"
    >
      <ul class="pr-4 profileOptions">
        <li v-if="!googleUser" class="my-2 profileOptions">
          <button class="profileOptions" @click="handleSignIn">
            Sign In with Google
          </button>
        </li>
        <li v-if="googleUser" class="my-2 profileOptions">
          <NuxtLink v-if="googleUser" to="/account" class="cursor-pointer"
            >Account Settings</NuxtLink
          >
        </li>
        <li v-if="googleUser" class="my-2 profileOptions">
          <button class="cursor-pointer" @click="handleSignOut">
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import useLogin from "~/composables/login";

const firebaseUser = useState("firebaseUser");
const googleUser = useState("googleUser");
const navigationExpanded = useState("navigationExpanded");
const profileOptionsExpanded = useState("profileOptionsExpanded");
const searchExpanded = useState("searchExpanded");

const isScrolled = ref(false);

const handleSignIn = async () => {
  await useLogin("in");
  profileOptionsExpanded.value = !profileOptionsExpanded.value;
};
const handleSignOut = async () => {
  firebaseUser.value = null;
  googleUser.value = null;
  profileOptionsExpanded.value = !profileOptionsExpanded.value;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80;
};

const handleExpandSearch = () => {
  searchExpanded.value = !searchExpanded.value;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
const handleExpandNavigation = () => {
  navigationExpanded.value = !navigationExpanded.value;
};
const handleExpandProfileOptions = () => {
  profileOptionsExpanded.value = !profileOptionsExpanded.value;
};

const pages = [
  { text: "Upcoming Games", href: "/games/upcoming" },
  { text: "Browse", href: "/games" },
  { text: "Search", href: "/search" },
  { text: "Contribute", href: "/contribute" },
];
</script>

<style scoped>
.scrolled {
  @apply bg-backgroundAccent border-b;
}
.navigationExpanded,
.profileOptionsExpanded {
  @apply bg-background;
}

.v-enter-active,
.v-leave-active {
  transition: height 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
