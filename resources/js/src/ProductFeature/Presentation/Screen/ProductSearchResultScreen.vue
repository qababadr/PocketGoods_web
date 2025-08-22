<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useProductStore } from './ProductStore';
import { Constants } from '@src/CoreUI/Util/constants';
import ProductCard from '../Components/ProductCard.vue';
const router = useRouter()
function onToggleWishlist(productId: number) {

}

const productStore = useProductStore()
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
