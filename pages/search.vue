<template>
  <div>
    <h2 class="page-header truncate">Results</h2>

    <div class="flex relative flex-wrap-reverse md:grid grid-cols-12 gap-8">
      <div class="w-full col-span-9">
        <div>
          <p v-if="searchResults.length < 1">
            No results. Try widening your search parameters.
          </p>
          <div class="flex flex-col gap-8">
            <div
              v-for="result in searchResults"
              class=""
              :key="result.objectID"
            >
              <LayoutSearchResult :result="result" />
            </div>
            <div
              v-if="searchResults.length < totalHits"
              class="col-span-12 flex justify-center"
            >
              <button @click="handleLoadMoreGames" class="btn w-full">
                More Games
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full col-span-3">
        <div class="card">
          <div
            @click="filtersExpanded = !filtersExpanded"
            class="flex justify-between"
            :class="!filtersExpanded ? 'md:hidden' : 'md:flex'"
          >
            <h6>Filters</h6>
            <IconsChevronDown
              class="transition"
              color="white"
              :class="!filtersExpanded && '-rotate-90'"
            />
          </div>
          <div
            :class="!filtersExpanded ? 'hidden md:flex w-full' : 'flex w-full'"
          >
            <div class="w-full">
              <div class="w-full">
                <h5 class="my-1">Search Term</h5>
                <input
                  v-model="query"
                  @keyup.enter="applyFilters"
                  type="text"
                  placeholder=""
                />
              </div>
              <h5 class="mt-3">Properties</h5>
              <div
                v-for="property in propertyOptions"
                :key="property"
                class="flex gap-2"
              >
                <input
                  type="checkbox"
                  :id="`has-${property.toLowerCase()}`"
                  :value="property"
                  v-model="searchFilters.properties"
                />
                <label :for="`has-${property.toLowerCase()}`">
                  <p>{{ property }}</p>
                </label>
              </div>
              <h5 class="mt-3">Platforms</h5>
              <InputArraySelection
                v-model="searchFilters.platforms"
                fkey="platforms"
                :inputOptions="platformOptions"
              />
              <h5 class="mb-2">Tags (include)</h5>
              <InputArraySelection
                v-model="searchFilters._tags"
                fkey="tags"
                :inputOptions="tagOptions"
              />
              <h5 class="mb-2">Tags (exclude)</h5>
              <InputArraySelection
                v-model="searchFilters.excludedTags"
                fkey="tags"
                :inputOptions="tagOptions"
              />
              <div class="flex justify-end">
                <button class="btn mt-3" @click="applyFilters">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

import { filters, propertyOptions, platformOptions, tagOptions } from "~/data";
import useSearch from "~/composables/search";

const tagQuery = ref(route.query.tag);
const searchFilters = ref({ ...filters, excludedTags: [] });

if (tagQuery?.value && !searchFilters.value._tags.includes(tagQuery.value)) {
  searchFilters.value._tags = [tagQuery.value];
} else {
  searchFilters.value._tags = [];
}
const filtersExpanded = ref(false);
const searchResults = ref([]);
const totalHits = ref(0);
const query = ref(route.query.q);
const hitsPerPage = ref(10);

const getSearchResults = async (query) => {
  let platformsFilters = "";
  let platformsArray = [];
  let filters = [];
  let excludedTags = searchFilters.value.excludedTags?.map(
    (excludedTag) => `-${excludedTag}`
  );
  const propertyFilters = searchFilters.value.properties?.map(
    (property) => `properties:"${property}"`
  );

  platformsArray = searchFilters.value.platforms?.map(
    (platform) => `platforms:"${platform}"`
  );

  if (platformsArray.length > 0) {
    platformsFilters = `(${platformsArray.join(" OR ")})`;
    filters = [platformsFilters];
  }

  filters = [...filters, ...propertyFilters];

  const formattedFilters = filters ? filters.join(" AND ") : "";

  const allTagFilters = [...searchFilters.value._tags, ...excludedTags];
  const formattedTagFilters = searchFilters.value
    ? allTagFilters.join(", ")
    : "";
  console.log(formattedTagFilters);
  const { hits, nbHits } = await useSearch(
    query,
    hitsPerPage.value,
    formattedFilters,
    formattedTagFilters
  );

  totalHits.value = nbHits;
  searchResults.value = hits;
};

const applyFilters = () => {
  getSearchResults(query.value);
  filtersExpanded.value = false;
  window.scrollTo(0, 0);
};

const handleLoadMoreGames = () => {
  hitsPerPage.value += 10;
};

watch(
  () => route.query.q,
  async () => {
    query.value = route.query.q;
    getSearchResults(route.query.q);
  }
);

watch(
  () => hitsPerPage.value,
  async () => {
    getSearchResults(route.query.q);
  }
);

getSearchResults(route.query.q);
</script>

<style scoped></style>
