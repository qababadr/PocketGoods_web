import { inject, injectable } from 'inversify'
import type { AuthenticationRepository } from '../Repository/AuthenticationRepository'
import { ServiceIdentifier } from '@src/Core'

@injectable()
export class LogoutUseCase {
    constructor(
        @inject(ServiceIdentifier.AuthenticationRepository)
        private repository: AuthenticationRepository
    ) {}

    async invoke(): Promise<boolean> {
        return await this.repository.logout()
    }
}
