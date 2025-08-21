<script setup lang="ts">
import ThemeSwitch from "@src/CoreUI/Components/ThemeSwitch.vue"
import { useGlobalStore } from "./GlobalStore";

const store = useGlobalStore();

function onToggleTheme(value: boolean | null) {
    if (value != null) {
        store.setIsDarkTheme(value)
    }
}

</script>
<template>
    <ThemeSwitch :isDarkTheme="store.isDarkTheme" @onToggleTheme="onToggleTheme" />
</template>
