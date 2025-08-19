import { WishlistItem } from '../../Domain/Model/WishlistItem'
import { WishlistItemDTO } from '../DTO/WishlistItemDTO'
import { toProduct } from './ProductMapper'

export const toWishlistItem = (dto: WishlistItemDTO) => {
    const { id, product_id, product_detail } = dto
    return new WishlistItem(
        id,
        product_id,
        product_detail !== undefined ? toProduct(product_detail) : undefined
    )
}
