export class ProductPreview {
    readonly id: number;
    readonly title: string;
    readonly category: string;
    readonly price: number;
    readonly thumbnail: string | null;

    constructor(
        id: number,
        title: string,
        category: string,
        price: number,
        thumbnail: string | null
    ) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}