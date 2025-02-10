<template>
  <LayoutAdvertising />
  <footer class="p-3 bg-backgroundAccent border-t">
    <div
      class="flex flex-col max-w-screen-2xl mx-auto py-8 gap-4 md:grid grid-cols-12"
    >
      <div class="col-span-3">
        <h6 class="uppercase text-lg mb-2 text-primary">Games</h6>

        <p
          class="mb-1"
          v-for="(link, index) in footerLinks.games"
          :key="link.title"
        >
          <NuxtLink :to="link.href" class="hover:text-primary">{{
            link.title
          }}</NuxtLink>
        </p>
      </div>
      <div class="col-span-3">
        <h6 class="uppercase text-lg mb-2 text-primary">My Account</h6>
        <p
          class="mb-1"
          v-for="(link, index) in footerLinks.account"
          :key="link.title"
        >
          <NuxtLink :to="link.href" class="hover:text-primary">{{
            link.title
          }}</NuxtLink>
        </p>
      </div>
      <div class="col-span-3">
        <h6 class="uppercase text-lg mb-2 text-primary">DB Network</h6>
        <p
          class="mb-1"
          v-for="(link, index) in footerLinks.network"
          :key="link.title"
        >
          <NuxtLink :to="link.href" class="hover:text-primary">{{
            link.title
          }}</NuxtLink>
        </p>
      </div>
      <div class="col-span-3 pb-8">
        <h6 class="uppercase text-lg mb-2 text-primary">Newsletter</h6>
        <div
          v-if="
            !subscribedWhileLoggedOut &&
            (!firebaseUser || !firebaseUser.subscribed)
          "
        >
          <p class="mb-4">
            Subscribe to our monthly newsletter to stay in the loop on upcoming
            metroidvanias!
          </p>
          <div class="flex gap-2">
            <input
              type="text"
              v-model="email"
              placeholder="Enter your email..."
            />
            <button @click="handleSubscribe" class="btn">Subscribe</button>
          </div>
        </div>
        <div v-else-if="firebaseUser && firebaseUser.subscribed">
          <p>You are already subscribed to our newsletter!</p>
        </div>
        <div v-else-if="subscribedWhileLoggedOut">
          <p>Thank you for subscribing!</p>
        </div>
      </div>
    </div>
    <div class="md:flex gap-4 justify-between items-end">
      <div class="md:flex gap-6">
        <p class="text-center md:text-start">
          &copy; 2024 {{ siteName }} - Fictional Games, LLC
        </p>
        <div
          class="flex flex-wrap gap-2 my-2 md:my-0 justify-center md:justify-start flex-row"
        >
          <p class="hover:text-primary">
            <NuxtLink to="/about">About</NuxtLink>
          </p>
          <span class="text-[var(--color-text)]">&#149;</span>
          <p class="hover:text-primary">
            <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
          </p>
          <span class="text-[var(--color-text)]">&#149;</span>
          <p class="hover:text-primary">
            <NuxtLink to="/terms-of-service">Terms of Service</NuxtLink>
          </p>
          <span class="text-[var(--color-text)]">&#149;</span>
          <p class="hover:text-primary">
            <NuxtLink to="/leaderboard">Leaderboard</NuxtLink>
          </p>
          <span class="text-[var(--color-text)]">&#149;</span>
          <p class="hover:text-primary">
            <NuxtLink to="/advertise">Advertise With Us</NuxtLink>
          </p>
        </div>
      </div>
      <div class="h-full flex justify-center items-end">
        <p class="text-center md:text-end">
          Website created by
          <a
            class="hover:underline text-primary"
            href="https://fictionalweb.com"
            >Fictional Web</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { siteName } from "~/data";
import { db } from "~/firebase.config";
const email = ref("");
const firebaseUser = useState("firebaseUser");
const firebaseID = useState("firebaseID");
const subscribedWhileLoggedOut = ref(false);
const footerLinks = {
  games: [
    { title: "Upcoming", href: "/games/upcoming" },
    {
      title: "Browse",
      href: "/games",
    },
    {
      title: "Search",
      href: "/search",
    },
    {
      title: "Contribute",
      href: "/contribute",
    },
  ],
  account: [
    { title: "Manage Settings", href: "/account" },
    { title: "My Lists", href: "/my-lists" },
  ],
  network: [{ title: "BoomershooterDB", href: "https://boomershooterdb.com" }],
};

const handleSubscribe = async () => {
  const mailingListRef = doc(db, "newsletter", "mailinglist");
  await updateDoc(mailingListRef, { subscribers: arrayUnion(email.value) });
  if (firebaseID.value) {
    await updateDoc(doc(db, "users", firebaseID.value), { subscribed: true });
    await refreshUser();
  } else {
    subscribedWhileLoggedOut.value = true;
  }
};
</script>

<style scoped>
.footer-header {
  @apply font-header font-semibold text-lg uppercase mt-3 mb-1;
}

p,
span {
  @apply text-sm;
}
</style>
