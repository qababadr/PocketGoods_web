<script setup lang="ts">
import ProductCard from '@src/ProductFeature/Presentation/Components/ProductCard.vue';
import { productPreviews } from './helper';
import { useGlobalStore } from './GlobalStore';

const store = useGlobalStore();

function viewProduct() {
    alert('navigating to product detail screen')
}

</script>
<template>
    <ProductCard :product="productPreviews[0]" :is-authenticated="true" :in-wishlist="store.inWishlist"
        @on-toggle-wishlist="store.toggleWishlist" @on-view-product="viewProduct" />
</template>
