import { WishlistItemDTO } from "./WishlistItemDTO";

export interface UserDTO {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    wishlist: Array<WishlistItemDTO>;
}
