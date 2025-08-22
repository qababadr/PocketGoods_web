<script setup lang="ts">
import { ProductPreview } from '@src/Core';
import SearchSuggestionItem from './SearchSuggestionItem.vue';
interface Props {
    suggestions: ProductPreview[]
    isLoading: boolean
    searchQuery: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'onSearchQueryChanged', value: string): void,
    (e: 'onSearchButtonClick'): void
    (e: 'onSuggestionClick', id: number, title: string): void
}>();
</script>
<template>
    <div class="search-wrapper">
        <v-autocomplete :items="props.suggestions" :loading="props.isLoading" :search="props.searchQuery"
            item-text="title" item-value="id" label="Search" variant="solo" density="compact" class="search-input"
            append-inner-icon="mdi-magnify" menu-icon="" rounded single-line clearable return-object hide-no-data
            @update:search="(value: string) => emit('onSearchQueryChanged', value)"
            @click:append-inner="emit('onSearchButtonClick')">
            <template v-slot:item="{ item }">
                <SearchSuggestionItem :image-url="item.raw.thumbnail ?? ''" :category="item.raw.category"
                    :title="item.raw.title" @on-click="emit('onSuggestionClick', item.raw.id, item.raw.title)" />
            </template>
        </v-autocomplete>
    </div>
</template>

<style scoped>
.search-wrapper {
    transition: width 0.3s ease;
    width: 200px;
}

.search-wrapper:focus-within {
    width: 40vw;
}

.search-input :deep(.v-field__overlay) {
    background-color: transparent;
}
</style>
