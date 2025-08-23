import { ServiceIdentifier, WishlistItem } from '@src/Core'
import type { WishlistRepository } from '../Repository/WishlistRepository'
import { inject, injectable } from 'inversify'

@injectable()
export class GetEntireWishlistUseCase {
    constructor(
        @inject(ServiceIdentifier.WishlistRepository)
        private repository: WishlistRepository
    ) {}

    async invoke(): Promise<WishlistItem[]> {
        return await this.repository.getEntireWishlist()
    }
}
