<template>
    <div>
        <h4>Create Contributor:</h4>
        <AdminCreateContributor />
        <br />
        <h4>Manage existing Contributors:</h4>
        <div v-for="contributor in contributors" :key="contributor.id">
            <AdminContributor
                :contributor="contributor"
                @update="getContributors"
            />
        </div>
    </div>
</template>

<script setup>
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "~/firebase.config";
const contributors = ref([]);

const getContributors = async () => {
    const contributorRef = collection(db, "contributors");
    const items = await getDocs(
        query(contributorRef, limit(250), orderBy("name"))
    );
    contributors.value = items.docs;
};

getContributors();
</script>

<style scoped></style>
