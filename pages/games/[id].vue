<template>
  <div @click="handleClickAway">
    <div class="transition" :class="selectedImage && 'blur-sm'">
      <MetaStructuredData :games="[gameTask]" />
      <div class="flex justify-center">
        <p
          v-if="!firebaseUser"
          class="text-center w-full max-w-none rounded mb-6 py-2 bg-primary text-black"
        >
          Some of the information on this page may be incorrect. Please
          <button @click="handleLogin" class="underline">sign in</button>
          to edit.
        </p>
      </div>
      <div class="md:grid grid-cols-12 gap-4">
        <div class="col-span-8">
          <div
            v-if="game.images && game.images?.length > 0"
            class="transition image-container h-96 card"
          >
            <img :src="game.images[0]" alt="" />
          </div>
          <h2 class="my-8 md:text-6xl">{{ game.title }}</h2>
          <div class="flex justify-between border-b pb-2">
            <h4>Synopsis</h4>
            <button v-if="!firebaseUser" @click="handleLogin">
              <p>[ edit ]</p>
            </button>
            <div v-if="firebaseUser && !firebaseUser.isBanned">
              <button
                v-if="firebaseUser && !editingDescription"
                @click="editingDescription = true"
              >
                <p>[ edit ]</p>
              </button>
              <button
                v-else-if="firebaseUser && editingDescription"
                @click="editingDescription = false"
              >
                <p>[ close ]</p>
              </button>
            </div>
          </div>
          <p v-if="!editingDescription" class="whitespace-pre-wrap my-4">
            {{
              gameDescription || "No description available. Sign in to add one!"
            }}
          </p>
          <div v-else>
            <textarea
              v-model="gameDescription"
              rows="12"
              name="description"
              id="description"
            ></textarea>
            <button
              class="btn"
              :disabled="updateButtonsDisabled"
              @click="handleUpdateDescription"
            >
              Update
            </button>
          </div>
          <br />
          <div
            v-if="game.images && game.images.length > 1"
            class="flex justify-between border-b pb-2"
          >
            <h4>Gallery</h4>
          </div>
          <br />
          <div
            v-if="game.images && game.images?.length > 1"
            class="images grid gap-2 mb-12 grid-cols-3 md:grid-cols-12"
          >
            <div
              class="col-span-6 md:col-span-4"
              v-for="(image, index) in game.images?.slice(1, 7)"
              :key="image"
            >
              <div
                @click="handleExpandImage(index)"
                class="transition cursor-pointer hover:brightness-105 image-container h-56"
              >
                <img :src="image" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-4">
          <div v-if="game.externalLinks && game.externalLinks.length > 0">
            <div class="md:card">
              <h4>External Links</h4>
              <hr />
              <div
                v-for="(externalLink, index) in game.externalLinks"
                :key="index"
              >
                <NuxtLink
                  :href="externalLink.externalLink"
                  target="_blank"
                  rel="NOREFERRER"
                >
                  <button class="btn w-full my-2">
                    {{ externalLink.externalSite }}
                  </button>
                </NuxtLink>
              </div>
            </div>
            <br />
          </div>
          <div v-if="game.status === 'Released'">
            <div class="md:card">
              <h4>Score</h4>
              <hr />
              <div class="flex justify-between">
                <p>User Average:</p>
                <GameAverageScore :game="game" />
              </div>
              <div class="flex justify-between">
                <p>Your Score:</p>
                <GameUserScore :game="game" :gameId="gameTask.id" />
              </div>
            </div>
            <br />
          </div>
          <div class="md:card info">
            <div class="flex justify-between">
              <h4>Release info</h4>
              <button v-if="!firebaseUser" @click="handleLogin">
                <p>[ edit ]</p>
              </button>
              <div v-if="firebaseUser && !firebaseUser.isBanned">
                <button
                  v-if="firebaseUser && !editingReleaseInfo"
                  @click="editingReleaseInfo = true"
                >
                  <p>[ edit ]</p>
                </button>
                <button
                  v-else-if="firebaseUser && editingReleaseInfo"
                  @click="editingReleaseInfo = false"
                >
                  <p>[ close ]</p>
                </button>
              </div>
            </div>
            <hr />
            <div class="flex flex-col gap-2">
              <div>
                <p>Developer:</p>
                <NuxtLink
                  v-if="!editingReleaseInfo"
                  :to="`/search?q=` + developer"
                >
                  <p class="link">{{ developer }}</p>
                </NuxtLink>
                <input
                  v-else-if="firebaseUser && editingReleaseInfo"
                  type="text"
                  maxlength="40"
                  v-model="developer"
                />
              </div>
              <div>
                <p>Publisher:</p>
                <input
                  v-if="firebaseUser && editingReleaseInfo"
                  type="text"
                  maxlength="40"
                  v-model="publisher"
                />
                <p v-else>{{ publisher }}</p>
              </div>
              <div>
                <p>Status:</p>
                <select
                  v-if="firebaseUser && editingReleaseInfo"
                  v-model="status"
                  name="status"
                  id="status"
                >
                  <option v-for="(option, index) in statusOptions" :key="index">
                    {{ option }}
                  </option>
                </select>
                <p v-else class="capitalize">{{ status }}</p>
              </div>
              <div>
                <p>Release Date:</p>
                <input
                  v-if="firebaseUser && editingReleaseInfo"
                  type="date"
                  maxlength="40"
                  v-model="releaseDate"
                />
                <p v-else>{{ releaseDate }}</p>
              </div>
              <div>
                <p>Rating:</p>
                <select
                  v-if="firebaseUser && editingReleaseInfo"
                  v-model="rating"
                  name="rating"
                  id="rating"
                >
                  <option v-for="(option, index) in ratingOptions" :key="index">
                    {{ option }}
                  </option>
                </select>
                <p v-else>{{ rating }}</p>
              </div>
              <!-- <div>
                <p>Engine:</p>
                <select
                  v-if="firebaseUser && editingReleaseInfo"
                  v-model="engine"
                  name="engine"
                  id="engine"
                >
                  <option v-for="(option, index) in engineOptions" :key="index">
                    {{ option }}
                  </option>
                </select>
                <p v-else class="capitalize">{{ engine }}</p>
              </div> -->
              <div>
                <p>Platforms:</p>
                <div v-if="firebaseUser && editingReleaseInfo">
                  <InputArraySelection
                    v-model="platforms"
                    fkey="platforms"
                    :inputOptions="platformOptions"
                  />
                </div>
                <div v-else class="tags">
                  <p
                    v-for="platform in platforms"
                    :key="platform"
                    class="text-right"
                  >
                    {{ platform }}
                  </p>
                </div>
              </div>
            </div>
            <button
              v-if="editingReleaseInfo"
              class="btn"
              @click="handleUpdateReleaseInfo"
              :disabled="updateButtonsDisabled"
            >
              Update
            </button>
          </div>
          <br />
          <div class="md:card info">
            <div class="flex justify-between">
              <h4>Gameplay info</h4>
              <button v-if="!firebaseUser" @click="handleLogin">
                <p>[ edit ]</p>
              </button>
              <div v-if="firebaseUser && !firebaseUser.isBanned">
                <button
                  v-if="firebaseUser && !editingGameplayInfo"
                  @click="editingGameplayInfo = true"
                >
                  <p>[ edit ]</p>
                </button>
                <button
                  v-else-if="firebaseUser && editingGameplayInfo"
                  @click="editingGameplayInfo = false"
                >
                  <p>[ close ]</p>
                </button>
              </div>
            </div>
            <hr />
            <div v-if="firebaseUser && editingGameplayInfo">
              <p>Gameplay Properties:</p>
              <InputArraySelection
                v-model="gameplayProperties"
                fkey="properties"
                :inputOptions="propertyOptions"
              />
            </div>
            <div v-else v-for="property in propertyOptions" :key="property">
              <p
                :class="
                  !gameplayProperties?.includes(property) &&
                  'line-through brightness-50 '
                "
              >
                {{ property }}
                <span v-if="gameplayProperties?.includes(property)"
                  >&#10003;</span
                >
              </p>
            </div>
            <button
              v-if="editingGameplayInfo"
              class="btn"
              @click="handleUpdateGameplayInfo"
              :disabled="updateButtonsDisabled"
            >
              Update
            </button>
          </div>
          <br />
          <div class="md:card info">
            <div class="flex justify-between">
              <h4>Tags</h4>
              <button v-if="!firebaseUser" @click="handleLogin">
                <p>[ edit ]</p>
              </button>
              <div v-if="firebaseUser && !firebaseUser.isBanned">
                <button
                  v-if="firebaseUser && !editingTags"
                  @click="editingTags = true"
                >
                  <p>[ edit ]</p>
                </button>
                <button
                  v-else-if="firebaseUser && editingTags"
                  @click="editingTags = false"
                >
                  <p>[ close ]</p>
                </button>
              </div>
            </div>
            <hr />
            <div class="mt-3" v-if="firebaseUser && editingTags">
              <InputArraySelection
                v-model="_tags"
                fkey="_tags"
                :inputOptions="tagOptions"
              />
            </div>
            <div v-else class="flex mt-3 tags flex-wrap gap-3 justify-start">
              <div v-for="tag in _tags" :key="tag">
                <NuxtLink :to="`/search?tag=` + tag">
                  <p
                    class="text-white bg-secondary transition hover:brightness-110 rounded py-1 px-2"
                  >
                    {{ tag }}
                  </p>
                </NuxtLink>
              </div>
            </div>
            <button
              v-if="editingTags"
              class="btn"
              :disabled="updateButtonsDisabled"
              @click="handleUpdateTags"
            >
              Update
            </button>
          </div>
          <br />
          <div class="info md:card">
            <h4>BSDB Actions</h4>
            <hr />
            <div class="flex flex-col items-start">
              <button @click="handleAddToCollection">
                <p class="underline link">Add to collection</p>
              </button>
              <button @click="handleAddToWishlist">
                <p class="underline link">Add to wishlist</p>
              </button>
              <ButtonConfirmWithQuestion
                title="Report this game listing"
                text="Report a problem"
                confirmButtonText="Report"
                @confirm="handleReportProblem"
                placeholder="Describe the issue..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <GameSuggestions v-if="gameTask" :game="gameTask" />
    <div
      v-if="selectedImage"
      class="fixed z-20 top-0 left-0 h-screen w-screen flex justify-center items-center blur-0"
    >
      <img :src="selectedImage" alt="" class="max-w-[90%]" />
    </div>
  </div>
</template>

<script setup>
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "~/firebase.config";
const route = useRoute();
import {
  platformOptions,
  propertyOptions,
  ratingOptions,
  tagOptions,
  statusOptions,
} from "~/data";
import useLogin from "~/composables/login";
import useProfanityFilter from "~/composables/profanityFilter";
import useSnackbar from "~/composables/showSnackbar";
import useIncrementContributions from "~/composables/incrementContributions";
const firebaseUser = useState("firebaseUser");
const gameDocRef = doc(db, "games", route.params.id);
const gameTask = await getDoc(gameDocRef);
const game = ref(gameTask.data());

const developer = ref(gameTask.data().developer);
const publisher = ref(gameTask.data().publisher);
const releaseDate = ref(gameTask.data().releaseDate);
const rating = ref(gameTask.data().rating);
const platforms = ref(gameTask.data().platforms);
const gameplayProperties = ref(gameTask.data().properties);
const status = ref(gameTask.data().status);
const _tags = ref(gameTask.data()._tags);
const updateButtonsDisabled = ref(false);
const firebaseID = useState("firebaseID");
const editingDescription = ref(false);
const editingReleaseInfo = ref(false);
const editingGameplayInfo = ref(false);
const editingTags = ref(false);

const selectedImage = ref(null);

const gameDescription = ref(gameTask.data().synopsis || "");

const handleLogin = async () => {
  await useLogin("in");
};

const handleUpdateDescription = async () => {
  const { result } = useProfanityFilter(gameDescription.value);
  if (result) {
    useSnackbar("Description cannot contain profanity.");
    return;
  }
  const modification = {
    game: game.value.title,
    description: gameDescription.value,
    synopsis: gameDescription.value,
    lastModified: Date.now(),
  };
  await updateDoc(gameDocRef, modification);
  await incrementContributions(modification);
  editingDescription.value = false;
};

const handleUpdateReleaseInfo = async () => {
  const modification = {
    game: game.value.title,
    developer: developer.value,
    publisher: publisher.value,
    status: status.value,
    releaseDate: releaseDate.value,
    rating: rating.value,
    platforms: platforms.value,
    lastModified: Date.now(),
  };
  await updateDoc(gameDocRef, modification);
  await incrementContributions(modification);
  editingReleaseInfo.value = false;
};

const handleUpdateGameplayInfo = async () => {
  const modification = {
    game: game.value.title,
    properties: gameplayProperties.value,
    lastModified: Date.now(),
  };
  await updateDoc(gameDocRef, modification);
  await incrementContributions(modification);
  editingGameplayInfo.value = false;
};

const handleUpdateTags = async () => {
  const modification = {
    game: game.value.title,
    _tags: _tags.value,
    lastModified: Date.now(),
  };
  await updateDoc(gameDocRef, modification);
  await incrementContributions(modification);
  editingTags.value = false;
};

const incrementContributions = async (modification) => {
  await useIncrementContributions(modification);
  await refreshUser();
  useSnackbar("Page Updated!");
};

const refreshUser = async () => {
  const user = await getDoc(doc(db, "users", firebaseID.value));
  firebaseUser.value = user.data();
};

const handleAddToCollection = async () => {
  if (!firebaseID.value) {
    useSnackbar("You must be logged in to use this feature");
    return;
  }
  await updateDoc(doc(db, "users", firebaseID.value), {
    collection: arrayUnion(route.params.id),
  });
  await refreshUser();
  useSnackbar("Game Added to Collection!");
};

const handleAddToWishlist = async () => {
  if (!firebaseID.value) {
    useSnackbar("You must be logged in to use this feature");
    return;
  }
  await updateDoc(doc(db, "users", firebaseID.value), {
    wishlist: arrayUnion(route.params.id),
  });
  await refreshUser();
  useSnackbar("Game Added to Wishlist!");
};

const handleReportProblem = async (text) => {
  await addDoc(collection(db, "reports"), {
    reason: text,
    game: game.value.title,
    user: firebaseUser.value ? firebaseUser.value.email : "Unknown user",
  });
  useSnackbar("Report received! Thank you!");
};

const handleExpandImage = (index) => {
  setTimeout(() => {
    selectedImage.value = game.value.images[index + 1];
  }, 100);
};

const handleClickAway = () => {
  if (selectedImage.value != null) {
    selectedImage.value = null;
  }
};
</script>

<style scoped>
.banner {
  @apply bg-center bg-cover mt-6;
}

.page-header-game {
  @apply pt-[40vh] pb-12 px-3;
}

.info div:not(.tags) {
  @apply flex justify-between flex-wrap;
}

hr {
  @apply my-1 border-[var(--color-text-muted)];
}
</style>
