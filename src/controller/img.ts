import { Controller } from "./base";
import { decorator as de } from '../decorators/router'

export default class Img extends Controller {
    @de.get('/img/upload')
    async uploadImg() {
        this.ctx.service.img.uploadImg();
    }

    @de.get('/img/download/:id')
    async downloadImg() {
        this.ctx.service.img.downloadImg();
    }
}