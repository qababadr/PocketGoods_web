import { AuthenticationRepository } from "@src/AuthenticationFeature/Domain/Repository/AuthenticationRepository";
import {
    GetAuthenticatedUserUseCase,
    LoginUseCase,
    LogoutUseCase,
    RegisterUseCase,
    AuthenticationUseCases,
} from "@src/AuthenticationFeature/Domain/UseCase";
import { ServiceIdentifier } from "@src/Core";
import { Container } from "inversify";
import { AuthenticationRepositoryImpl } from "../Repository/AuthenticationRepositoryImpl";

export function registerAuthenticationFeatureModule(container: Container) {
    container
        .bind<AuthenticationRepository>(
            ServiceIdentifier.AuthenticationRepository
        )
        .to(AuthenticationRepositoryImpl)
        .inSingletonScope();

    container
        .bind<GetAuthenticatedUserUseCase>(
            ServiceIdentifier.GetAuthenticatedUserUseCase
        )
        .to(GetAuthenticatedUserUseCase)
        .inSingletonScope();

    container
        .bind<LoginUseCase>(ServiceIdentifier.LoginUseCase)
        .to(LoginUseCase)
        .inSingletonScope();

    container
        .bind<LogoutUseCase>(ServiceIdentifier.LogoutUseCase)
        .to(LogoutUseCase)
        .inSingletonScope();

    container
        .bind<RegisterUseCase>(ServiceIdentifier.RegisterUseCase)
        .to(RegisterUseCase)
        .inSingletonScope();

    container
        .bind<AuthenticationUseCases>(ServiceIdentifier.AuthenticationUseCases)
        .to(AuthenticationUseCases)
        .inSingletonScope();
}
