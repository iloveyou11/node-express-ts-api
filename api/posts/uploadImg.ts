import { RequestHandler } from 'express'
import { DataStore } from '../../data'
import { getFileUploader } from '../util/getFileUploader'
import { MyError, resInfo } from '../../model/message'

export const uploadImg: RequestHandler = (req, res, next) => {
    const postIndex = DataStore.posts.findIndex(
        (item: any) => item.id == req.params.id
    )

    if (postIndex > -1) {
        const uploader = getFileUploader(req.app.get('env'))
        uploader(req, res, err => {
            if (err) {
                next(new MyError('上传错误', '图片上传失败', 404))
            } else {
                DataStore.posts[postIndex].img.push(req.file.filename)
                res.json(new resInfo('图片上传成功！', 200))
            }
        })
    } else {
        next(new MyError('验证错误', '未找到资源', 404))
    }
}
