import { ImageDTO } from "./ImageDTO";

export interface ProductDTO {
    id: number;
    title: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    media: ImageDTO[];
}
