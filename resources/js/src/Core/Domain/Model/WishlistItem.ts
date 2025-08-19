import { Product } from '@src/Core'

export class WishlistItem {
    readonly id: number
    readonly productId: number | undefined
    readonly productDetail: Product | undefined

    constructor(
        id: number,
        productId: number | undefined = undefined,
        productDetail: Product | undefined = undefined
    ) {
        this.id = id
        this.productId = productId
        this.productDetail = productDetail
    }
}
