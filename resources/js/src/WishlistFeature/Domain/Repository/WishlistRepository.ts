import { WishlistItem } from "@src/Core";

export interface WishlistRepository {
    toggleWishlist(productId: number): Promise<number>;

    getEntireWishlist(): Promise<WishlistItem[]>;
}
