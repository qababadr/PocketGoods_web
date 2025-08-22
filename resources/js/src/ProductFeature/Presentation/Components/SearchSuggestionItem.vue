<script setup lang="ts">
type Props = {
    imageUrl: string;
    title: string;
    category: string;
};

const { imageUrl, title, category } = defineProps<Props>();
const emits = defineEmits(["onClick"]);
</script>

<template>
    <v-list-item @click="emits('onClick')" class="align-baseline">
        <template v-slot:title>
            <span class="text-caption font-weight-bold ms-1 text-primary">
                {{ title }}
            </span>
        </template>
        <template v-slot:prepend>
            <v-img class="bg-white rounded" width="85" :aspect-ratio="1" :src="imageUrl" cover></v-img>
        </template>

        <template v-slot:subtitle>
            <span class="text-caption ms-1">
                {{ category }}
            </span>
        </template>
    </v-list-item>
</template>
<style scoped>
.align-baseline :deep(.v-list-item__content) {
    align-self: baseline;
}
</style>