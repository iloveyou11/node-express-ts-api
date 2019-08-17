import { PostSummary } from './postSummary'
import { Review } from './review'

export class PostDetail extends PostSummary {
    review: Review
    price: number
    currency: string
    img: string[]

    constructor(postData: any, reviewData: any, postImages: string[]) {
        super(postData)
        this.price = postData.price
        this.currency = postData.currency
        this.review = reviewData.map((item: any) => new Review(item))
        this.img = postImages
    }
}