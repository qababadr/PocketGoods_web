import { inject, injectable } from 'inversify'
import type { AuthenticationRepository } from '../Repository/AuthenticationRepository'
import { ServiceIdentifier, User } from '@src/Core'

@injectable()
export class LoginUseCase {
    constructor(
        @inject(ServiceIdentifier.AuthenticationRepository)
        private repository: AuthenticationRepository
    ) {}

    async invoke(email: string, password: string): Promise<User> {
        return await this.repository.login(email, password)
    }
}
