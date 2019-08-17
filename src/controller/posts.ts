import { Controller } from "./base";
import { decorator as de } from '../decorators/router'

export default class Post extends Controller {
    @de.get('/posts')
    async getPosts() {
        this.ctx.service.posts.getPosts();
    }
    @de.get('/posts/:id')
    async getPostDetail() {
        this.ctx.service.posts.getPostDetail();
    }
    @de.post('/posts')
    async createPost() {
        this.ctx.service.posts.createPost();
    }
    @de.delete('/posts/:id')
    async deletePost() {
        this.ctx.service.posts.deletePost();
    }
    @de.put('/posts/:id')
    async updatePost() {
        this.ctx.service.posts.updatePost();
    }

}