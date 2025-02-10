<template>
  <InputDropdownListWrapper
    v-if="report"
    :title="report.data().game || 'Unknown report'"
  >
    <div class="">
      <div class="flex justify-between">
        <p>User:</p>
        <p>{{ report.data().user }}</p>
      </div>
      <div class="flex justify-between">
        <p>Reason:</p>
        <p>{{ report.data().reason }}</p>
      </div>
    </div>
  </InputDropdownListWrapper>
</template>

<script setup>
const { report } = defineProps(["report"]);
</script>
<style scoped></style>
