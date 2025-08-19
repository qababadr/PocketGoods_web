import { User } from "../../Domain/Model/User";
import { UserDTO } from "../DTO/UserDTO";
import { WishlistItemDTO } from "../DTO/WishlistItemDTO";
import { toWishlistItem } from "./WishlistMapper";

export const toUser = (dto: UserDTO): User => {
    const {
        id,
        name,
        email,
        email_verified_at,
        wishlist,
    } = dto;
    return new User(
        id,
        name,
        email,
        email_verified_at,
        wishlist.map((wishlistItemDTO: WishlistItemDTO) => toWishlistItem(wishlistItemDTO)),
    );
};