<template>
  <div class="flex flex-col md:grid grid-cols-12 gap-3">
    <div class="col-span-6">
      <h4 class="mb-2">Publish to {{ category.title }}</h4>

      <div v-if="isExpanded" class="p-2">
        <AdminArticleForm
          v-if="category.title === 'Articles'"
          @update="updateList()"
        />
        <AdminEventForm
          v-if="category.title === 'Events'"
          @update="updateList()"
        />
        <AdminContributorForm
          v-if="category.title === 'Contributors'"
          @update="updateList()"
        />
        <AdminBookForm
          v-if="category.title === 'Portfolio'"
          @update="updateList()"
        />
        <AdminVideoForm
          v-if="category.title === 'Videos'"
          @update="updateList()"
        />
        <AdminBanner
          v-if="category.title === 'Banner Message'"
          @update="useSnackbar('Banner Set!')"
        />
      </div>
      <button class="btn" @click="toggleExpandNewDocument">
        {{ isExpanded ? "Close" : "expand" }}
      </button>
    </div>
    <div v-if="category.title !== 'Banner Message'" class="col-span-6">
      <h4 class="mb-2">Manage existing {{ category.title }}</h4>
      <div
        v-for="item in items"
        :key="item.id"
        class="rounded transition my-1 border"
      >
        <div
          @click="toggleExpand(item.id)"
          class="flex p-2 justify-between rounded cursor-pointer hover:bg-backgroundAccent dark:hover:bg-backgroundAccentDarkMode"
          :class="
            expandedItems[item.id] &&
            'bg-backgroundAccent dark:bg-backgroundAccentDarkMode'
          "
        >
          <p>{{ item.data().title || "No Title" }}</p>
          <p>
            {{ new Date(item.data().dateUploaded).toLocaleDateString() }}
          </p>
        </div>
        <div v-if="expandedItems[item.id]">
          <div class="p-3">
            <AdminArticleForm
              v-if="category.title === 'Articles'"
              :article="item"
              @update="updateList()"
            />
            <AdminBookForm
              v-if="category.title === 'Portfolio'"
              :book="item"
              @update="updateList()"
            />
            <AdminContributorForm
              v-if="category.title === 'Contributors'"
              :contributor="item"
              @update="updateList()"
            />
            <AdminEventForm
              v-if="category.title === 'Events'"
              :event="item"
              @update="updateList()"
            />
            <AdminVideoForm
              v-if="category.title === 'Videos'"
              :video="item"
              @update="updateList()"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <button class="btn" @click="handleShowMoreDocuments">More</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import useSnackbar from "~/composables/showSnackbar";

const { category, items } = defineProps(["category", "items"]);

const emit = defineEmits(["update"]);
const expandedItems = reactive({});
const pageSize = 10;
const numberOfShownDocuments = ref(pageSize);

const isExpanded = ref(false);
const toggleExpandNewDocument = () => {
  isExpanded.value = !isExpanded.value;
};

const updateList = () => {
  isExpanded.value = false;
  emit("update");
};

const handleShowMoreDocuments = () => {
  numberOfShownDocuments.value += pageSize;
};

const toggleExpand = (articleId) => {
  expandedItems[articleId] = !expandedItems[articleId];
};
</script>

<style scoped></style>
