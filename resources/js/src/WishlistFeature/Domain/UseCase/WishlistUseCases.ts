import { inject, injectable } from 'inversify'
import { GetEntireWishlistUseCase } from './GetEntireWishlistUseCase'
import { ToggleWishlistUseCase } from './ToggleWishlistUseCase'
import { makeInvocable, ServiceIdentifier } from '@src/Core'

@injectable()
export class WishlistUseCases {
    readonly toggleWishlist: ReturnType<typeof makeInvocable<ToggleWishlistUseCase>>
    readonly getEntireWishlist: ReturnType<typeof makeInvocable<GetEntireWishlistUseCase>>

    constructor(
        @inject(ServiceIdentifier.ToggleWishlistUseCase) toggleWishlist: ToggleWishlistUseCase,
        @inject(ServiceIdentifier.GetEntireWishlistUseCase)
        getEntireWishlist: GetEntireWishlistUseCase
    ) {
        this.toggleWishlist = makeInvocable(toggleWishlist)
        this.getEntireWishlist = makeInvocable(getEntireWishlist)
    }
}
