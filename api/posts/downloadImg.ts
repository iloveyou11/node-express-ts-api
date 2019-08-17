import { RequestHandler } from 'express'
import path from 'path';
import { MyError } from '../../model/message'

export const downloadImg: RequestHandler = (req, res, next) => {
    const fileID = req.params.id
    //这里应该是自动遍历文件夹，找到响应的后缀，动态添加
    res.download(path.resolve('./', `public/img/${fileID}.jpg`), err => {
        if (err) {
            next(new MyError('下载失败', '无法下载指定文件', 400))
        }
    })
}