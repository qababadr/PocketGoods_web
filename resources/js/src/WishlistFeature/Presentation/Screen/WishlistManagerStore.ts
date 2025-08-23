import {
    ApiError,
    container,
    ServiceIdentifier,
    WishlistItem,
} from "@src/Core";
import { WishlistUseCases } from "@src/WishlistFeature/Domain/UseCase/WishlistUseCases";
import { defineStore } from "pinia";

type WishlistManagerStoreState = {
    readonly isPageLoading: boolean;
    readonly isDeleting: boolean;
    readonly wishlist: WishlistItem[];
    readonly selectedWishlistItem: WishlistItem | null;
};

export const useWishlistManagerStore = defineStore("WishlistManagerStore", {
    state: (): WishlistManagerStoreState => {
        return {
            isPageLoading: false,
            isDeleting: false,
            wishlist: [],
            selectedWishlistItem: null,
        };
    },
    getters: {
        isModalVisible(): boolean {
            return this.selectedWishlistItem !== null;
        },
    },
    actions: {
        async getWishlistItems(params: { onError: () => void }) {
            this.$patch({ isPageLoading: true });
            const useCases = container.get<WishlistUseCases>(
                ServiceIdentifier.WishlistUseCases
            );
            try {
                const wishlist = await useCases.getEntireWishlist();

                this.$patch({ wishlist: wishlist });
            } catch (error) {
                if (error instanceof ApiError) {
                    params.onError();
                }
            } finally {
                this.$patch({ isPageLoading: false });
            }
        },
        async deleteWishlistItem(params: {
            onSuccess: (productTitle: string, productId: number) => void;
            onError: (productTitle: string) => void;
            onRefreshError: () => void;
        }) {
            this.$patch({ isDeleting: true });
            const { onError, onRefreshError, onSuccess } = params;
            const useCases = container.get<WishlistUseCases>(
                ServiceIdentifier.WishlistUseCases
            );
            try {
                if (
                    this.selectedWishlistItem !== null &&
                    this.selectedWishlistItem.productDetail !== undefined
                ) {
                    await useCases.toggleWishlist(
                        this.selectedWishlistItem.productDetail.id
                    );

                    onSuccess(
                        this.selectedWishlistItem.productDetail.title,
                        this.selectedWishlistItem.productDetail.id
                    );

                    this.$patch({ selectedWishlistItem: null });

                    await this.getWishlistItems({
                        onError: onRefreshError,
                    });
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    onError(
                        this.selectedWishlistItem?.productDetail?.title ?? ""
                    );
                }
            } finally {
                this.$patch({ isDeleting: false });
            }
        },
        async toggleWishlist(params: {
            productId: number;
            onAdded: (insertedWishlistId: number) => void;
            onRemoved: () => void;
            onError?: (() => void) | undefined;
        }) {
            const { productId, onAdded, onRemoved, onError } = params;

            const useCases = container.get<WishlistUseCases>(
                ServiceIdentifier.WishlistUseCases
            );

            try {
                const insertedId = await useCases.toggleWishlist(productId);

                if (insertedId === -1) {
                    onRemoved();
                } else {
                    onAdded(insertedId);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    onError?.();
                }
            }
        },
        showDeleteModal(item: WishlistItem) {
            this.$patch({ selectedWishlistItem: item });
        },
        closeDeleteModal() {
            this.$patch({ selectedWishlistItem: null });
        },
    },
});
