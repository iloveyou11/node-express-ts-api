import { Controller } from "./base";

export default class Post extends Controller {
    async getPosts() {
        this.ctx.service.posts.getPosts();
    }

    async getPostDetail() {
        this.ctx.service.posts.getPostDetail();
    }

    async createPost() {
        this.ctx.service.posts.createPost();
    }

    async deletePost() {
        this.ctx.service.posts.deletePost();
    }

    async updatePost() {
        this.ctx.service.posts.updatePost();
    }

}