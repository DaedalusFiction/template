<template>
  <InputDropdownListWrapper
    v-if="user"
    :title="user.data().displayName || 'Unknown User'"
  >
    <div v-if="user" class="border-b">
      <div class="flex justify-between">
        <p>Email:</p>
        <p>{{ user.data().email || "No email in database" }}</p>
      </div>
      <div class="flex justify-between">
        <p>Contributions:</p>
        <p>{{ user.data().contributions }}</p>
      </div>
      <div class="md:grid grid-cols-12">
        <div class="col-span-3">
          <p>Last modifications:</p>
        </div>
        <div class="col-span-9">
          <pre
            class="whitespace-pre-line"
            v-for="(modification, index) in sortedModifications"
            :key="index"
          >
              <code >
                <p
    
                >
                  {{ modification }}
                </p>
              </code>
              <hr/>
            </pre>
        </div>
      </div>
      <div class="flex justify-between">
        <p>Banned</p>
        <input type="checkbox" v-model="isBanned" @change="handleUpdateUser" />
      </div>
    </div>
  </InputDropdownListWrapper>
</template>

<script setup>
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase.config";

const { user } = defineProps(["user"]);
const isBanned = ref(user.data().isBanned || false);
const sortedModifications = ref([]);

onMounted(() => {
  if (user.data().modifications) {
    const sortedMods = user
      .data()
      .modifications?.sort((a, b) => b.lastModified - a.lastModified);
    sortedModifications.value = sortedMods.slice(0, 5);
  }
});

const handleUpdateUser = async () => {
  const updateTask = await updateDoc(doc(db, "users", user.id), {
    isBanned: isBanned.value,
  });
};
</script>
<style scoped></style>
