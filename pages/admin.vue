<template>
  <div>
    <div class="max-w-screen-2xl mx-auto">
      <button v-if="admin" class="btn my-3" @click="handleSignIn">
        Sign In
      </button>
      <div v-else class="md:grid min-h-screen grid-cols-12 border">
        <div
          class="col-span-2 border-r bg-backgroundAccent dark:bg-backgroundAccentDarkMode"
        >
          <div
            v-for="menuItem in menu"
            @click="selectedPanel = menuItem.name"
            :key="menuItem.name"
            class="transition hover:bg-backgroundDarkMode flex gap-2 w-full max-w-full p-2 cursor-pointer"
            :class="
              menuItem.name === selectedPanel
                ? 'bg-background dark:bg-backgroundDarkMode'
                : 'bg-backgroundAccent dark:bg-backgroundAccentDarkMode'
            "
          >
            <component :is="menuItem.icon" class="w-5 dark:stroke-white" />
            <p>{{ menuItem.name }}</p>
          </div>
        </div>
        <div class="col-span-10 p-3">
          <AdminEventList v-if="selectedPanel === 'Events'" />
          <AdminArticleList v-if="selectedPanel === 'Articles'" />
          <AdminContributorList v-if="selectedPanel === 'Contributors'" />
          <AdminBookList v-if="selectedPanel === 'Portfolio'" />
          <AdminVideoList v-if="selectedPanel === 'Videos'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { auth, db, provider } from "~/firebase.config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, markRaw } from "vue";

definePageMeta({
  layout: "admin",
});
const admin = ref(false);
const bookIcon = markRaw(resolveComponent("IconsBook"));
const userIcon = markRaw(resolveComponent("IconsUser"));
const envelopeIcon = markRaw(resolveComponent("IconsEnvelope"));
const menu = ref([
  { name: "Events", icon: envelopeIcon },
  { name: "Articles", icon: bookIcon },
  { name: "Contributors", icon: userIcon },
  { name: "Portfolio", icon: userIcon },
  { name: "Videos", icon: userIcon },
]);
const selectedPanel = ref("Events");

const handleSignIn = async () => {
  const user = await login();
  if (user) {
    admin.value = user.admin;
  }
};

const login = async () => {
  let currentUser;
  const user = await signInWithPopup(auth, provider)
    .then(async (result) => {
      GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      const userRef = doc(db, "users", result.user.uid);
      const userRefSnap = await getDoc(userRef);
      if (!userRefSnap.exists()) {
        setDoc(doc(db, "users", result.user.uid), {
          UID: result.user.uid,
          name: user.displayName,
          admin: false,
        });
      } else {
        currentUser = userRefSnap.data();
      }
    })
    .catch((error) => {
      console.log(error.message);
    });

  return currentUser;
};
</script>

<style scoped>
li {
  @apply font-semibold flex gap-2 text-lg cursor-pointer rounded-sm m-0 px-4 py-2;
}
</style>
