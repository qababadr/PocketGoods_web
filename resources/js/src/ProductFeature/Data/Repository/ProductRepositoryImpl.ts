import {
    PaginationResponse,
    ProductPreview,
    Product,
    ApiService,
    PaginationResponseDTO,
    ProductPreviewDTO,
    toPaginationResponse,
    toProductPreview,
    ProductDTO,
    toProduct,
} from "@src/Core";
import { ProductRepository } from "@src/ProductFeature/Domain/Repository/ProductRepository";
import { injectable } from "inversify";

@injectable()
export class ProductRepositoryImpl implements ProductRepository {
    async getProducts(
        page: number
    ): Promise<PaginationResponse<ProductPreview>> {
        const response = await ApiService.rawGet<
            PaginationResponseDTO<ProductPreviewDTO>
        >({
            url: `products?page=${page}`,
        });

        return toPaginationResponse(response, (productDTO: ProductPreviewDTO) =>
            toProductPreview(productDTO)
        );
    }
    async getProduct(id: number): Promise<Product> {
        const response = await ApiService.get<ProductDTO>({
            url: `product/details/${id}`,
        });
        return toProduct(response);
    }
    async getSuggestedProducts(query: string): Promise<ProductPreview[]> {
        const response = await ApiService.post<ProductPreviewDTO[]>({
            url: "product/search-suggestions",
            data: {
                search_query: query,
            },
        });
        return response.map((dto) => toProductPreview(dto));
    }
    async searchProducts(
        query: string,
        page: number
    ): Promise<PaginationResponse<ProductPreview>> {
        const response = await ApiService.rawPost<
            PaginationResponseDTO<ProductPreviewDTO>
        >({
            url: `product/search?=${page}`,
            data: {
                search_query: query,
            },
        });
        return toPaginationResponse(response, (productDTO: ProductPreviewDTO) =>
            toProductPreview(productDTO)
        );
    }
}
