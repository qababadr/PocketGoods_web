<script setup lang="ts">
import { useAuthStore } from '@src/AuthenticationFeature/Auth/AuthStore';
import Toolbar from '@src/AuthenticationFeature/Presentation/Components/Toolbar/Toolbar.vue';
import BreadCrumbs from '@src/CoreUI/Components/Breadcrumbs/BreadCrumbs.vue';
import Header from '@src/CoreUI/Components/Header.vue';
import { Constants } from '@src/CoreUI/Util/constants';
import SearchInput from '@src/ProductFeature/Presentation/Components/SearchInput.vue';
import { useProductStore } from '@src/ProductFeature/Presentation/Screen/ProductStore';
import { useRouter } from 'vue-router';
import AppFooter from './AppFooter.vue';
import Snackbar from '@src/CoreUI/Components/Snackbar/Snackbar.vue';
import Loader from '@src/CoreUI/Components/Loader/Loader.vue';
import { useDebounceFn } from '@vueuse/core';
import { onMounted, watch } from 'vue';
import { ApiService } from '@src/Core';


const auth = useAuthStore()
const productStore = useProductStore()
const router = useRouter()

const debounceOnChange = useDebounceFn(() => {
    productStore.searchSuggestions();
}, 700);

watch(
    () => productStore.searchQuery,
    (_oldValue: string, newValue: string) => {
        if (!newValue) return
        debounceOnChange()
    }
)

function onSearchButtonClick() {
    try {
        router.push({
            name: Constants.SCREENS.ProductSearchResultScreen,
            query: {
                searchQuery: productStore.searchQuery
            }
        })
    } catch {
        return
    }
}

function onSuggestionClick(productId: number, productTitle: string) {
    try {
        productStore.$patch({ searchQuery: productTitle })
        router.push({
            name: Constants.SCREENS.ProductDetailScreen,
            params: {
                id: productId
            }
        })
    } catch {
        return
    }
}

onMounted(async () => {
    await ApiService.initCSRFCookie()
})

</script>
<template>
    <v-theme-provider :theme="auth.theme" with-background>
        <Header>
            <template #toolbar>
                <Toolbar />
            </template>
            <template #search-input>
                <SearchInput :isLoading="productStore.isSearching" :search-query="productStore.searchQuery"
                    :suggestions="productStore.suggestedProducts"
                    @on-search-query-changed="(value: string) => productStore.$patch({ searchQuery: value })"
                    @on-search-button-click="onSearchButtonClick" @on-suggestion-click="onSuggestionClick" />
            </template>
        </Header>
        <v-main class="min-height">
            <BreadCrumbs class="mt-2" />
            <router-view v-slot="{ Component, route }">
                <transition name="animate" mode="out-in" :enter-active-class="'animate__animated ' +
                    route.meta.enterTransition"
                    :leave-active-class="'animate__animated ' + route.meta.leaveTransition">
                    <component :is="Component" :key="route.path" />
                </transition>
            </router-view>
        </v-main>
        <AppFooter />
        <Snackbar />
        <Loader />
    </v-theme-provider>
</template>
<style scoped>
.min-height {
    min-height: calc(100vh - 128px);
}
</style>
