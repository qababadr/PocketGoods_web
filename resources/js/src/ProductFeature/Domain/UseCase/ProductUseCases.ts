import { makeInvocable, ServiceIdentifier } from "@src/Core";
import { inject, injectable } from "inversify";
import { GetProductUseCase } from "./GetProductUseCase";
import { GetProductsUseCase } from "./GetProductsUseCase";
import { GetSuggestedProductsUseCase } from "./GetSuggestedProductsUseCase";
import { SearchProductsUseCase } from "./SearchProductsUseCase";

@injectable()
export class ProductUseCases {
    readonly getProduct: ReturnType<typeof makeInvocable<GetProductUseCase>>;
    readonly getProducts: ReturnType<typeof makeInvocable<GetProductsUseCase>>;
    readonly getSuggestedProducts: ReturnType<
        typeof makeInvocable<GetSuggestedProductsUseCase>
    >;
    readonly searchProducts: ReturnType<
        typeof makeInvocable<SearchProductsUseCase>
    >;

    constructor(
        @inject(ServiceIdentifier.GetProductsUseCase)
        getProducts: GetProductsUseCase,
        @inject(ServiceIdentifier.GetProductUseCase)
        getProduct: GetProductUseCase,
        @inject(ServiceIdentifier.GetSuggestedProductsUseCase)
        getSuggestedProducts: GetSuggestedProductsUseCase,
        @inject(ServiceIdentifier.SearchProductsUseCase)
        searchProducts: SearchProductsUseCase
    ) {
        this.getProduct = makeInvocable(getProduct);
        this.getProducts = makeInvocable(getProducts);
        this.getSuggestedProducts = makeInvocable(getSuggestedProducts);
        this.searchProducts = makeInvocable(searchProducts);
    }
}
