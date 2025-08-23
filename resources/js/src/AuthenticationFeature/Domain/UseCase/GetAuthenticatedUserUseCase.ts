import { ServiceIdentifier, User } from '@src/Core'
import type { AuthenticationRepository } from '../Repository/AuthenticationRepository'
import { inject, injectable } from 'inversify'

@injectable()
export class GetAuthenticatedUserUseCase {
    constructor(
        @inject(ServiceIdentifier.AuthenticationRepository)
        private repository: AuthenticationRepository
    ) {}

    async invoke(): Promise<User> {
        return await this.repository.getAuthenticatedUser()
    }
}
