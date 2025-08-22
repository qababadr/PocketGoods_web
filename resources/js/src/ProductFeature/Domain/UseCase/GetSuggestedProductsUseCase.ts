import { ProductPreview, ServiceIdentifier } from "@src/Core";
import { inject, injectable } from "inversify";
import type { ProductRepository } from "../Repository/ProductRepository";

@injectable()
export class GetSuggestedProductsUseCase {
    constructor(
        @inject(ServiceIdentifier.ProductRepository)
        private repository: ProductRepository
    ) {}

    async invoke(query: string): Promise<ProductPreview[]> {
        return await this.repository.getSuggestedProducts(query);
    }
}
