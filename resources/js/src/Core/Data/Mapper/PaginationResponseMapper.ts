import { PaginationResponse } from "@src/Core/Domain/Model";
import { PaginationResponseDTO } from "../DTO";

export function toPaginationResponse<Model, DTO>(
    dto: PaginationResponseDTO<DTO>,
    callbackfn: (value: DTO) => Model
): PaginationResponse<Model> {
    return new PaginationResponse(
        dto.data.map((entity: DTO) => callbackfn(entity)),
        dto.links.first,
        dto.links.last,
        dto.meta.current_page,
        dto.meta.from,
        dto.meta.last_page,
        dto.meta.path,
        dto.meta.per_page,
        dto.meta.to,
        dto.meta.total,
        dto.links.next,
        dto.links.prev
    );
}
