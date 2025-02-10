<template>
  <div>
    <h2 class="mb-24">Admin</h2>
    <button v-if="!firebaseUser" class="btn my-3" @click="handleSignIn">
      Sign In
    </button>
    <div
      v-else-if="firebaseUser && firebaseUser.admin"
      class="md:grid grid-cols-12 gap-3"
    >
      <div class="md:col-span-3">
        <div class="card">
          <button
            v-for="panel in panels"
            @click="activePanel = panel"
            :class="activePanel === panel && 'bg-backgroundHover '"
          >
            <div class="flex justify-between">
              <p>{{ panel }}</p>
              <IconsChevronDown
                color="white"
                class="transition"
                :class="activePanel !== panel ? 'rotate-0' : '-rotate-90'"
              />
            </div>
          </button>
        </div>
      </div>
      <div class="md:col-span-9">
        <div v-if="activePanel === 'Games'" class="card">
          <h4>Search</h4>
          <div class="flex items-center input-wrapper my-2">
            <IconsSearch />
            <input
              type="text"
              placeholder="Search"
              v-model="searchValue"
              class="focus:outline-none"
              @keyup.enter="handleSearch"
            />
            <IconsCancelCircle
              v-if="searchValue.length > 0"
              @click="handleClearSearch"
              class="cursor-pointer"
            />
          </div>
          <GameFormExisting
            v-for="(game, index) in searchedGames"
            :key="index"
            :gameID="game.objectID"
            collection="games"
            :admin="true"
            :game="game"
            @update="getGames"
          />
          <br />
          <h4>Recently Modified</h4>

          <div>
            <GameFormExisting
              v-for="game in games"
              :admin="true"
              :key="game.id"
              :gameID="game.id"
              collection="games"
              :game="game.data()"
              @update="getGames"
            />
          </div>
        </div>
        <div v-if="activePanel === 'Add Game'" class="card">
          <h4>Add Game</h4>
          <GameFormNew @update="getGames" collection="games" />
        </div>
        <div v-if="activePanel === 'Users'" class="card">
          <h4>Users</h4>
          <div v-for="(user, index) in users" :key="index">
            <AdminUser :user="user" />
          </div>
        </div>
        <div v-if="activePanel === 'Contributions'" class="card">
          <h4>Contributions</h4>
          <div v-for="contribution in contributions" :key="contribution.id">
            <GameFormExisting
              collection="contributions"
              :gameID="contribution.id"
              :game="contribution.data()"
              @update="
                () => {
                  getGames();
                  getContributions();
                }
              "
            />
          </div>
        </div>
        <div v-if="activePanel === 'Reports'" class="card">
          <h4>Reports</h4>
          <AdminReport
            v-for="(report, index) in reports"
            :key="index"
            :report="report"
          />
        </div>
      </div>
    </div>

    <p v-if="firebaseUser && !firebaseUser.admin">
      You are not an administrator
    </p>
  </div>
</template>

<script setup>
import { db } from "~/firebase.config";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  emptyForm,
  tagOptions,
  platformOptions,
  propertyOptions,
  ratingOptions,
} from "../../data";
import useLogin from "../../composables/login";
import useSearch from "~/composables/search";
import useSnackbar from "~/composables/showSnackbar";

const contributions = ref([]);
const reports = ref([]);
const games = ref([]);
const users = ref([]);
const gameTitle = ref("");
const panels = ["Games", "Add Game", "Users", "Contributions", "Reports"];
const activePanel = ref("Games");
const disabled = ref(false);
const gamesRef = collection(db, "games");
const usersRef = collection(db, "users");
const contributionsRef = collection(db, "contributions");
const reportsRef = collection(db, "reports");
const firebaseUser = useState("firebaseUser");
const searchValue = ref("");
const searchedGames = ref([]);

const handleSearch = async () => {
  searchedGames.value = [];
  const { hits } = await useSearch(searchValue.value, 5);
  searchedGames.value = hits;
};

const handleClearSearch = () => {
  searchValue.value = "";
};

const handleSignIn = async () => {
  await useLogin();
  await getUsers();
  await getGames();
  await getContributions();
  await getReports();
};

onMounted(async () => {
  if (firebaseUser.value && firebaseUser.value.admin) {
    await getUsers();
    await getGames();
    await getContributions();
    await getReports();
  }
});

const handleGenerateGame = async (title) => {
  if (title === "") {
    return;
  }

  disabled.value = true;

  const detailsPrompt = `For all of the following, strongly favor information from reputable videogame databases like mobygames.com. Take this emptyForm object and fill it out for the game ${title}.
    Select the applicable platforms from the following list: ${JSON.stringify(
      platformOptions
    )}; Include the platforms of remastered and rereleased versions when building the platforms array.
    
    Select the appropriate rating from the following list: ${JSON.stringify(
      ratingOptions
    )};
    Select the appropriate properties from the following list: ${JSON.stringify(
      propertyOptions
    )};Use JSON format.
    Format the initial release date like: YYYY-MM-DD. Here is the form to fill out: ${JSON.stringify(
      emptyForm
    )};; `;

  const details = await useFetch("/api/askClaude", {
    method: "POST",
    body: { prompt: detailsPrompt, prefill: "{", model: "haiku" },
  });
  const detailsJSON = "{" + details.data.value.message;

  const existingGames = await getDocs(
    query(
      collection(db, "games"),
      where("title", "==", JSON.parse(detailsJSON).title)
    )
  );

  if (existingGames.docs?.length > 0) {
    useSnackbar("Game already exists");
    disabled.value = false;
    return;
  }

  const tagsPrompt = `For all of the following, strongly favor information from reputable videogame databases like mobygames.com. Generate an array of 8-10 tags that should be applied to the game ${title} using this list: ${JSON.stringify(
    tagOptions
  )}. For example, if the game contains a grappling hook and is set in a fantasy world, return an object that looks like this: ["grappling hook", "fantasy"]`;

  const tags = await useFetch("/api/askClaude", {
    method: "POST",
    body: { prompt: tagsPrompt, prefill: "[", model: "sonnet" },
  });
  const tagsJSON = "[" + tags.data.value.message;

  const description = await handleGenerateDescription(title);

  try {
    const parsedDetails = JSON.parse(detailsJSON);
    const parsedTags = JSON.parse(tagsJSON);

    await addDoc(collection(db, "games"), {
      ...parsedDetails,
      _tags: parsedTags,
      description: description,
      dateUploaded: Date.now(),
      isReviewed: false,
      isActive: false,
      lastModified: Date.now(),
    });
    useSnackbar("Success!");
    getGames();
    disabled.value = false;
    return true;
  } catch (error) {
    useSnackbar("Error creating document");
    return false;
  }
};

const handleGenerateDescription = async (title) => {
  const descriptionPrompt = `For the following, strongly favor information from reputable videogame databases like mobygames.com. Give me a description of the video game ${title}. Assume that I am very familiar with games in this game's genre.`;
  const { data } = await useFetch("/api/askClaude", {
    method: "POST",
    body: { prompt: descriptionPrompt, prefill: "", model: "sonnet" },
  });
  return data.value.message;
};

const getGames = async () => {
  const items = await getDocs(
    query(gamesRef, limit(5), orderBy("lastModified", "desc"))
  );
  games.value = items.docs;
  gameTitle.value = "";
};
const getContributions = async () => {
  const items = await getDocs(
    query(contributionsRef, limit(25), orderBy("dateUploaded", "desc"))
  );
  contributions.value = items.docs;
};
const getUsers = async () => {
  const items = await getDocs(query(usersRef, limit(30)));
  users.value = items.docs;
};
const getReports = async () => {
  const items = await getDocs(query(reportsRef, limit(30)));
  reports.value = items.docs;
};
</script>

<style scoped>
.card button {
  @apply transition w-full text-start rounded hover:bg-backgroundHover p-2 my-1;
}
label {
  @apply text-white block mb-1;
}

button:disabled {
  @apply grayscale transition;
}
</style>
