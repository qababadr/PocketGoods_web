import { WishlistItem } from './WishlistItem'

export class User {
    readonly id: number
    readonly name: string
    readonly email: string
    readonly emailVerifiedAt: string | null
    readonly wishlist: Array<WishlistItem>

    constructor(
        id: number,
        name: string,
        email: string,
        emailVerifiedAt: string | null,
        wishlist: Array<WishlistItem>
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.emailVerifiedAt = emailVerifiedAt
        this.wishlist = wishlist
    }
}
