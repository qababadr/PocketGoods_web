import { inject, injectable } from 'inversify'
import { makeInvocable, ServiceIdentifier } from '@src/Core'
import { GetAuthenticatedUserUseCase } from './GetAuthenticatedUserUseCase'
import { LoginUseCase } from './LoginUseCase'
import { LogoutUseCase } from './LogoutUseCase'
import { RegisterUseCase } from './RegisterUseCase'

@injectable()
export class AuthenticationUseCases {
    readonly getAuthenticatedUser: ReturnType<typeof makeInvocable<GetAuthenticatedUserUseCase>>
    readonly login: ReturnType<typeof makeInvocable<LoginUseCase>>
    readonly logout: ReturnType<typeof makeInvocable<LogoutUseCase>>
    readonly register: ReturnType<typeof makeInvocable<RegisterUseCase>>

    constructor(
        @inject(ServiceIdentifier.GetAuthenticatedUserUseCase)
        getAuthenticatedUser: GetAuthenticatedUserUseCase,
        @inject(ServiceIdentifier.LoginUseCase) login: LoginUseCase,
        @inject(ServiceIdentifier.LogoutUseCase) logout: LogoutUseCase,
        @inject(ServiceIdentifier.RegisterUseCase) register: RegisterUseCase
    ) {
        this.getAuthenticatedUser = makeInvocable(getAuthenticatedUser)
        this.login = makeInvocable(login)
        this.logout = makeInvocable(logout)
        this.register = makeInvocable(register)
    }
}
