import { RequestHandler } from 'express'
import { PostFilter } from '../../model/postFilter'
import { MyError } from '../../model/message'

export const checkFilter: RequestHandler = (req, res, next) => {
    const filters = new PostFilter(req.query)
    for (let filter of Object.getOwnPropertyNames(req.query)) {
        if (!filters.hasOwnProperty(filter)) {
            next(new MyError('参数错误', '不存在这个参数', 400));
        }
    }
    next()
}