import { Image } from './Image'

export class Product {
    readonly id: number
    readonly title: string
    readonly category: string
    readonly price: number
    readonly quantity: number
    readonly description: string
    readonly media: Array<Image>

    constructor(
        id: number,
        title: string,
        category: string,
        price: number,
        quantity: number,
        description: string,
        media: Array<Image>
    ) {
        this.id = id
        this.title = title
        this.category = category
        this.price = price
        this.quantity = quantity
        this.description = description
        this.media = media
    }

    get inStock(): boolean {
        return this.quantity >= 0
    }
}
