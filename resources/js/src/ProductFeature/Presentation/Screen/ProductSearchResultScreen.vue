<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from './ProductStore';
import { Constants } from '@src/CoreUI/Util/constants';
import ProductCard from '../Components/ProductCard.vue';
import { useWishlistManagerStore } from '@src/WishlistFeature/Presentation/Screen/WishlistManagerStore';
import { useAuthStore } from '@src/AuthenticationFeature/Auth/AuthStore';
import { SnackbarSeverity, useSnackbarControllerStore } from '@src/CoreUI/Components';
import Message from '@src/CoreUI/Components/Message.vue';
import { computed, watch } from 'vue';

const router = useRouter()
const wishlistStore = useWishlistManagerStore()
const auth = useAuthStore()
const snackbarController = useSnackbarControllerStore()
const route = useRoute()

const productStore = useProductStore()

const searchQuery = computed(() => {
    return (route.query.searchQuery as string) ?? null
})

watch(
    [searchQuery, () => productStore.currentPage],
    (
        [_newSearchQuery, _currentPage],
        [_prevQuery, _prePage]
    ) => {
        if (searchQuery.value) {
            productStore.searchProducts({
                searchQuery: searchQuery.value,
                onPaginationError() {
                    snackbarController.setSeverity(SnackbarSeverity.Error)
                        .setContentProps({
                            text: 'An error occurred while getting latest deals'
                        })
                        .setContent(Message)
                        .show()
                },
            });
        }
    },
    {
        deep: true,
        immediate: true,
    }
);

function onToggleWishlist(productId: number) {
    wishlistStore.toggleWishlist({
        productId: productId,
        onAdded(insertedWishlistId) {
            auth.addWishlistItem(productId, insertedWishlistId)
            snackbarController
                .setSeverity(SnackbarSeverity.Success)
                .setContentProps({ text: 'The product has been added successfully to your wishlist' })
                .setContent(Message)
                .show()
        },
        onRemoved() {
            auth.deleteFromWishlist(productId)
            snackbarController
                .setSeverity(SnackbarSeverity.Success)
                .setContentProps({ text: 'The product has been removed successfully from your wishlist' })
                .setContent(Message)
                .show()
        },
    })
}

</script>
<template>
    <v-container>
        <v-row class="py-12 px-16" v-if="productStore.isPageLoading">
            <v-col class="d-flex justify-center my-10" v-for="index in 9" :key="index" cols="12" sm="12" md="6" lg="4"
                xl="4">
                <v-skeleton-loader class="mx-auto border" width="300" height="475"
                    type="image, article"></v-skeleton-loader></v-col>
        </v-row>
        <v-row v-else class="px-16 d-flex justify-center">
            <v-row v-if="productStore.products.length > 0">
                <v-col class="d-flex justify-center my-10" v-for="product in productStore.products" :key="product.id"
                    cols="12" sm="12" md="6" lg="4" xl="4">
                    <product-card :product="product" :is-authenticated="false" :in-wishlist="false"
                        @on-toggle-wishlist="onToggleWishlist(product.id)" @on-view-product="
                            router.push({
                                name: Constants.SCREENS.ProductDetailScreen,
                                params: { id: product.id },
                            })
                            " />
                </v-col>
            </v-row>
            <v-row v-else no-gutters>
                <v-col cols="12">
                    <v-alert type="warning" title="Ops" text="Sorry we could'nt find what your looking for"></v-alert>
                </v-col>
            </v-row>
        </v-row>
        <v-row v-if="productStore.products.length > 0" class="pt-5 pb-6 d-flex justify-center">
            <v-pagination v-model="productStore.currentPage" :length="productStore.paginationCount" :total-visible="7"
                rounded="circle" @update:model-value="(page: number) => productStore.$patch({ currentPage: page })" />
        </v-row>
    </v-container>
</template>
