import Service from './base'
import { DataStore } from '../data'
import { resInfo } from '../model/message'
import errs from '../types/class/error'
import * as multer from 'multer';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';

export default class img extends Service {
    // 图片上传
    async uploadImg() {
        const postIndex = DataStore.posts.findIndex(
            (item: any) => item.id == this.ctx.params.id
        )
        if (postIndex > -1) {
            const fileID = uuid()
            const fileStore = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, path.resolve('./', './src/public/img'))
                },
                filename: (req, file, cb) => {
                    cb(null, fileID + path.extname(file.originalname));
                }
            })
            const uploader = multer({ storage: fileStore }).single('file')
            uploader(this.ctx.req, this.ctx.res, err => {
                if (err) {
                    throw new errs.HttpError('图片上传失败')
                } else {
                    DataStore.posts[postIndex].img.push(this.ctx.req.file.filename)
                    this.ctx.body = new resInfo('图片上传成功！', 200)
                }
            })
        } else {
            throw new errs.NotFound('找不到指定id资源，上传失败！')
        }
    }

    // 图片下载
    async downloadImg() {
        const fileID = this.ctx.params.id
        const filePath = path.resolve('./', `./src/public/img/${fileID}.jpg`)
        this.ctx.res.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "attachment; filename=demo.jpg",
            "Content-Length": fs.statSync(filePath).size
        });
        let f = fs.createReadStream(filePath);
        this.ctx.body = f
    }
}