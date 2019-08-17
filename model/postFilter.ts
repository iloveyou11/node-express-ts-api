export class PostFilter {
    readonly currency: string
    constructor(data: any) {
        this.currency = data.currency;
    }
}