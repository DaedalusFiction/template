<template>
  <div>
    <div v-if="admin" class="field">
      <div class="col-span-4">
        <p>Title:</p>
      </div>
      <div class="col-span-8">
        <div>
          <input maxlength="60" type="text" v-model="formData[`title`]" />
        </div>
      </div>
    </div>
    <div class="field">
      <div class="col-span-4">
        <p>Developer:</p>
      </div>
      <div class="col-span-8">
        <div>
          <input maxlength="60" type="text" v-model="formData[`developer`]" />
        </div>
      </div>
    </div>
    <div class="field">
      <div class="col-span-4">
        <p>Publisher:</p>
      </div>
      <div class="col-span-8">
        <div>
          <input maxlength="60" type="text" v-model="formData[`publisher`]" />
        </div>
      </div>
    </div>
    <div class="field">
      <div class="col-span-4">
        <p>Synopsis:</p>
      </div>
      <div class="col-span-8">
        <div>
          <textarea rows="6" maxlength="5000" v-model="formData[`synopsis`]" />
        </div>
      </div>
    </div>
    <div class="field">
      <div class="col-span-4">
        <p>Release Date:</p>
      </div>
      <div class="col-span-8">
        <input type="date" v-model="formData[`releaseDate`]" />
      </div>
    </div>
    <div class="field">
      <div class="col-span-4">
        <p>Platforms:</p>
      </div>
      <div class="col-span-8">
        <InputArraySelection
          v-model="formData[`platforms`]"
          fkey="platforms"
          :inputOptions="platformOptions"
        />
      </div>
    </div>
    <div class="field">
      <div class="col-span-4">
        <p>Rating:</p>
      </div>
      <div class="col-span-8">
        <InputDropdown :options="ratingOptions" v-model="formData[`rating`]" />
      </div>
    </div>
    <div class="field">
      <div class="col-span-4">
        <p>Status:</p>
      </div>
      <div class="col-span-8">
        <InputDropdown :options="statusOptions" v-model="formData[`status`]" />
      </div>
    </div>
    <!-- <div class="field">
      <div class="col-span-4">
        <p>Engine:</p>
      </div>
      <div class="col-span-8">
        <InputDropdown :options="engineOptions" v-model="formData[`engine`]" />
      </div>
    </div> -->
    <div class="field">
      <div class="col-span-4">
        <p>Game Properties:</p>
      </div>
      <div class="col-span-8">
        <InputArraySelection
          v-model="formData[`properties`]"
          fkey="property"
          :inputOptions="propertyOptions"
        />
      </div>
    </div>
    <div class="field">
      <div class="col-span-4">
        <p>Tags:</p>
      </div>
      <div class="col-span-8">
        <InputArraySelection
          v-model="formData[`_tags`]"
          fkey="tags"
          :inputOptions="tagOptions"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  platformOptions,
  ratingOptions,
  tagOptions,
  propertyOptions,
  statusOptions,
} from "~/data";
const props = defineProps(["formData", "admin"]);
</script>

<style scoped></style>
