import { inject, injectable } from 'inversify'
import type { WishlistRepository } from '../Repository/WishlistRepository'
import { ServiceIdentifier } from '@src/Core'

@injectable()
export class ToggleWishlistUseCase {
    constructor(
        @inject(ServiceIdentifier.WishlistRepository)
        private repository: WishlistRepository
    ) {}

    async invoke(productId: number): Promise<number> {
        return await this.repository.toggleWishlist(productId)
    }
}
