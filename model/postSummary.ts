export class PostSummary {
    userId: number;
    id: string;
    title: string;
    body: string;

    constructor(data: any) {
        this.id = data.id;
        this.userId = data.userId;
        this.title = data.title;
        this.body = data.body;
    }
}
