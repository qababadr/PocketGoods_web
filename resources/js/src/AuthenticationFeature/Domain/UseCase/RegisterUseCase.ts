import { inject, injectable } from 'inversify'
import type { AuthenticationRepository } from '../Repository/AuthenticationRepository'
import { ServiceIdentifier } from '@src/Core'

@injectable()
export class RegisterUseCase {
    constructor(
        @inject(ServiceIdentifier.AuthenticationRepository)
        private repository: AuthenticationRepository
    ) {}

    async invoke(
        fullname: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ): Promise<string> {
        return await this.repository.register(fullname, email, password, passwordConfirmation)
    }
}
