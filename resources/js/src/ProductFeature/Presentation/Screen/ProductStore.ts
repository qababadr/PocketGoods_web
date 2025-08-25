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
    readonly isSearching: boolean;
    readonly suggestedProducts: ProductPreview[];
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
            isSearching: false,
            suggestedProducts: [],
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
        setCurrentPage(page: number) {
            this.$patch({ currentPage: page });
        },
        async getProducts(params: { onPaginationError: () => void }) {
            this.$patch({ isPageLoading: true });
            const { onPaginationError } = params;
            try {
                const useCases = container.get<ProductUseCases>(
                    ServiceIdentifier.ProductUseCases
                );

                const paginationData = await useCases.getProducts(
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
                console.log(error);
                if (error instanceof ApiError) {
                    onError();
                }
            }
        },
        async searchSuggestions() {
            if (this.searchQuery !== "") {
                try {
                    this.$patch({ isSearching: true });
                    const useCases = container.get<ProductUseCases>(
                        ServiceIdentifier.ProductUseCases
                    );
                    const suggestions = await useCases.getSuggestedProducts(
                        this.searchQuery
                    );
                    this.$patch({ suggestedProducts: suggestions });
                } finally {
                    this.$patch({ isSearching: false });
                }
            }
        },
    },
});
