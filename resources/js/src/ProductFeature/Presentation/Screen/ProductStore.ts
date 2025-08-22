import {
    ApiError,
    container,
    PaginationResponse,
    Product,
    ProductPreview,
    ServiceIdentifier,
} from "@src/Core";
import { ProductUseCases } from "@src/ProductFeature/Domain/UseCase/ProductUseCases";
import { defineStore } from "pinia";

type ProductStoreState = {
    readonly product: Product | null;
    readonly isPageLoading: boolean;
    readonly carouselIndex: number;
    readonly paginationResponse: PaginationResponse<ProductPreview> | undefined;
    readonly currentPage: number;
    readonly searchQuery: string;
};

export const useProductStore = defineStore("ProductStore", {
    state: (): ProductStoreState => {
        return {
            product: null,
            isPageLoading: false,
            carouselIndex: 0,
            paginationResponse: undefined,
            currentPage: 1,
            searchQuery: "",
        };
    },
    getters: {
        products(): ProductPreview[] {
            return this.paginationResponse === undefined
                ? []
                : this.paginationResponse.data;
        },
        paginationCount(): number {
            return this.paginationResponse?.lastPage ?? 1;
        },
    },
    actions: {
        async searchProducts(params: {
            searchQuery: string;
            onPaginationError: () => void;
        }) {
            this.$patch({ isPageLoading: true });
            const { searchQuery, onPaginationError } = params;
            try {
                const useCases = container.get<ProductUseCases>(
                    ServiceIdentifier.ProductUseCases
                );

                const paginationData = await useCases.searchProducts(
                    searchQuery,
                    this.currentPage
                );

                this.$patch({ paginationResponse: paginationData });
            } catch (error) {
                if (error instanceof ApiError) {
                    onPaginationError();
                }
            } finally {
                this.$patch({ isPageLoading: false });
            }
        },
        async loadProduct(params: { id: number; onError: () => void }) {
            this.$patch({ isPageLoading: true });
            const { id, onError } = params;

            try {
                const useCases = container.get<ProductUseCases>(
                    ServiceIdentifier.ProductUseCases
                );

                const product = await useCases.getProduct(id);

                document.title = product.title;

                this.$patch({ product: product, isPageLoading: false });
            } catch (error) {
                if (error instanceof ApiError) {
                    onError();
                }
            }
        },
    },
});
