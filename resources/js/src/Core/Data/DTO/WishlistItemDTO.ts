import { ProductDTO } from "./ProductDTO";

export interface WishlistItemDTO {
    id: number;
    product_id: number | undefined;
    product_detail: ProductDTO | undefined;
}
