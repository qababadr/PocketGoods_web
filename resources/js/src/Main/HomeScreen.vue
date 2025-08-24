<script setup lang="ts">
import AnimatedDiscountOffers from '@src/CoreUI/Assets/discount_offers.json'
import LottiePlayer from '@src/CoreUI/Components/LottiePlayer.vue';
import { useSnackbarControllerStore } from '@src/CoreUI/Components/Snackbar/SnackbarController';
import { useRouter } from "vue-router";
import { onMounted } from 'vue';
import Message from '@src/CoreUI/Components/Message.vue';
import { useAuthStore } from '@src/AuthenticationFeature/Auth/AuthStore';
import { useProductStore } from '@src/ProductFeature/Presentation/Screen/ProductStore';
import { useWishlistManagerStore } from '@src/WishlistFeature/Presentation/Screen/WishlistManagerStore';
import { SnackbarSeverity } from '@src/CoreUI/Components';
import { Constants } from '@src/CoreUI/Util/constants';
import ProductCard from '@src/ProductFeature/Presentation/Components/ProductCard.vue';

const productStore = useProductStore();
const wishlistStore = useWishlistManagerStore()
const auth = useAuthStore();
const snackbarController = useSnackbarControllerStore();
const router = useRouter();

onMounted(async () => {
    productStore.getProducts({
        onPaginationError() {
            snackbarController.setSeverity(SnackbarSeverity.Error)
                .setContentProps({
                    text: 'An error occurred while getting latest deals'
                })
                .setContent(Message)
                .show()
        },
    })
});

function onPageChanged(page: number) {
    productStore.setCurrentPage(page)
    productStore.getProducts({
        onPaginationError() {
            snackbarController.setSeverity(SnackbarSeverity.Error)
                .setContentProps({
                    text: 'An error occurred while getting latest deals'
                })
                .setContent(Message)
                .show()
        },
    })
}

function onToggleWishlist(productId: number) {
    wishlistStore.toggleWishlist({
        productId: productId,
        onAdded: function (insertedId: number): void {
            auth.addWishlistItem(productId, insertedId)
            snackbarController.setSeverity(SnackbarSeverity.Success)
                .setContentProps({
                    text: 'The product is added to your wishlist'
                })
                .setContent(Message)
                .show()
        },
        onRemoved: function (): void {
            auth.deleteFromWishlist(productId)
            snackbarController.setSeverity(SnackbarSeverity.Success)
                .setContentProps({
                    text: 'The product has been removed from your wishlist'
                })
                .setContent(Message)
                .show()
        }
    });
}

function navigateToProductDetail(productId: number) {
    try {
        router.push({
            name: Constants.SCREENS.ProductDetailScreen,
            params: { id: productId },
        })
    } catch {
        return;
    }
}

</script>
<template>
    <div>
        <section>
            <LottiePlayer :animationData="AnimatedDiscountOffers" class="discountOffer" />
            <p class="text-h4 font-weight-bold">Save on today's offers</p>
        </section>
        <v-container>
            <v-row class="py-12 px-16" v-if="productStore.isPageLoading">
                <v-col class="d-flex justify-center my-10" v-for="index in 9" :key="index" cols="12" sm="12" md="6"
                    lg="4" xl="4">
                    <v-skeleton-loader class="mx-auto border" width="300" height="475"
                        type="image, article"></v-skeleton-loader></v-col>
            </v-row>
            <v-row v-else class="px-16 d-flex justify-center">
                <v-row v-if="productStore.products.length > 0">
                    <v-col class="d-flex justify-center my-10" v-for="product in productStore.products"
                        :key="product.id" cols="12" sm="12" md="6" lg="4" xl="4">
                        <product-card :product="product" :is-authenticated="auth.isAuthenticated"
                            :in-wishlist="auth.inWishlist(product.id)"
                            @on-toggle-wishlist="onToggleWishlist(product.id)" @on-view-product="
                                navigateToProductDetail(product.id)
                                " />
                    </v-col>
                </v-row>
                <v-row v-else no-gutters>
                    <v-col cols="12">
                        <v-alert type="warning" title="Ops"
                            text="Sorry we could'nt find what your looking for"></v-alert>
                    </v-col>
                </v-row>
            </v-row>
            <v-row v-if="productStore.products.length > 0" class="pt-5 pb-6 d-flex justify-center">
                <v-pagination v-model="productStore.currentPage" :length="productStore.paginationCount"
                    :total-visible="7" rounded="circle" @update:model-value="onPageChanged" />
            </v-row>
        </v-container>
    </div>
</template>
<style scoped>
section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem;
}

.discountOffer {
    width: 200px;
    height: auto;
}
</style>
