import {
    PaginationResponse,
    ProductPreview,
    ServiceIdentifier,
} from "@src/Core";
import { inject, injectable } from "inversify";
import type { ProductRepository } from "../Repository/ProductRepository";

@injectable()
export class SearchProductsUseCase {
    constructor(
        @inject(ServiceIdentifier.ProductRepository)
        private repository: ProductRepository
    ) {}

    async invoke(
        query: string,
        page: number
    ): Promise<PaginationResponse<ProductPreview>> {
        return await this.repository.searchProducts(query, page);
    }
}
