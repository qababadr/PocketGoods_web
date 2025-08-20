<script setup lang="ts">
interface Props {
    isDarkTheme: boolean;
}
const props = withDefaults(defineProps<Props>(), { isDarkTheme: false });
const emit = defineEmits<{
    (e: 'onToggleTheme', value: boolean | null): void
}>();
</script>
<template>
    <v-switch inset :model-value="props.isDarkTheme" @update:model-value="(val) => emit('onToggleTheme', val)"
        hide-details color="primary" class="dark-mode-icon-switch">
        <template #thumb>
            <v-icon>
                {{ props.isDarkTheme ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}
            </v-icon>
        </template>
    </v-switch>
</template>
<style scoped>
.dark-mode-icon-switch {
    width: 56px;
}

.dark-mode-icon-switch :deep(.v-selection-control__wrapper) {
    justify-content: center;
}
</style>