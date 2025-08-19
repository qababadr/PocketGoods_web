export class SearchPaginationResponse<T> {
    readonly data: Array<T>;
    readonly lastPage: number;
    constructor(data: Array<T>, lastPage: number) {
        this.data = data;
        this.lastPage = lastPage;
    }
}