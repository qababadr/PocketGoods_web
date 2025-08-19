export class PaginationResponse<T> {
    readonly data: Array<T>;
    readonly firstLink: string;
    readonly lastLink: string;
    readonly nextLink?: string | null;
    readonly prevLink?: string | null;
    readonly currentPage: number;
    readonly from: number;
    readonly lastPage: number;
    readonly path: string;
    readonly perPage: number;
    readonly to: number;
    readonly total: number;

    constructor(
        data: Array<T>,
        firstLink: string,
        lastLink: string,
        currentPage: number,
        from: number,
        lastPage: number,
        path: string,
        perPage: number,
        to: number,
        total: number,
        nextLink?: string | null,
        prevLink?: string | null
    ) {
        this.data = data;
        this.firstLink = firstLink;
        this.lastLink = lastLink;
        this.currentPage = currentPage;
        this.from = from;
        this.lastPage = lastPage;
        this.path = path;
        this.perPage = perPage;
        this.to = to;
        this.total = total;
        this.nextLink = nextLink;
        this.prevLink = prevLink;
    }
}