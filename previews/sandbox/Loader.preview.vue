<script setup lang="ts">
import Loader from "@src/CoreUI/Components/Loader/Loader.vue"
import { useLoaderStore } from "@src/CoreUI/Components/Loader/LoaderStore";
import { delay } from "./helper";

const store = useLoaderStore();

async function showLoader() {
    store.setIsLoading(true)
    await delay(1500)
    store.setIsLoading(false)
}

</script>
<template>
    <div class="text-center">
        <v-btn @click="showLoader">Open Loader</v-btn>
    </div>
    <Loader />
</template>
