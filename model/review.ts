export class Review {
    postId: number;
    reviewTitle: string;
    reviewText: string;
    star: number;

    constructor(data: any) {
        this.postId = data.postId;
        this.reviewTitle = data.reviewTitle;
        this.reviewText = data.reviewText;
        this.star = data.star;
    }
}
