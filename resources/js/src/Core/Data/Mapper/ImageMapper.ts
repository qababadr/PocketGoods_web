import { Image } from "@src/Core/Domain/Model";
import { ImageDTO } from "../DTO";

export const toImage = (dto: ImageDTO): Image => {
    const { uuid, file_name, preview, original } = dto;
    return new Image(uuid, file_name, preview, original);
};
