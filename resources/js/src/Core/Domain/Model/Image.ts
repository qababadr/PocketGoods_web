export class Image {
    readonly uuid: string
    readonly filename: string
    readonly preview: string
    readonly original: string

    constructor(uuid: string, filename: string, preview: string, original: string) {
        this.uuid = uuid
        this.filename = filename
        this.preview = preview
        this.original = original
    }
}
