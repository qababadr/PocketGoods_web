import { ServiceIdentifier } from "@src/Core";
import { WishlistRepository } from "@src/WishlistFeature/Domain/Repository/WishlistRepository";
import { GetEntireWishlistUseCase } from "@src/WishlistFeature/Domain/UseCase/GetEntireWishlistUseCase";
import { ToggleWishlistUseCase } from "@src/WishlistFeature/Domain/UseCase/ToggleWishlistUseCase";
import { WishlistUseCases } from "@src/WishlistFeature/Domain/UseCase/WishlistUseCases";
import { Container } from "inversify";
import { WishlistRepositoryImpl } from "../Repository/WishlistRepositoryImpl";

export function registerWishlistFeatureModule(container: Container) {
    container
        .bind<WishlistRepository>(ServiceIdentifier.WishlistRepository)
        .to(WishlistRepositoryImpl)
        .inSingletonScope();

    container
        .bind<ToggleWishlistUseCase>(ServiceIdentifier.ToggleWishlistUseCase)
        .to(ToggleWishlistUseCase)
        .inSingletonScope();

    container
        .bind<GetEntireWishlistUseCase>(
            ServiceIdentifier.GetEntireWishlistUseCase
        )
        .to(GetEntireWishlistUseCase)
        .inSingletonScope();

    container
        .bind<WishlistUseCases>(ServiceIdentifier.WishlistUseCases)
        .to(WishlistUseCases)
        .inSingletonScope();
}
