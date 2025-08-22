import { Product, ServiceIdentifier } from "@src/Core";
import { inject, injectable } from "inversify";
import type { ProductRepository } from "../Repository/ProductRepository";

@injectable()
export class GetProductUseCase {
    constructor(
        @inject(ServiceIdentifier.ProductRepository)
        private repository: ProductRepository
    ) {}

    async invoke(id: number): Promise<Product> {
        return await this.repository.getProduct(id);
    }
}
