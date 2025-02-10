<template>
  <div>
    <h2 class="page-header">My Lists</h2>
    <div v-if="firebaseUser">
      <div class="max-w-3xl mx-auto">
        <h4 class="setting-header">My Collection</h4>

        <UserList :list="firebaseUser.collection" listName="collection" />

        <h4 class="setting-header">My Wishlist</h4>
        <UserList :list="firebaseUser.wishlist" listName="wishlist" />
      </div>
    </div>
    <p v-else>
      Please
      <button class="underline" @click="handleLogin">
        sign in with Google
      </button>
      to view your lists.
    </p>
  </div>
</template>

<script setup>
import useLogin from "~/composables/login";

const firebaseUser = useState("firebaseUser");

const handleLogin = async () => {
  await useLogin("in");
};
</script>

<style scoped>
.setting-header {
  @apply pt-2 text-primary;
}
</style>
