import { PaginationResponse, Product, ProductPreview } from "@src/Core";

export interface ProductRepository {
    getProducts(page: number): Promise<PaginationResponse<ProductPreview>>;

    getProduct(id: number): Promise<Product>;

    getSuggestedProducts(query: string): Promise<ProductPreview[]>;

    searchProducts(
        query: string,
        page: number
    ): Promise<PaginationResponse<ProductPreview>>;
}
