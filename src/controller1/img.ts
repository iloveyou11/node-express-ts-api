import { Controller } from "./base";

export default class Img extends Controller {
    async uploadImg() {
        this.ctx.service.img.uploadImg();
    }

    async downloadImg() {
        this.ctx.service.img.downloadImg();
    }
}