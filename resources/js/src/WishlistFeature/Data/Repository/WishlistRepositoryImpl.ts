import {
    ApiService,
    toWishlistItem,
    WishlistItem,
    WishlistItemDTO,
} from "@src/Core";
import { WishlistRepository } from "@src/WishlistFeature/Domain/Repository/WishlistRepository";
import { injectable } from "inversify";
import { WishlistResponseDTO } from "../DTO/WishlistResponseDTO";

@injectable()
export class WishlistRepositoryImpl implements WishlistRepository {
    async toggleWishlist(productId: number): Promise<number> {
        const response = await ApiService.get<WishlistResponseDTO>({
            url: `wishlist/toggle/${productId}`,
        });
        return response.wishlist_item_id;
    }

    async getEntireWishlist(): Promise<WishlistItem[]> {
        const response = await ApiService.get<WishlistItemDTO[]>({
            url: "wishlist/list",
        });
        return response.map((dto) => toWishlistItem(dto));
    }
}
