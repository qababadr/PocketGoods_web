export interface SearchPaginationResponseDTO<T> {
    data: Array<T>;
    last_page: number;
}
