<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ProductSkeletonLoader from '../Components/ProductSkeletonLoader.vue';
import { useProductStore } from './ProductStore';
import { useRoute } from 'vue-router';
import { SnackbarSeverity, useSnackbarControllerStore } from '@src/CoreUI/Components';
import Message from '@src/CoreUI/Components/Message.vue';
import { useAuthStore } from '@src/AuthenticationFeature/Auth/AuthStore';
import { useWishlistManagerStore } from '@src/WishlistFeature/Presentation/Screen/WishlistManagerStore';

const route = useRoute()
const productStore = useProductStore();
const snackbarController = useSnackbarControllerStore()
const auth = useAuthStore()
const wishlistStore = useWishlistManagerStore()

onMounted(() => {
    productStore.loadProduct({
        id: Number.parseInt(route.params.id as string),
        onError() {
            snackbarController
                .setSeverity(SnackbarSeverity.Error)
                .setContentProps({ text: 'An error occurred when loading data' })
                .setContent(Message)
                .show()
        },
    })
});

const wishlistButtonIcon = computed(() => {
    if (productStore.product) {
        return auth.inWishlist(productStore.product.id)
            ? 'mdi-heart-minus' : 'mdi-heart-plus'
    }
    return 'mdi-heart-plus'
});

const wishlistButtonLabel = computed(() => {
    if (productStore.product) {
        return auth.inWishlist(productStore.product.id)
            ? 'remove from wishlist' : 'add to wishlist'
    }
    return 'add to wishlist'
});

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
    <v-container class="d-flex justify-center pb-10">
        <v-sheet class="product-sheet" rounded elevation="8" color="surface">
            <div v-if="productStore.isPageLoading">
                <ProductSkeletonLoader />
            </div>
            <div v-else>
                <div v-if="productStore.product">
                    <v-row class="d-flex justify-space-between">
                        <v-col cols="12" sm="12" md="6" lg="8" xl="8" style="height: 75vh">
                            <v-carousel hide-delimiter-background cycle show-arrows height="100%"
                                v-model="productStore.carouselIndex">
                                <template v-slot:prev="{ props }">
                                    <v-btn variant="elevated" color="bg-secondary" @click="props.onClick" icon><v-icon
                                            color="primary" size="large">mdi-menu-left</v-icon></v-btn>
                                </template>
                                <template v-slot:next="{ props }">
                                    <v-btn variant="elevated" color="bg-secondary" @click="props.onClick" icon><v-icon
                                            color="primary" size="large">mdi-menu-right</v-icon></v-btn>
                                </template>
                                <v-carousel-item v-for="image in productStore.product.media" :src="image.original"
                                    :lazy-src="image.preview" :key="image.uuid" cover></v-carousel-item>
                            </v-carousel>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="4" xl="4" class="pa-6">
                            <v-row>
                                <v-col cols="12" class="text-center">
                                    <span class="text-primary font-weight-bold text-subtitle-1">{{
                                        productStore.product.title
                                        }}</span>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <span class="text-primary font-weight-bold text-subtitle-2">Price</span>
                                    <span class="ms-1 text-subtitle-2">{{ productStore.product.price }}$</span>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="d-flex flex-column">
                                    <span class="text-primary font-weight-bold text-subtitle-2">Description</span>
                                    <span class="text-subtitle-2">{{
                                        productStore.product.description
                                    }}</span>
                                    <span class="text-caption" v-if="productStore.product.inStock"><strong
                                            class="text-success">{{
                                                productStore.product.quantity
                                            }}</strong>
                                        left in stock</span>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="d-flex flex-column align-start">
                                    <span class="text-primary font-weight-bold text-subtitle-2">Category</span>
                                    <span class="text-subtitle-2">{{ productStore.product.category }}</span>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="8">
                                    <v-btn :prepend-icon="wishlistButtonIcon" block @click="onToggleWishlist">{{
                                        wishlistButtonLabel }}</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </v-sheet>
    </v-container>
</template>
<style scoped>
.product-sheet {
    width: 75vw;
}

/* Large screens (e.g. desktops) */
@media (min-width: 1200px) {
    .product-sheet {
        width: 75vw;
    }
}

/* Medium screens (e.g. tablets) */
@media (max-width: 1199px) and (min-width: 768px) {
    .product-sheet {
        width: 85vw;
    }
}

/* Small screens (e.g. landscape phones) */
@media (max-width: 767px) and (min-width: 480px) {
    .product-sheet {
        width: 100vh;
    }
}

/* Extra small screens (e.g. portrait phones) */
@media (max-width: 479px) {
    .product-sheet {
        width: 100vh;
    }
}
</style>