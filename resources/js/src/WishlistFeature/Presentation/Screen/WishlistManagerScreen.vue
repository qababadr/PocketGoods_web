<script setup lang="ts">
import { onMounted } from 'vue';
import { useWishlistManagerStore } from './WishlistManagerStore';
import { SnackbarSeverity, useSnackbarControllerStore } from '@src/CoreUI/Components';
import Message from '@src/CoreUI/Components/Message.vue';
import WishlistItemVue from '../Components/WishlistItemVue.vue';
import ConfirmDialog from '@src/CoreUI/Components/ConfirmDialog.vue';
import { useRouter } from 'vue-router';
import { Constants } from '@src/CoreUI/Util/constants';
import { useAuthStore } from '@src/AuthenticationFeature/Auth/AuthStore';

const store = useWishlistManagerStore()
const snackbarController = useSnackbarControllerStore()
const router = useRouter()
const auth = useAuthStore()

onMounted(() => {
    store.getWishlistItems({
        onError() {
            snackbarController
                .setSeverity(SnackbarSeverity.Error)
                .setContentProps({
                    text: 'An error occurred while preparing your wishlist'
                })
                .setContent(Message)
                .show()
        },
    })
})

function navigateToProductDetail(productId?: number) {

    if (productId == undefined)
        return;
    try {
        router.push({
            name: Constants.SCREENS.ProductDetailScreen,
            params: { id: productId }
        })
    } catch {
        return;
    }
}

function onDeleteWishlist() {
    store.deleteWishlistItem({
        onSuccess(productTitle, productId) {
            auth.deleteFromWishlist(productId)
            snackbarController
                .setSeverity(SnackbarSeverity.Success)
                .setContentProps({
                    text: `The product ${productTitle} has been removed from wishlist`
                })
                .setContent(Message)
                .show()
        },
        onError(productTitle) {
            snackbarController
                .setSeverity(SnackbarSeverity.Error)
                .setContentProps({
                    text: `An error occurred while deleting ${productTitle} from wishlist`
                })
                .setContent(Message)
                .show()
        },
        onRefreshError() {
            snackbarController
                .setSeverity(SnackbarSeverity.Error)
                .setContentProps({
                    text: "An error occurred while preparing your wishlist"
                })
                .setContent(Message)
                .show()
        },
    })
}

</script>
<template>
    <v-container class="d-flex justify-center align-center pb-10">
        <v-sheet class="product-sheet" rounded elevation="8" color="surface">
            <div v-if="store.isPageLoading">
                <v-row>
                    <v-col cols="4">
                        <v-skeleton-loader class="border w-50" type="image" color="background"></v-skeleton-loader>
                    </v-col>
                    <v-col cols="6">
                        <v-skeleton-loader color="background" width="w-100"
                            type="article, sentences@"></v-skeleton-loader></v-col>
                    <v-col cols="2">
                        <v-skeleton-loader color="background" width="w-100" type="chip"></v-skeleton-loader></v-col>
                </v-row>
            </div>
            <div v-else>
                <div v-if="store.wishlist.length > 0">
                    <TransitionGroup name="fade" tag="ul" class="transition-container">
                        <WishlistItemVue class="px-10 py-10" v-for="item in store.wishlist"
                            :product="item.productDetail" :key="item.productDetail?.id"
                            @on-delete-click="store.showDeleteModal(item)"
                            @on-product-click="navigateToProductDetail(item.productDetail?.id)" />
                    </TransitionGroup>
                </div>
                <div v-else>
                    <v-alert type="warning" title="Empty wishlist"
                        text="There is no product in your wishlist"></v-alert>
                </div>
                <ConfirmDialog v-if="store.selectedWishlistItem?.productDetail" :open="store.isModalVisible"
                    :is-processing="store.isDeleting" @on-close="store.closeDeleteModal()"
                    :text="`Are you sure you want to delete ${store.selectedWishlistItem.productDetail?.title} from your wishlist?`"
                    action-button-label="Delete" @on-processing="onDeleteWishlist" />
            </div>
        </v-sheet>
    </v-container>
</template>
<style scoped>
.product-sheet {
    width: 75vw;
}
</style>