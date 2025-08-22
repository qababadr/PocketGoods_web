import {
    PaginationResponse,
    ProductPreview,
    ServiceIdentifier,
} from "@src/Core";
import { inject, injectable } from "inversify";
import type { ProductRepository } from "../Repository/ProductRepository";

@injectable()
export class GetProductsUseCase {
    constructor(
        @inject(ServiceIdentifier.ProductRepository)
        private readonly repository: ProductRepository
    ) {}

    async invoke(page: number): Promise<PaginationResponse<ProductPreview>> {
        return await this.repository.getProducts(page);
    }
}
