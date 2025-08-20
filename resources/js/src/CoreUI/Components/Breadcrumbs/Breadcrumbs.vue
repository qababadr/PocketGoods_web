<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { BreadcrumbsItem } from './BreadcrumbsItem';
import { useRoute } from 'vue-router';
import { Constants } from '@src/CoreUI/Util/constants';
const route = useRoute();

const pageTitle = ref(document.title);

const items = computed<BreadcrumbsItem[]>(() => {
    const paths = route.path.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbsItem[] = [];
    let accumulatedPath = '';

    paths.forEach((segment, index) => {
        if (segment.match(/^\d+$/))
            return;

        accumulatedPath += '/' + segment;
        breadcrumbs.push({
            title: index === 0 ? pageTitle.value : decodeURIComponent(segment),
            disabled: true,
            href: accumulatedPath
        });
    });

    breadcrumbs.unshift({
        title: Constants.HomeScreenTitle,
        disabled: false,
        href: '/'
    });

    return breadcrumbs;
});

const shouldDisplay = computed(() => route.path != '/' && route.path != '/401' && route.path != '/404');

let observer: MutationObserver | null = null;

onMounted(() => {
    const titleElement = document.querySelector('title');

    if (titleElement) {
        observer = new MutationObserver(() => {
            pageTitle.value = document.title
        });

        observer.observe(titleElement, { childList: true })
    }
});

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect();
    }
})

</script>
<template>
    <v-container class="breadcrumbs-container" v-if="shouldDisplay">
        <v-breadcrumbs>
            <template #prepend>
                <v-icon icon="$logoSmall" class="mb-2" />
            </template>
            <template v-for="(item, index) in items" :key="item.href">
                <v-breadcrumbs-item class="text-subtitle-1" :to="!item.disabled ? item.href : undefined"
                    :disabled="item.disabled" exact>{{ item.title }}</v-breadcrumbs-item>

                <template v-if="index < items.length - 1">
                    <v-icon icon="mdi-chevron-right" />
                </template>
            </template>
        </v-breadcrumbs>
    </v-container>
</template>
<style scoped>
.breadcrumbs-container {
    width: 75vw;
}
</style>