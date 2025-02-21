<template>
    <div class="flex justify-between my-3">
        <h5>{{ contributor.data().name }}</h5>
        <button @click="handleExpand">
            <IconsChevronDown v-if="!isExpanded" class="w-5" />
            <IconsChevronUp v-else class="w-5" />
        </button>
    </div>
    <div
        v-if="isExpanded"
        class="md:grid p-3 shadow-md rounded px-8 pt-6 pb-8 mb-4 grid-cols-12 gap-3 bg-[var(--color-background-off)]"
    >
        <div class="col-span-9 flex flex-col gap-3">
            <p><strong>Name:</strong> {{ contributor.data().name }}</p>
            <p><strong>Bio:</strong> {{ contributor.data().bio }}</p>
        </div>
        <div class="col-span-3 flex justify-end">
            <div class="flex flex-col gap-2 options">
                <FormConfirm
                    @confirm="handleDelete"
                    title="Delete"
                    text="Are you sure you want to delete this piece?"
                />
            </div>
        </div>
    </div>
    <hr />
</template>

<script setup>
import { deleteDoc, doc } from "firebase/firestore";
import { ref } from "vue";
import { db } from "~/firebase.config";

const props = defineProps(["contributor"]);
const emit = defineEmits(["update"]);
const isExpanded = ref(false);

const handleExpand = () => {
    isExpanded.value = !isExpanded.value;
};

const handleDelete = async () => {
    const documentRef = doc(db, "contributors", props.contributor.id);
    try {
        await deleteDoc(documentRef);
        emit("update");
    } catch (error) {
        console.log(error);
    }
};
</script>

<style scoped>
h4 {
    @apply my-0;
}
.options button,
.options a {
    @apply border-slate-200 brightness-105 border rounded-sm py-1 px-2 transition bg-[var(--color-background-off)] hover:bg-white;
}
</style>
