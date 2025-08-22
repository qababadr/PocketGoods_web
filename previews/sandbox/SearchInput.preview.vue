<script setup lang="ts">
import SearchInput from '@src/ProductFeature/Presentation/Components/SearchInput.vue';
import { useGlobalStore } from './GlobalStore';
import { watch } from 'vue';
import { delay } from './helper';
import { debounce } from 'lodash';
const store = useGlobalStore()

const debouncedSearch = debounce(() => {
    store.searchSuggestions();
}, 500);

watch(
    () => store.searchQuery,
    (newValue) => {
        if (!newValue) return;
        debouncedSearch();
    }
);

function onSearchButtonClick() {
    alert(`performing search with query ${store.searchQuery}`)
}

function onSuggestionClick(id: number, title: string) {
    alert(`navigating to product (${id}, ${title})`)
}

</script>
<template>
    <search-input :is-loading="store.isProcessing" :search-query="store.searchQuery"
        :suggestions="store.suggestedProducts" @on-search-query-changed="(value: string) => store.setSearchQuery(value)"
        @on-search-button-click="onSearchButtonClick" @on-suggestion-click="onSuggestionClick" />
</template>
