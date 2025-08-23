<script setup lang="ts">
import WishlistItemVue from '@src/WishlistFeature/Presentation/Components/WishlistItemVue.vue';
import { productSunglasses } from './helper'
function onDeleteClick() {
    alert('showing delete modal')
}

function onProductClick() {
    alert('navigating to product detail')
}

</script>
<template>
    <WishlistItemVue class="px-10 py-10" :product="productSunglasses" @on-delete-click="onDeleteClick"
        @on-product-click="onProductClick" />
</template>
