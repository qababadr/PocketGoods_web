import { ProductRepository } from "@src/ProductFeature/Domain/Repository/ProductRepository";
import { Container } from "inversify";
import { ProductRepositoryImpl } from "../Repository/ProductRepositoryImpl";
import { GetProductsUseCase } from "@src/ProductFeature/Domain/UseCase/GetProductsUseCase";
import { GetProductUseCase } from "@src/ProductFeature/Domain/UseCase/GetProductUseCase";
import { GetSuggestedProductsUseCase } from "@src/ProductFeature/Domain/UseCase/GetSuggestedProductsUseCase";
import { ProductUseCases } from "@src/ProductFeature/Domain/UseCase/ProductUseCases";
import { SearchProductsUseCase } from "@src/ProductFeature/Domain/UseCase/SearchProductsUseCase";
import { ServiceIdentifier } from "@src/Core/Data/DI/serviceIdentifier";

export function registerProductFeatureModule(container: Container) {
    container
        .bind<ProductRepository>(ServiceIdentifier.ProductRepository)
        .to(ProductRepositoryImpl)
        .inSingletonScope();

    container
        .bind<GetProductsUseCase>(ServiceIdentifier.GetProductsUseCase)
        .to(GetProductsUseCase)
        .inTransientScope();

    container
        .bind<GetProductUseCase>(ServiceIdentifier.GetProductUseCase)
        .to(GetProductUseCase)
        .inTransientScope();

    container
        .bind<GetSuggestedProductsUseCase>(
            ServiceIdentifier.GetSuggestedProductsUseCase
        )
        .to(GetSuggestedProductsUseCase)
        .inTransientScope();

    container
        .bind<SearchProductsUseCase>(ServiceIdentifier.SearchProductsUseCase)
        .to(SearchProductsUseCase)
        .inTransientScope();

    container
        .bind<ProductUseCases>(ServiceIdentifier.ProductUseCases)
        .to(ProductUseCases)
        .inTransientScope();
}
