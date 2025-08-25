import { Product } from "../../Domain/Model/Product";
import { ProductPreview } from "../../Domain/Model/ProductPreview";
import { ImageDTO } from "../DTO/ImageDTO";
import { ProductDTO } from "../DTO/ProductDTO";
import { ProductPreviewDTO } from "../DTO/ProductPreviewDTO";
import { toImage } from "./ImageMapper";

export const toProductPreview = (dto: ProductPreviewDTO) => {
    const { id, title, category, price, thumbnail } = dto;
    return new ProductPreview(id, title, category, price, thumbnail);
};

export const toProduct = (dto: ProductDTO) => {
    const { id, title, category, price, quantity, description, media } = dto;

    return new Product(
        id,
        title,
        category,
        price,
        quantity,
        description,
        media.map((imageDTO: ImageDTO) => toImage(imageDTO))
    );
};
