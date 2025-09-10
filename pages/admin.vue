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
            v-for="category in categories"
            @click="selectedCategory = category"
            :key="category.title"
            class="transition hover:bg-background dark:hover:bg-dark flex gap-2 w-full max-w-full p-2 cursor-pointer"
            :class="
              category.title === selectedCategory.title
                ? 'bg-background dark:bg-dark'
                : 'bg-backgroundAccent dark:bg-backgroundAccentDarkMode'
            "
          >
            <component :is="category.icon" class="w-5 dark:stroke-white" />
            <p>{{ category.title }}</p>
          </div>
        </div>
        <div class="col-span-10 p-3">
          <AdminList
            :category="selectedCategory"
            :items="items"
            @update="getDocuments(10, selectedCategory.collectionName)"
          />
          <!-- <AdminBanner v-if="selectedPanel === 'Banner Message'" />
          <AdminEventList v-if="selectedPanel === 'Events'" />
          <AdminArticleList v-if="selectedPanel === 'Articles'" />
          <AdminContributorList v-if="selectedPanel === 'Contributors'" />
          <AdminBookList v-if="selectedPanel === 'Portfolio'" />
          <AdminVideoList v-if="selectedPanel === 'Videos'" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { auth, db, provider } from "~/firebase.config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { ref, markRaw } from "vue";

definePageMeta({
  layout: "admin",
});
const admin = ref(false);
const envelopeIcon = markRaw(resolveComponent("IconsEnvelope"));
const bookIcon = markRaw(resolveComponent("IconsBook"));
const userIcon = markRaw(resolveComponent("IconsUser"));

const categories = [
  { title: "Events", icon: envelopeIcon, collectionName: "events" },
  { title: "Articles", icon: bookIcon, collectionName: "articles" },
  { title: "Contributors", icon: userIcon, collectionName: "contributors" },
  { title: "Portfolio", icon: userIcon, collectionName: "portfolio" },
  { title: "Videos", icon: userIcon, collectionName: "videos" },
  { title: "Banner Message", icon: userIcon, collectionName: "banner" },
];
const selectedCategory = ref(categories[0]);
const items = ref([]);

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

const getDocuments = async (total, collectionName) => {
  const articlesRef = collection(db, collectionName);
  const fetchedItems = await getDocs(
    query(articlesRef, limit(total), orderBy("dateUploaded", "desc"))
  );
  items.value = fetchedItems.docs;
};

onMounted(async () => {
  await getDocuments(10, selectedCategory.value.collectionName);
});

watch(
  () => selectedCategory.value,
  async () => {
    items.value = [];
    if (selectedCategory.value) {
      await getDocuments(10, selectedCategory.value.collectionName);
    }
  }
);
</script>

<style scoped>
li {
  @apply font-semibold flex gap-2 text-lg cursor-pointer rounded-sm m-0 px-4 py-2;
}
</style>
